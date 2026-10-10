import { useEffect, useRef, useState } from 'react'
import { createWorld } from './world.js'
import { Q } from './quiz.js'

const SPEEDS = [20, 30, 40, 50, 60, 70]
// [scene, side, tag, title, text, bullets]
const SEC = [
  ['hero', '', 'LEARN TO DRIVE', 'See it. Understand it. Drive it.', 'Scroll through a living 3D city and meet the situations every new driver faces, then test yourself in the 3D quiz. UK rules: we drive on the left.', []],
  ['crossing', 'r', 'DEMO 1', 'Zebra crossings', 'The car eases off early, the nose dips, brake lights glow, then it waits until the pedestrian is clear.', ['Scan the pavements as you approach', 'Slow down and be ready to stop', 'Give way once they step onto the crossing']],
  ['roundabout', '', 'DEMO 2', 'Roundabouts', 'The red car waits while traffic on the roundabout passes, then joins and takes the first exit left.', ['Give way to traffic from your right', 'Signal your exit, look, then go']],
  ['junction', 'r', 'DEMO 3', 'T-junctions', 'At the give way line the learner lets the main-road car go by, then turns left into a safe gap.', ['Observe: right, left, right again', 'Never rely on others slowing for you']],
  ['lights', '', 'DEMO 4', 'Traffic lights', 'Green, amber, red. Watch the car stop smoothly before the line while cross traffic goes.', ['Amber means stop if it is safe to', 'Wait behind the line, not on it', 'Check the way is clear before moving off']],
  ['cyclist', 'r', 'DEMO 5', 'Overtaking cyclists', 'Hang back, let the oncoming car pass, then swing out and give at least 1.5 m of space.', ['Be patient, do not squeeze past', 'Move back in only when well clear']],
  ['braking', '', 'DEMO 6 · TRY IT', 'Stopping distance', 'Pick a speed. A child steps out: see how far you travel thinking and braking.', []],
  ['merge', 'r', 'DEMO 7 · MOTORWAY', 'Joining the motorway', 'Use the slip road to build speed alongside the traffic, find a gap ahead of the lorry, then merge into lane one without making anyone brake.', ['Match the speed of the traffic', 'Check mirrors and blind spot', 'Never stop on the slip road unless you have to']],
  ['overtake', '', 'DEMO 8 · MOTORWAY', 'Overtaking a lorry', 'Keep a safe gap, let the fast car go by, signal, pass on the right and move back left once well clear.', ['Pass on the right only', 'Do not undertake', 'Return to the left lane when safe']],
  ['gap', 'r', 'DEMO 9 · MOTORWAY', 'The two-second gap', 'The bar between the cars shows your gap in seconds. The lead car brakes: watch the gap stay safe.', ['Pick a fixed marker and count two seconds', 'Double it or more in the rain']],
  ['quiz', '', '3D QUIZ', '', '', []],
]

