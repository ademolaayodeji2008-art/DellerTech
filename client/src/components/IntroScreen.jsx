import { useState, useEffect, useRef, useCallback } from "react";

const LINES = [
  { id: 0, text: '> DELLERTECH OS v2.0 — BOOTING...', color: '#22c55e', hasProgress: true },
  { id: 1, prefix: '> Initializing core systems...........', prefixColor: '#94a3b8', suffix: 'OK', suffixColor: '#22c55e' },
  { id: 2, prefix: '> Loading ', highlight: 'WEB DEVELOPMENT', highlightColor: '#3b82f6', middle: ' module......', suffix: 'OK', suffixColor: '#22c55e', glitch: true },
  { id: 3, prefix: '> Loading ', highlight: 'CODING SCHOOL', highlightColor: '#F59E0B', middle: ' module........', suffix: 'OK', suffixColor: '#22c55e', glitch: true },
  { id: 4, prefix: '> Loading UI/UX & MOBILE modules......', prefixColor: '#94a3b8', suffix: 'OK', suffixColor: '#22c55e' },
  { id: 5, text: '> All systems ONLINE.', color: '#ffffff', large: true },
  { id: 6, text: '> Welcome to DELLERTECH.', gradient: true, xl: true },
];

function fullLineText(line) {
  if (line.text) return line.text;
  if (line.highlight) return (line.prefix || '') + line.highlight + (line.middle || '') + (line.suffix || '');
  if (line.prefix) return (line.prefix || '') + (line.suffix || '');
  return '';
}

function renderLine(line) {
  const text = fullLineText(line);
  if (line.gradient) {
    return <span className="gradient-text" style={{ fontWeight: 800, fontSize: '1.3em' }}>{text}</span>;
  }
  if (line.large) {
    return <span style={{ color: line.color, fontSize: '1.1em' }}>{text}</span>;
  }
  if (line.highlight) {
    return (
      <span style={{ color: '#94a3b8' }}>
        {line.prefix}
        <span
          style={{ color: line.highlightColor, fontWeight: 700 }}
          className={line.glitch ? 'intro-glitch-text' : ''}
        >
          {line.highlight}
        </span>
        {line.middle}
        <span style={{ color: line.suffixColor }}>{line.suffix}</span>
      </span>
    );
  }
  if (line.prefix !== undefined) {
    return (
      <span>
        <span style={{ color: line.prefixColor || '#94a3b8' }}>{line.prefix}</span>
        <span style={{ color: line.suffixColor }}>{line.suffix}</span>
      </span>
    );
  }
  return <span style={{ color: line.color }}>{text}</span>;
}

