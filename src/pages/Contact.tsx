import { useEffect, useRef, useState } from 'react';
import { Check, Copy, Download, Mail, MapPin } from 'lucide-react';
import { SectionShell } from '../components/layout/SectionShell';
import { GithubIcon, LinkedinIcon } from '../components/ui/icons';
import u from '../components/ui/ui.module.css';
import { profile } from '../data/profile';
import { EMAIL, social } from '../data/social';
import s from './Contact.module.css';

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  }
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onCopy = async () => {
    const ok = await copyText(EMAIL);
    setCopied(ok);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2200);
  };

  const gh = social.find((x) => x.id === 'github')!;
  const li = social.find((x) => x.id === 'linkedin')!;

  return (
    <SectionShell id="nightclub" title="Contact" intro={<p>{profile.openTo}</p>}>
      <div className={s.club}>
        <div className={s.signWrap} aria-hidden="true">
          <p className={s.sign}>
            Open <span>late</span>
          </p>
          <p className={s.subSign}>Recruiters &amp; builders welcome</p>
        </div>

        <div className={s.guestlist}>
          <div className={s.ticketHead}>
            <span>Guest list</span>
            <span>
              <MapPin size={14} aria-hidden="true" /> {profile.location}
            </span>
          </div>

          <p className={s.pitch}>
            Si buscas a alguien que construya APIs, integre sistemas y se ocupe de que lleguen a producción, hablemos. Respondo en español o en inglés.
          </p>

          <div className={s.emailRow}>
            <a href={`mailto:${EMAIL}`} className={s.email}>
              <Mail size={20} aria-hidden="true" />
              <span>
                {EMAIL.split('@')[0]}
                <wbr />@{EMAIL.split('@')[1]}
              </span>
            </a>
            <button type="button" className={`${u.btn} ${copied ? u.secondary : u.ghost} ${s.copy}`} onClick={onCopy}>
              {copied ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
              {copied ? 'Copiado' : 'Copiar email'}
            </button>
            <span className="sr-only" role="status">
              {copied ? 'Email copiado al portapapeles' : ''}
            </span>
          </div>

          <ul className={s.doors}>
            <li>
              <a href={li.href} target="_blank" rel="noopener noreferrer" className={s.door}>
                <LinkedinIcon size={22} />
                <span>
                  <strong>LinkedIn</strong>
                  <small>{li.display}</small>
                </span>
              </a>
            </li>
            <li>
              <a href={gh.href} target="_blank" rel="noopener noreferrer" className={s.door}>
                <GithubIcon size={22} />
                <span>
                  <strong>GitHub</strong>
                  <small>{gh.display}</small>
                </span>
              </a>
            </li>
            <li>
              <a href={profile.cv.href} download={profile.cv.fileName} className={s.door}>
                <Download size={22} aria-hidden="true" />
                <span>
                  <strong>Currículum</strong>
                  <small>PDF · actualizado {profile.cv.updated.split('-').reverse().join('/')}</small>
                </span>
              </a>
            </li>
          </ul>
          <div className={s.rope} aria-hidden="true" />
        </div>
      </div>
    </SectionShell>
  );
}
