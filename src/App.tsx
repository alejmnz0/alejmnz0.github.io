import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Nav } from './components/Nav';
import { profile } from './data/profile';
import { useHeroScroll, useReveal } from './hooks/useReveal';
import { About } from './sections/About';
import { Contact } from './sections/Contact';
import { Experience } from './sections/Experience';
import { Projects } from './sections/Projects';
import { Skills } from './sections/Skills';

export default function App() {
  useReveal();
  useHeroScroll();
  return (
    <>
      <a href="#about" className="skip">
        Saltar al contenido
      </a>
      <Nav />
      <Hero />
      <main>
        <Marquee
          top={profile.stackLine}
          bottom={['Microservicios', 'APIs REST', 'TypeScript', 'React', 'PostgreSQL', 'PM2', 'Automatización', 'Sevilla']}
        />
        <About />
        <Experience />
        <Marquee top={['Software engineering', 'meets the 80s', 'Miami nights', 'Clean code']} bottom={['Ayesa', 'Babel', 'Salesianos Triana', 'GitHub · alejmnz0']} />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <div className="grain" aria-hidden="true" />
    </>
  );
}
