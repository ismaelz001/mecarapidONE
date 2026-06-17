import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politica de Cookies | MecaRapid',
  description: 'Informacion sobre el uso de cookies en MecaRapid.',
};

export default function CookiesPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 text-mr-text">
      <h1 className="text-3xl font-bold mb-8">Politica de Cookies</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">1. Responsable del tratamiento</h2>
        <p className="text-mr-text/80">
          RodorteDev — ismael@rodorte.com<br />
          En cumplimiento del RGPD (UE) 2016/679 y la LSSI-CE.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">2. Que son las cookies</h2>
        <p className="text-mr-text/80">
          Las cookies son pequenos ficheros de texto que se almacenan en tu dispositivo cuando visitas
          una pagina web. Permiten recordar tus preferencias y mejorar la experiencia de uso.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">3. Cookies que utilizamos</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse border border-mr-border">
            <thead>
              <tr className="bg-mr-primary/30">
                <th className="border border-mr-border px-3 py-2 text-left">Nombre</th>
                <th className="border border-mr-border px-3 py-2 text-left">Tipo</th>
                <th className="border border-mr-border px-3 py-2 text-left">Finalidad</th>
                <th className="border border-mr-border px-3 py-2 text-left">Duracion</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-mr-border px-3 py-2">mecarapid-cookie-consent</td>
                <td className="border border-mr-border px-3 py-2">Propia / Tecnica</td>
                <td className="border border-mr-border px-3 py-2">Guardar tu eleccion sobre cookies</td>
                <td className="border border-mr-border px-3 py-2">Persistente (localStorage)</td>
              </tr>
              <tr>
                <td className="border border-mr-border px-3 py-2">Google Fonts</td>
                <td className="border border-mr-border px-3 py-2">Terceros / Tecnica</td>
                <td className="border border-mr-border px-3 py-2">Carga de tipografias desde servers de Google (fonts.googleapis.com)</td>
                <td className="border border-mr-border px-3 py-2">Sesion</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">4. Como gestionar las cookies</h2>
        <p className="text-mr-text/80 mb-3">
          Puedes aceptar o rechazar las cookies desde el banner que aparece en tu primera visita,
          o en cualquier momento desde el pie de pagina (opcion &quot;Gestionar cookies&quot;).
        </p>
        <p className="text-mr-text/80">
          Tambien puedes configurar tu navegador para bloquear cookies:{' '}
          <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="underline text-mr-accent">Chrome</a>
          {' · '}
          <a href="https://support.mozilla.org/es/kb/cookies-informacion-que-los-sitios-web-guardan-en-" target="_blank" rel="noopener noreferrer" className="underline text-mr-accent">Firefox</a>
          {' · '}
          <a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="underline text-mr-accent">Safari</a>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">5. Tus derechos</h2>
        <p className="text-mr-text/80">
          Tienes derecho a acceder, rectificar, suprimir y oponerte al tratamiento de tus datos.
          Escribe a ismael@rodorte.com para ejercerlos.
          Si no recibes respuesta satisfactoria, puedes reclamar ante la{' '}
          <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="underline text-mr-accent">AEPD</a>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">6. Actualizaciones</h2>
        <p className="text-mr-text/80">
          Esta politica puede actualizarse. La fecha de ultima modificacion aparece al pie.
          El uso continuado del servicio tras un cambio implica su aceptacion.
        </p>
        <p className="text-sm text-mr-text/50 mt-2">Ultima actualizacion: junio 2025</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">7. Contacto</h2>
        <p className="text-mr-text/80">
          RodorteDev · ismael@rodorte.com
        </p>
      </section>
    </main>
  );
}
