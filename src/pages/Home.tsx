import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Download, MapPin } from 'lucide-react';
import { CityScene } from '../components/city/CityScene';
import { BuildingIcon } from '../components/city/BuildingIcon';
import { buildings } from '../components/city/buildings';
import { Ocean, Palm, Skyline, Stars, Sun } from '../components/city/art';
import { Logo } from '../components/ui/Logo';
import { locations } from '../config/locations';
import { profile } from '../data/profile';
import s from './Home.module.css';

export default function Home() {
  return (
    <>
      <h1 className="sr-only">
        {profile.fullName} — {profile.role}. Portfolio VICE.DEV
      </h1>

      {/* Desktop / landscape: the explorable city */}
      <section className={s.sceneOnly} aria-label="Mapa interactivo">
        <CityScene />
        <div className={s.hud}>
          <p className={s.hudName}>{profile.fullName}</p>
          <p className={s.hudRole}>
            {profile.role} · <MapPin size={13} aria-hidden="true" /> {profile.location}
          </p>
        </div>
        <p className={s.hint}>
          <span>Explora la ciudad · elige un edificio</span>
          <a href="#directory">
            o ve directo al directorio <ArrowDown size={14} aria-hidden="true" />
          </a>
        </p>
      </section>

      {/* Mobile / portrait: compact skyline hero */}
      <section className={s.mobileHero} aria-label="Presentación">
        <svg className={s.mobileSky} viewBox="300 200 1000 600" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
          <rect x="0" y="0" width="1600" height="900" fill="url(#g-sky)" />
          <Stars width={1600} />
        </svg>
        <svg className={s.strip} viewBox="20 200 1560 640" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
          <Sun cx={800} cy={640} r={400} />
          <Skyline baseline={640} x0={0} width={1600} seed={5} />
          <Ocean y={640} h={90} cx={800} />
          <rect x="0" y="730" width="1600" height="200" fill="var(--ground)" />
          <line x1="0" x2="1600" y1="730" y2="730" stroke="#00e5ff" strokeWidth="3" opacity="0.6" />
          {locations.map((l) => {
            const b = buildings[l.id];
            return (
              <g key={l.id} transform={`translate(${b.x} ${780 - b.h})`}>
                <b.Art />
              </g>
            );
          })}
          <rect x="0" y="780" width="1600" height="60" fill="#07060e" />
          <line x1="0" x2="1600" y1="810" y2="810" stroke="#ffd36b" strokeWidth="4" strokeDasharray="40 30" opacity="0.7" />
          <Palm x={30} y={840} h={430} lean={50} fill="#05030c" />
          <Palm x={1570} y={840} h={400} lean={-50} fill="#05030c" delay={-3} />
        </svg>
        <div className={s.mobileCopy}>
          <Logo size="lg" />
          <p className={s.mobileName}>{profile.fullName}</p>
          <p className={s.mobileRole}>{profile.role.toUpperCase()}</p>
          <p className={s.mobileTag}>{profile.tagline}</p>
        </div>
      </section>

      <section id="directory" className={s.directory} aria-labelledby="dir-title">
        <div className={s.dirHead}>
          <p className={s.kicker}>City directory</p>
          <h2 id="dir-title" className={s.dirTitle}>
            Cinco paradas. Una trayectoria.
          </h2>
          <p className={s.lede}>{profile.pitch}</p>
          <div className={s.ctaRow}>
            <Link to="/experience" className={s.ctaPrimary}>
              Ver experiencia <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
            <a href={profile.cv.href} download={profile.cv.fileName} className={s.ctaGhost}>
              <Download size={18} aria-hidden="true" /> Descargar CV
            </a>
          </div>
        </div>

        <ol className={s.cards}>
          {locations.map((l) => (
            <li key={l.id} style={{ '--accent': l.accent } as React.CSSProperties}>
              <Link to={l.path} className={s.card}>
                <span className={s.cardArt}>
                  <BuildingIcon id={l.id} className={s.cardSvg} />
                </span>
                <span className={s.cardText}>
                  <span className={s.cardIndex}>
                    {l.index} · {l.place}
                  </span>
                  <span className={s.cardTitle}>{l.section}</span>
                  <span className={s.cardTeaser}>{l.teaser}</span>
                </span>
                <ArrowUpRight className={s.cardArrow} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
