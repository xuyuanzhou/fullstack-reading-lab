import { noteSlowFrames } from './quality.ts'

const VERT = 'attribute vec2 aPos;void main(){gl_Position=vec4(aPos,0.0,1.0);}'
const FRAG = `
precision mediump float;
uniform float uTime;
uniform vec2 uRes;
void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float r = length(uv);
  float ang = atan(uv.y, uv.x);
  float z = fract(0.65 - r * 3.2 - uTime * 0.85);
  float band = abs(fract(ang * 10.0 + uTime * 0.15) - 0.5);
  float streak = smoothstep(0.22, 0.0, band) * smoothstep(0.0, 0.08, z) * (1.0 - z);
  vec3 nebula = mix(vec3(0.05, 0.08, 0.09), vec3(0.20, 0.38, 0.32), smoothstep(0.05, 0.85, r));
  vec3 gold = vec3(0.72, 0.58, 0.32) * smoothstep(0.55, 0.15, abs(uv.y));
  vec3 col = nebula + gold * 0.18 + streak * vec3(0.86, 0.93, 0.88);
  float vig = smoothstep(1.15, 0.25, r);
  gl_FragColor = vec4(col * vig, 1.0);
}
`

export function preloadWarp() {
  const canvas = document.createElement('canvas')
  canvas.width = 2
  canvas.height = 2
  const gl = canvas.getContext('webgl', { antialias: false, depth: false, stencil: false })
  if (!gl) return
  build(gl)
  gl.getExtension('WEBGL_lose_context')?.loseContext()
}

/** 画满 canvas，返回停止函数。帧间隔超过 34ms 连续三次后，下次转场降级。 */
export function runWarp(canvas: HTMLCanvasElement, ms: number) {
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, depth: false, stencil: false })
  if (!gl) return () => {}
  const program = build(gl)
  if (!program) return () => {}
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
  const draw = (now: number) => {
    deltas.push(now - last)
    last = now
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const width = Math.max(1, Math.floor(canvas.clientWidth * dpr))
    const height = Math.max(1, Math.floor(canvas.clientHeight * dpr))
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width
      canvas.height = height
    }
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.uniform1f(uTime, (now - started) / 1000)
    gl.uniform2f(uRes, canvas.width, canvas.height)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
    if (now - started < ms) frame = requestAnimationFrame(draw)
    else noteSlowFrames(deltas)
  }
  frame = requestAnimationFrame(draw)
  return () => {
    cancelAnimationFrame(frame)
    noteSlowFrames(deltas)
    gl.getExtension('WEBGL_lose_context')?.loseContext()
  }
}

function build(gl: WebGLRenderingContext) {
  const program = gl.createProgram()
  if (!program) return null
  const vs = shader(gl, gl.VERTEX_SHADER, VERT)
  const fs = shader(gl, gl.FRAGMENT_SHADER, FRAG)
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
