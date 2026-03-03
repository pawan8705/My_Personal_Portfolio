/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { projects, projectCats } from '../data/index';

const v = (d = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] } }
});

export default function Projects() {
  const ref = useRef(null);
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? projects : projects.filter(p => p.cat === active);

  return (
    <section id="projects" ref={ref} style={{ background: 'var(--bg1)', overflow: 'hidden' }}>
      <div className="section-wrap">
        <div className="mb-14">
          <div
            className="flex items-center gap-2 text-xs font-bold tracking-[0.12em] uppercase mb-3"
            style={{ color: 'var(--green)' }}
          >
            <span
              className="inline-block w-7 h-0.5 rounded-full"
              style={{ background: 'var(--green)' }}
            />
            What I built
          </div>
          <h2
            className="text-[clamp(2rem,5vw,3rem)] font-extrabold leading-tight"
            style={{ color: 'var(--text1)', fontFamily: 'var(--font)' }}
          >
            My{" "}
            <span className="g-text">Projects</span>
          </h2>
        </div>
        <div
          className="flex flex-wrap gap-2.5 mb-10"
        >
          {projectCats.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer hover:scale-105"
              style={
                active === cat
                  ? {
                      color: '#fff',
                      background: 'linear-gradient(135deg, var(--accent), var(--accent-h))',
                      boxShadow: '0 4px 18px var(--accent-glow)',
                      transform: 'scale(1.05)',
                    }
                  : {
                      color: 'var(--text2)',
                      background: 'linear-gradient(145deg, var(--bg2), var(--bg3))',
                      boxShadow: 'var(--neu-out-sm)',
                      border: '1px solid var(--border)',
                    }
              }
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p, i) => (
            <div
              key={p.id}
              className="flex flex-col rounded-[1.1rem] overflow-hidden transition-transform duration-200 hover:-translate-y-1.5"
              style={{
                background: 'linear-gradient(145deg, var(--bg2), var(--bg3))',
                boxShadow: 'var(--neu-out)',
                border: '1px solid var(--border)',
              }}
            >
              <div
                className="h-[3px] w-full flex-shrink-0"
                style={{
                  background: `linear-gradient(90deg, ${p.color}, ${p.color}55)`,
                  boxShadow: `0 0 12px ${p.color}44`,
                }}
              />
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                      style={{
                        background: 'linear-gradient(145deg, var(--bg3), var(--bg2))',
                        boxShadow: 'var(--neu-in-sm)',
                      }}
                    >
                      {p.emoji}
                    </div>
                    <div className="min-w-0">
                      <h3
                        className="font-extrabold text-[1rem] leading-tight truncate"
                        style={{ color: 'var(--text1)', fontFamily: 'var(--font)' }}
                      >
                        {p.title}
                      </h3>
                      <p
                        className="text-[0.65rem] font-bold uppercase tracking-[0.1em] mt-0.5"
                        style={{ color: p.color }}
                      >
                        {p.cat}
                      </p>
                    </div>
                  </div>

                  {p.featured && (
                    <span
                      className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full text-[0.63rem] font-bold"
                      style={{
                        color: '#fbbf24',
                        background: 'rgba(251,191,36,0.1)',
                        border: '1px solid rgba(251,191,36,0.25)',
                      }}
                    >
                      ⭐ Featured
                    </span>
                  )}
                </div>
                <p
                  className="text-[0.82rem] leading-[1.7] mb-4 flex-1"
                  style={{ color: 'var(--text2)' }}
                >
                  {p.desc}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {p.tech.map(t => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg text-[0.68rem] font-semibold"
                      style={{
                        color: 'var(--text2)',
                        background: 'linear-gradient(145deg, var(--bg3), var(--bg2))',
                        boxShadow: 'var(--neu-in-sm)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 mt-auto">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl
                               text-xs font-semibold transition-all duration-200
                               hover:opacity-80 active:scale-95"
                    style={{
                      color: 'var(--text2)',
                      background: 'linear-gradient(145deg, var(--bg2), var(--bg3))',
                      boxShadow: 'var(--neu-out-sm)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <FiGithub size={13} /> GitHub
                  </a>

                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl
                               text-xs font-bold text-white
                               hover:opacity-85 active:scale-95
                               transition-all duration-200"
                    style={{
                      background: `linear-gradient(135deg, ${p.color}, ${p.color}88)`,
                      boxShadow: `0 4px 16px ${p.color}44`,
                    }}
                  >
                    <FiExternalLink size={13} /> Live
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="neu-divider" />
    </section>
  );
}