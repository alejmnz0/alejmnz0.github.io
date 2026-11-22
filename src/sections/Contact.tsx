import { useEffect, useRef, useState } from 'react';
import { Check, Copy, Download, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, Palm, StripedSun } from '../components/Art';
import { profile } from '../data/profile';
import { EMAIL, GITHUB_USER, LINKEDIN_URL } from '../data/social';
import s from './Contact.module.css';

async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = Object.assign(document.createElement('textarea'), { value: text });
    ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  }
}

export function Contact() {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onCopy = async () => {
    setCopied(await copy(EMAIL));
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2200);
  };

  const [user, domain] = EMAIL.split('@');

  return (
    <section className={s.section} aria-labelledby="contact-title" id="contact">
      <div className={s.inner}>
        <p className={s.index} data-reveal="up">
          05 · Night Club
        </p>
        <h2 id="contact-title" className={s.sign} data-reveal="zoom">
          <span className={s.l1}>¿Hablamos?</span>
        </h2>
        <p className={s.lede} data-reveal="up">
          {profile.openTo} Respondo en español o en inglés.
        </p>

        <div className={s.emailRow} data-reveal="up" style={{ '--d': 1 } as React.CSSProperties}>
          <a href={`mailto:${EMAIL}`} className={s.email}>
            <Mail size={22} aria-hidden="true" />
            <span>
              {user}
              <wbr />@{domain}
            </span>
          </a>
          <button type="button" className={s.copy} data-copied={copied || undefined} onClick={onCopy}>
            {copied ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
            {copied ? 'Copiado' : 'Copiar email'}
          </button>
          <span className="sr-only" role="status">
            {copied ? 'Email copiado al portapapeles' : ''}
          </span>
        </div>

        <ul className={s.links} data-reveal="up" style={{ '--d': 2 } as React.CSSProperties}>
          <li>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
              <LinkedinIcon /> LinkedIn
            </a>
          </li>
          <li>
            <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noopener noreferrer">
              <GithubIcon /> GitHub
            </a>
          </li>
          <li>
            <a href={profile.cv.href} download={profile.cv.fileName}>
              <Download size={20} aria-hidden="true" /> Descargar CV
            </a>
          </li>
        </ul>
      </div>

      <footer className={s.footer}>
        <div className={s.sunset} aria-hidden="true">
          <StripedSun className={s.footSun} id="foot-sun" />
          <div className={s.footGrid} />
          <Palm className={`${s.footPalm} ${s.fpL}`} lean={40} height={420} />
          <Palm className={`${s.footPalm} ${s.fpR}`} lean={-50} height={380} />
        </div>
        <div className={s.footText}>
          <p>
            © {new Date(__BUILD_DATE__).getFullYear()} {profile.fullName} · {profile.location}
          </p>
          <p>Diseñado y programado a mano con React, TypeScript y Vite.</p>
          <a href="#top" className={s.top}>
            Volver arriba ↑
          </a>
        </div>
      </footer>
    </section>
  );
}
