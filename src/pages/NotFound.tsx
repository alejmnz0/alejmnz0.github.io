import { Link } from 'react-router-dom';
import u from '../components/ui/ui.module.css';

export default function NotFound() {
  return (
    <section style={{ minHeight: '70svh', display: 'grid', placeItems: 'center', textAlign: 'center', padding: '3rem var(--gutter)' }}>
      <div>
        <p className={u.kicker}>Error 404</p>
        <h1 style={{ fontSize: 'var(--fs-3xl)', marginTop: '.5rem' }}>Wrong turn.</h1>
        <p style={{ color: 'var(--c-muted)', marginTop: '1rem', maxWidth: '40ch' }}>Esta calle no aparece en el mapa. Vuelve a la ciudad y elige otro destino.</p>
        <Link to="/" className={`${u.btn} ${u.secondary}`} style={{ marginTop: '2rem' }}>
          Volver al mapa
        </Link>
      </div>
    </section>
  );
}