export default function IntroScreen({ onComplete }) {
  const [phase, setPhase] = useState('noise');
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [showWait, setShowWait] = useState(false);
  const [exitStage, setExitStage] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  const canvasRef = useRef(null);
  const typingIntervalRef = useRef(null);
  const timeoutsRef = useRef([]);
  const exitCalledRef = useRef(false);

  const addTimeout = (fn, delay) => {
    const id = setTimeout(fn, delay);
    timeoutsRef.current.push(id);
    return id;
  };

  const startExit = useCallback(() => {
    if (exitCalledRef.current) return;
    exitCalledRef.current = true;

    // Clear any pending typing
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }

    setPhase('exit');
    setExitStage(1);

    setTimeout(() => setExitStage(2), 350);
    setTimeout(() => {
      sessionStorage.setItem('dt_intro_seen', '1');
      setPhase('done');
      onComplete();
    }, 350 + 750);
  }, [onComplete]);

  // Check session storage on mount
  useEffect(() => {
    if (sessionStorage.getItem('dt_intro_seen')) {
      onComplete();
    }
  }, [onComplete]);

  // Phase transitions: noise → matrix → terminal
  useEffect(() => {
    if (sessionStorage.getItem('dt_intro_seen')) return;

    // After noise (600ms), switch to matrix
    const t1 = addTimeout(() => setPhase('matrix'), 600);

    // After matrix (1600ms total), switch to terminal
    const t2 = addTimeout(() => setPhase('terminal'), 1600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Matrix rain canvas animation
  useEffect(() => {
    if (phase !== 'matrix') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    const chars = '01{}[]<>/=;';
    const fontSize = 13;
    const cols = Math.floor(canvas.width / fontSize);
    const drops = Array(cols).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#22c55e';
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, [phase]);

  // Typing logic
  useEffect(() => {
    if (phase !== 'terminal') return;
    if (lineIndex >= LINES.length) return;

    const line = LINES[lineIndex];
    const fullText = fullLineText(line);
    let charIdx = 0;

    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }

    typingIntervalRef.current = setInterval(() => {
      charIdx++;
      setCurrentLine(fullText.slice(0, charIdx));

      if (charIdx >= fullText.length) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;

        // Line is done typing — add it to completed lines
        const completedLine = line;

        if (line.hasProgress) {
          // Show progress bar, then advance
          setShowProgress(true);
          setProgressWidth(0);
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setProgressWidth(100);
            });
          });
          const t = addTimeout(() => {
            setLines(prev => [...prev, completedLine]);
            setCurrentLine('');
            setShowProgress(false);
            setProgressWidth(0);
            setLineIndex(prev => prev + 1);
          }, 500);
          return;
        }

        // Delay before next line
        let delay = 200;
        if (lineIndex === 4) delay = 300; // before line 5
        if (lineIndex === 5) delay = 400; // before line 6 (Welcome)

        addTimeout(() => {
          setLines(prev => [...prev, completedLine]);
          setCurrentLine('');

          if (lineIndex === LINES.length - 1) {
            // Last line done — show wait prompt
            addTimeout(() => {
              setShowWait(true);
              // Auto-advance after 1200ms
              addTimeout(() => startExit(), 1200);
            }, 300);
          } else {
            setLineIndex(prev => prev + 1);
          }
        }, delay);
      }
    }, 40);

    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
    };
  }, [phase, lineIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  // Key/click listener during terminal phase
  useEffect(() => {
    if (phase !== 'terminal') return;

    const handler = () => startExit();
    window.addEventListener('keydown', handler);
    window.addEventListener('click', handler);
    return () => {
      window.removeEventListener('keydown', handler);
      window.removeEventListener('click', handler);
    };
  }, [phase, startExit]);

  // Cleanup all timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    };
  }, []);

  if (phase === 'done') return null;

  const currentLineObj = lineIndex < LINES.length ? LINES[lineIndex] : null;

  return (
    <>
      {/* Main overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Phase 0: Noise */}
        {phase === 'noise' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'radial-gradient(ellipse at 50% 50%, #333 1px, transparent 1px), radial-gradient(ellipse at 20% 80%, #222 1px, transparent 1px)',
              backgroundSize: '3px 3px, 5px 5px',
              animation: 'noise 0.1s steps(1) infinite',
              opacity: 1,
            }}
          />
        )}

        {/* Phase 1: Matrix canvas */}
        {phase === 'matrix' && (
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 1,
              transition: 'opacity 0.3s',
            }}
          />
        )}

        {/* Phase 2: Terminal */}
        {(phase === 'terminal' || phase === 'exit') && (
          <div
            className={exitStage === 1 ? 'intro-glitch' : ''}
            style={{
              background: '#0a0a0f',
              border: '1px solid #22c55e',
              borderRadius: '12px',
              padding: '32px 40px',
              minWidth: '480px',
              maxWidth: '90vw',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              lineHeight: 2,
              boxShadow:
                '0 0 40px rgba(34,197,94,0.15), 0 0 80px rgba(34,197,94,0.05)',
            }}
          >
            {lines.map((line, i) => (
              <div key={i}>{renderLine(line)}</div>
            ))}

            {/* Progress bar after line 0 */}
            {showProgress && (
              <div style={{ marginBottom: '4px' }}>
                <div
                  style={{
                    height: '3px',
                    background: 'rgba(34,197,94,0.2)',
                    borderRadius: '2px',
                    width: '100%',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      background: '#22c55e',
                      borderRadius: '2px',
                      width: `${progressWidth}%`,
                      transition: 'width 0.4s ease',
                    }}
                  />
                </div>
              </div>
            )}

            {/* Currently typing line */}
            {phase === 'terminal' && currentLineObj && (
              <div>
                <span style={{ color: currentLineObj.color || '#94a3b8' }}>
                  {currentLine}
                </span>
                <span className="intro-cursor" />
              </div>
            )}

            {/* Wait prompt */}
            {showWait && (
              <div
                style={{
                  color: '#22c55e',
                  opacity: 0.5,
                  fontSize: '0.75em',
                  marginTop: '16px',
                  animation: 'termBlink 1s step-start infinite',
                }}
              >
                [ PRESS ANY KEY OR WAIT ]
              </div>
            )}
          </div>
        )}

        {/* Flash white overlay */}
        {exitStage >= 1 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: '#fff',
              zIndex: 2,
              animation: 'flashWhite 0.3s ease forwards',
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Scan lines */}
        {exitStage >= 1 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 3,
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
              animation: 'scanSweep 0.4s linear forwards',
              pointerEvents: 'none',
            }}
          />
        )}
      </div>

      {/* Split panels for exit */}
      {exitStage >= 1 && (
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '50%',
              background: '#000',
              zIndex: 9998,
              transform: exitStage >= 2 ? 'translateY(-100%)' : 'translateY(0)',
              transition:
                exitStage >= 2
                  ? 'transform 0.7s cubic-bezier(0.86,0,0.07,1)'
                  : 'none',
            }}
          />
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: 0,
              width: '100%',
              height: '50%',
              background: '#000',
              zIndex: 9998,
              transform: exitStage >= 2 ? 'translateY(100%)' : 'translateY(0)',
              transition:
                exitStage >= 2
                  ? 'transform 0.7s cubic-bezier(0.86,0,0.07,1)'
                  : 'none',
            }}
          />
        </>
      )}

      {/* Skip button */}
      <button
        onClick={() => startExit()}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 10000,
          background: 'transparent',
          border: '1px solid rgba(34,197,94,0.4)',
          color: 'rgba(34,197,94,0.7)',
          padding: '6px 14px',
          borderRadius: '4px',
          fontFamily: 'monospace',
          fontSize: '0.75rem',
          cursor: 'pointer',
          letterSpacing: '0.1em',
        }}
      >
        SKIP →
      </button>
    </>
  );
}
