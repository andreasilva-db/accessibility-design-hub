export const metadata = {
  title: "Acerca de | Hub de Accesibilidad",
  description: "Por qué importa la accesibilidad y qué cubre este proyecto.",
};

export default function AboutPage() {
  return (
    <article className="max-w-3xl px-4 md:px-6 py-8">
      <h1 className="text-4xl font-bold text-fg mb-6">Sobre este proyecto</h1>

      <section className="space-y-4 mb-10" aria-labelledby="why-heading">
        <h2 id="why-heading" className="text-2xl font-semibold text-fg">
          Por qué importa la accesibilidad
        </h2>
        <p className="text-fg-muted">
          La accesibilidad digital permite que todas las personas, incluidas aquellas con discapacidad o que usan tecnologías de asistencia, puedan percibir, usar y entender los productos y servicios en la web y en aplicaciones. No es un extra opcional: es un requisito para la inclusión y, en muchos ámbitos, una obligación legal.
        </p>
        <p className="text-fg-muted">
          Diseñar y desarrollar con accesibilidad desde el inicio reduce costes, mejora la experiencia para todo el mundo y amplía el alcance de lo que construimos. Este hub reúne criterios, guías y referencias para que equipos de diseño y desarrollo puedan aplicarlos en su día a día.
        </p>
      </section>

      <section className="space-y-4" aria-labelledby="scope-heading">
        <h2 id="scope-heading" className="text-2xl font-semibold text-fg">
          Qué cubre este proyecto
        </h2>
        <p className="text-fg-muted">
          El Hub de Accesibilidad ofrece documentación estructurada en secciones: Fundamentos (conceptos y normativa), Visual (contraste, tipografía, iconos), Interacción (teclado, foco, tiempos), Contenido (textos alternativos, estructura, formularios), Desarrollo (HTML, ARIA, pruebas) y Proceso de diseño (integración en el flujo de trabajo). Incluye además una sección de Recursos con enlaces y herramientas.
        </p>
        <p className="text-fg-muted">
          El objetivo es servir como referencia práctica para equipos que quieran alinear sus productos con las directrices WCAG y con buenas prácticas contrastadas, sin sustituir la evaluación con usuarios ni las pruebas con tecnologías de asistencia.
        </p>
      </section>
    </article>
  );
}
