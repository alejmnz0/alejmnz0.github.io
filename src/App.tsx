import { useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { SvgDefs } from './components/city/SvgDefs';
import { Konami } from './components/easter/Konami';
import { Terminal } from './components/easter/Terminal';
import { Intro } from './components/intro/Intro';
import { Footer } from './components/layout/Footer';
import { Nav } from './components/layout/Nav';
import { ViceRadio } from './components/radio/ViceRadio';
import { metaFor } from './config/site';
import About from './pages/About';
import Contact from './pages/Contact';
import Experience from './pages/Experience';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Projects from './pages/Projects';
import Skills from './pages/Skills';

function RouteEffects() {
  const { pathname } = useLocation();
  const first = useRef(true);
  useEffect(() => {
    document.title = metaFor(pathname).title;
    if (first.current) {
      first.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    // move focus to the new page for keyboard and screen-reader users
    document.getElementById('main')?.focus({ preventScroll: true });
  }, [pathname]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();
  return (
    <>
      <a href="#main" className="skip-link">
        Saltar al contenido
      </a>
      <SvgDefs />
      <RouteEffects />
      <Nav />
      <main id="main" tabIndex={-1} key={pathname} className="page-enter">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ViceRadio />
      <Terminal />
      <Konami />
      <Intro />
      <div className="fx-grain" aria-hidden="true" />
      <div className="fx-scan" aria-hidden="true" />
    </>
  );
}
