/* eslint-disable no-unused-vars */
import { useRef } from "react";
import { certifications } from '../data/index';

const v = (d = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] } }
});

export default function Certifications() {
  const ref = useRef(null);

  return (
    <div id="certifications" ref={ref}>
      <div className="mb-10">
        <div
          className="flex items-center gap-2 text-xs font-bold tracking-[0.12em] uppercase mb-3"
          style={{ color: 'var(--accent-h)' }}
        >
          <span className="inline-block w-7 h-0.5 rounded-full" style={{ background: 'var(--accent-h)' }} />
          My credentials
        </div>
        <h2
          className="text-[clamp(2rem,5vw,3rem)] font-extrabold leading-tight"
          style={{ color: 'var(--text1)', fontFamily: 'var(--font)' }}
        >
          Certifi<span className="g-text">cations</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {certifications.map((c, i) => (
          <div
            key={c.id}
            className="flex flex-col rounded-2xl overflow-hidden transition-transform duration-200 hover:-translate-y-1.5"
            style={{
              background: 'linear-gradient(145deg, var(--bg2), var(--bg3))',
              boxShadow: 'var(--neu-out)',
              border: '1px solid var(--border)',
            }}
          >
            <div
              className="h-[3px] w-full flex-shrink-0"
              style={{
                background: `linear-gradient(90deg, ${c.color}, ${c.color}55)`,
                boxShadow: `0 0 10px ${c.color}44`,
              }}
            />
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-start gap-3 mb-5">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{
                    background: 'linear-gradient(145deg, var(--bg3), var(--bg2))',
                    boxShadow: 'var(--neu-in-sm)',
                  }}
                >
                  {c.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <h3
                    className="font-bold text-[0.92rem] leading-snug mb-1"
                    style={{ color: 'var(--text1)', fontFamily: 'var(--font)' }}
                  >
                    {c.name}
                  </h3>
                  <p className="text-[0.72rem] font-semibold" style={{ color: c.color }}>
                    {c.platform} || {c.year}                 
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-auto gap-2">
                <span
                  className="px-3 py-1 rounded-full text-[0.68rem] font-semibold"
                  style={{
                    color: 'var(--text2)',
                    background: 'linear-gradient(145deg, var(--bg3), var(--bg2))',
                    boxShadow: 'var(--neu-in-sm)',
                    border: '1px solid var(--border)',
                  }}
                >
                  {c.name.split(' ')[0]}
                </span>
                <a href={c.URL} target="_blank" rel="noopener noreferrer"
                className="text-[0.65rem] font-bold px-2 py-0.5 rounded-full flex items-center gap-1"
                style={{color: 'var(--green)',
                        background: 'rgba(16,217,160,0.1)',
                        border: '1px solid rgba(16,217,160,0.25)',
                      }}
                >
                     View Certificate
                  </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
