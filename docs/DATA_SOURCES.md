# Fuentes de datos y conciliación

Todo el contenido profesional sale de tres fuentes. Nada se ha inventado.

| Fuente | Qué aporta |
|---|---|
| CV (PDF, nov. 2026) | Perfil, experiencia detallada, tecnologías, formación, idiomas, contacto |
| LinkedIn (export PDF) | Titular, extracto, puestos y fechas, formación, aptitudes principales |
| GitHub `alejmnz0` (repos públicos, sin forks) | Proyectos, stack real de cada uno, README, estructura |

> El acceso automático al perfil público de LinkedIn devolvió un bloqueo (HTTP 999), así que se usó el PDF exportado por Alejandro.

## Diferencias detectadas y decisión tomada

| Dato | CV | LinkedIn | Decisión (confirmada) |
|---|---|---|---|
| Email | desarrolladorjimenez@gmail.com | jimenezfernandev@gmail.com | CV |
| Puesto Ayesa | Desarrollador Full Stack | Programador full stack | CV |
| Puesto Babel | Ingeniero de Software (Full Stack) | Desarrollador full stack | CV |
| Fechas Babel | abr. 2024 – ago. 2025 (incl. prácticas abr.–jun. 2024) | jul. 2024 – ago. 2025 | CV + nota de prácticas |
| Formación | 2022 – 2024 | sept. 2022 – may. 2024 | Coherentes; se usan los meses de LinkedIn |

## Solo en una fuente

- **Solo CV**: responsabilidades por área, clientes (Endesa, Redexis, Región de Murcia, Unicaja, AXA), logro de 1–2 h/día ahorradas, idiomas, carné B, stack completo.
- **Solo LinkedIn**: extracto "Acerca de" (no se usa literalmente; el texto de la web se redactó a partir de datos concretos del CV).
- **Solo GitHub**: proyectos y tecnologías de proyectos (Electron, Flutter, Thymeleaf, SQLite, Vitest, Playwright, Pygame).

## Privacidad

- El teléfono aparece en el PDF del CV (que es público por decisión de Alejandro) pero **no** se muestra en la web.
- No se usa la foto del CV; la ficha muestra un monograma. Se puede activar una foto en `src/data/profile.ts` (`photo`).

## Pendiente de confirmar

- Participación en **Fiya** y **GradesDocker**: el repositorio está en la cuenta de Alejandro, pero no consta si fueron proyectos individuales o de equipo. La web los presenta como "Proyecto académico del CFGS DAM" sin afirmar autoría exclusiva.
