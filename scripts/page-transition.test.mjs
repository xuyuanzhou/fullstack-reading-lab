import assert from 'node:assert/strict'
import test from 'node:test'
import { JUMP_BUDGET_MS, jumpIsOver, jumpTotal } from '../web/src/transition/jumpBudget.ts'
import { LITE_MS, TRANSITION_MS, pageScene, transitionKind } from '../web/src/transition/scenes.ts'
import { WARP_FRAGMENT } from '../web/src/transition/warp.ts'
import { chooseTier, noteSlowFrames, resetTransitionTier, tierIsForcedLite } from '../web/src/transition/quality.ts'

test('home, level list, and sub level are different scenes', () => {
  assert.equal(pageScene('/frontend/fullstack'), 'home')
  assert.equal(pageScene('/java/language'), 'home')
  assert.equal(pageScene('/paths'), 'levels')
  assert.equal(pageScene('/paths/'), 'levels')
  assert.equal(pageScene('/frontend/fullstack/http-methods'), 'sub')
  assert.equal(pageScene('/knowledge'), 'other')
  assert.equal(pageScene('/ai/intro'), 'other')
})

test('only hops that touch /paths use cinematic transitions', () => {
  assert.equal(transitionKind('/frontend/fullstack', '/paths'), 'warp')
  assert.equal(transitionKind('/paths', '/frontend/fullstack/http-methods'), 'splice')
  assert.equal(transitionKind('/frontend/fullstack/http-methods', '/paths'), 'pullback')
  assert.equal(transitionKind('/paths', '/frontend/fullstack'), 'pullback')
  // 章节课表 ↔ 课文：不播特效
  assert.equal(transitionKind('/frontend/fullstack', '/java/language/jvm'), null)
  assert.equal(transitionKind('/frontend/fullstack/http-methods', '/frontend/fullstack'), null)
  assert.equal(transitionKind('/paths', '/knowledge'), null)
  assert.equal(transitionKind('/frontend/fullstack', '/frontend/fullstack'), null)
  for (const ms of Object.values(TRANSITION_MS)) {
    assert.equal(ms >= 800 && ms <= 1500, true)
    assert.equal(ms <= JUMP_BUDGET_MS, true)
  }
  assert.equal(LITE_MS >= 800 && LITE_MS <= 1500, true)
  assert.equal(jumpTotal(480, TRANSITION_MS.splice) <= JUMP_BUDGET_MS, true)
  assert.equal(jumpIsOver(JUMP_BUDGET_MS), false)
  assert.equal(jumpIsOver(JUMP_BUDGET_MS + 1), true)
  assert.equal(TRANSITION_MS.warp, 1500)
  assert.equal(WARP_FRAGMENT.includes('fract('), false)
  assert.equal(WARP_FRAGMENT.includes('atan('), false)
})

test('reduced motion is off, and weak devices use the short transition', () => {
  assert.equal(chooseTier({ reduce: true, cores: 8, saveData: false, webgl: true }), 'off')
  assert.equal(chooseTier({ reduce: false, cores: 2, saveData: false, webgl: true }), 'lite')
  assert.equal(chooseTier({ reduce: false, cores: 8, memory: 2, saveData: false, webgl: true }), 'lite')
  assert.equal(chooseTier({ reduce: false, cores: 8, saveData: true, webgl: true }), 'lite')
  assert.equal(chooseTier({ reduce: false, cores: 8, saveData: false, webgl: false }), 'lite')
  assert.equal(chooseTier({ reduce: false, cores: 8, saveData: false, webgl: true }), 'full')
  resetTransitionTier()
  noteSlowFrames([16, 40, 50, 36])
  assert.equal(tierIsForcedLite(), true)
  assert.equal(chooseTier({ reduce: false, cores: 8, saveData: false, webgl: true, forcedLite: true }), 'lite')
  resetTransitionTier()
  assert.equal(tierIsForcedLite(), false)
})