export default function App() {
  const cv = useRef(), world = useRef()
  const [act, setAct] = useState('hero')
  const [mph, setMph] = useState(30)
  const [bi, setBi] = useState(null)
  const [gs, setGs] = useState(null)
  const [err, setErr] = useState(false)
  const [qi, setQi] = useState(0)
  const [score, setScore] = useState(0)
  const [sel, setSel] = useState(null)

  useEffect(() => {
    let w
    try {
      w = createWorld(cv.current, { onBraking: setBi, onGap: setGs })
      world.current = w
    } catch (e) {
      console.error(e)
      setErr(true)
    }
    return () => w && w.destroy()
  }, [])

  useEffect(() => {
    const f = () => {
      const h = innerHeight / 2
      let k = null
      document.querySelectorAll('section[data-s]').forEach((s) => {
        const r = s.getBoundingClientRect()
        if (r.top <= h && r.bottom > h) k = s.dataset.s
      })
      if (k) setAct(k)
    }
    f()
    addEventListener('scroll', f, { passive: true })
    return () => removeEventListener('scroll', f)
  }, [])

  const scene = act === 'quiz' ? (Q[qi] ? Q[qi].s : 'hero') : act
  useEffect(() => { world.current && world.current.setScene(scene, true) }, [scene, qi])

  const pick = (m) => { setMph(m); world.current && world.current.setMph(m) }
  const q = Q[qi]
  const answer = (i) => { if (sel !== null) return; setSel(i); if (i === q.a) setScore((s) => s + 1) }
  const next = () => { setSel(null); setQi(qi + 1) }
  const restart = () => { setSel(null); setQi(0); setScore(0) }

  const quiz = !q ? (
    <>
      <h2>Score: {score}/{Q.length}</h2>
      <p>{score >= 6 ? 'Brilliant, you think like a driver!' : score >= 4 ? 'Good effort. Rewatch a few demos and retry.' : 'Scroll up, rewatch the demos, then try again.'}</p>
      <button onClick={restart}>Restart quiz</button>
    </>
  ) : (
    <>
      <p className="small">Question {qi + 1} of {Q.length} · watch the scene behind</p>
      <h2 style={{ fontSize: '1.2rem' }}>{q.q}</h2>
      {q.o.map((o, i) => (
        <button key={i} onClick={() => answer(i)}
          className={'opt' + (sel !== null && i === q.a ? ' good' : '') + (sel === i && i !== q.a ? ' bad' : '')}>{o}</button>
      ))}
      {sel !== null && (
        <>
          <p><b>{sel === q.a ? 'Correct! ' : 'Not quite. '}</b>{q.e}</p>
          <button onClick={next}>{qi < Q.length - 1 ? 'Next →' : 'See score'}</button>
        </>
      )}
    </>
  )

  return (
    <>
      <canvas ref={cv} aria-hidden="true" />
      <nav><span>🚗 DriveWise 3D</span><a href="#quiz">Quiz</a></nav>
      {err && <section><div className="card"><h2>3D view unavailable</h2><p>Your browser or device could not start WebGL, so the 3D scenes can't be shown. The lessons and quiz below still work. Try updating your browser or enabling hardware acceleration.</p></div></section>}
      {SEC.map(([s, side, tag, title, text, list]) => (
        <section key={s} id={s} data-s={s} className={side}>
          <div className="card">
            <span className="tag">{tag}</span>
            {title && (s === 'hero' ? <h1>{title}</h1> : <h2>{title}</h2>)}
            {s === 'quiz' ? quiz : (
              <>
                <p>{text}</p>
                {list.length > 0 && <ul>{list.map((l) => <li key={l}>{l}</li>)}</ul>}
                {s === 'gap' && gs != null && <div className="bi">Gap to the car ahead: <b>{gs.toFixed(1)} s</b> {gs >= 2 ? '✓ safe' : gs >= 1 ? 'getting close' : 'too close!'}</div>}
                {s === 'braking' && (
                  <>
                    <div>{SPEEDS.map((m) => <button key={m} className={m === mph ? 'on' : ''} onClick={() => pick(m)}>{m} mph</button>)}</div>
                    {bi && <div className="bi">{mph} mph → <span style={{ color: '#d98e00' }}>thinking {bi.th} m</span> + <span style={{ color: '#e63946' }}>braking {bi.br} m</span> = <b>{bi.th + bi.br} m</b> (≈ {Math.round((bi.th + bi.br) / 4)} car lengths)</div>}
                    <p className="small">Highway Code figures, dry road. Wet roads can double braking distance.</p>
                  </>
                )}
              </>
            )}
          </div>
        </section>
      ))}
      <section style={{ minHeight: '30vh', alignItems: 'flex-end' }}>
        <div className="card"><p className="small" style={{ margin: 0 }}>A learning aid, not a replacement for lessons with a qualified instructor or the official Highway Code.</p></div>
      </section>
    </>
  )
}
