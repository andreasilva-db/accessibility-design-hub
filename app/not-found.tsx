export default function NotFound() {
  return (
    <article>
      <h1 className="text-2xl font-bold text-fg mb-2">Página no encontrada</h1>
      <p className="text-fg-muted mb-4">La página que buscas no existe.</p>
      <a href="/" className="text-focus-ring hover:underline">
        Volver al inicio
      </a>
    </article>
  );
}
