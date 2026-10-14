import { noteSlowFrames } from './quality.ts'

const VERT = 'attribute vec2 aPos;void main(){gl_Position=vec4(aPos,0.0,1.0);}'
/** 进架构师主线的雾面。不用 fract / atan，避免折返条纹和旋转频闪。 */
export const WARP_FRAGMENT = `
precision mediump float;
uniform float uTime;
uniform vec2 uRes;
void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float r = length(uv);
  float t = clamp(uTime / 1.5, 0.0, 1.0);
  vec3 base = mix(vec3(0.07, 0.09, 0.08), vec3(0.15, 0.24, 0.20), smoothstep(0.9, 0.08, r));
  float glow = smoothstep(0.7, 0.0, r) * (0.10 + 0.16 * t);
  vec3 col = base + vec3(0.20, 0.34, 0.28) * glow;
  gl_FragColor = vec4(col, 1.0);
}
`

export function preloadWarp() {
  const canvas = document.createElement('canvas')
  canvas.width = 2
  canvas.height = 2
  const gl = canvas.getContext('webgl', { antialias: false, depth: false, stencil: false })
  if (!gl) return
  build(gl)
  // 预热专用画布，可以丢掉上下文；正式转场画布不要在卸载时 loseContext，
  // 否则 React Strict Mode 二次挂载时 getContext 会失败，canvas 停在默认 300×150。
  gl.getExtension('WEBGL_lose_context')?.loseContext()
}

/**
 * 画满 canvas。成功返回停止函数；WebGL 不可用时返回 null，由上层改用 CSS 雾面。
 * 帧间隔超过 34ms 连续三次后，下次转场降级。
 */
export function runWarp(canvas: HTMLCanvasElement, ms: number): (() => void) | null {
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, depth: false, stencil: false })
  if (!gl || gl.isContextLost()) return null
  const program = build(gl)
  if (!program) return null
  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const pos = gl.getAttribLocation(program, 'aPos')
  gl.enableVertexAttribArray(pos)
  gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)
  const uTime = gl.getUniformLocation(program, 'uTime')
  const uRes = gl.getUniformLocation(program, 'uRes')
  gl.useProgram(program)
  const deltas: number[] = []
  let last = performance.now()
  let frame = 0
  const started = last
  const paint = (now: number) => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const width = Math.max(1, Math.floor(canvas.clientWidth * dpr) || Math.floor(window.innerWidth * dpr))
    const height = Math.max(1, Math.floor(canvas.clientHeight * dpr) || Math.floor(window.innerHeight * dpr))
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width
      canvas.height = height
    }
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.uniform1f(uTime, Math.max(0, (now - started) / 1000))
    gl.uniform2f(uRes, canvas.width, canvas.height)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }
  // 首帧同步画满，避免 CSS 把默认 300×150 拉伸成糊块
  paint(started)
  const draw = (now: number) => {
    deltas.push(now - last)
    last = now
    if (gl.isContextLost()) return
    paint(now)
    if (now - started < ms) frame = requestAnimationFrame(draw)
    else noteSlowFrames(deltas)
  }
  frame = requestAnimationFrame(draw)
  return () => {
    cancelAnimationFrame(frame)
    noteSlowFrames(deltas)
  }
}

function build(gl: WebGLRenderingContext) {
  const program = gl.createProgram()
  if (!program) return null
  const vs = shader(gl, gl.VERTEX_SHADER, VERT)
  const fs = shader(gl, gl.FRAGMENT_SHADER, WARP_FRAGMENT)
  if (!vs || !fs) return null
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null
  return program
}

function shader(gl: WebGLRenderingContext, type: number, source: string) {
  const item = gl.createShader(type)
  if (!item) return null
  gl.shaderSource(item, source)
  gl.compileShader(item)
  if (!gl.getShaderParameter(item, gl.COMPILE_STATUS)) return null
  return item
}
