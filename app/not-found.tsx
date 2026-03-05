export default function NotFound() {
  return (
    <article>
      <h1 className="text-2xl font-bold text-fg mb-2">Page not found</h1>
      <p className="text-fg-muted mb-4">The page you are looking for does not exist.</p>
      <a href="/" className="text-focus-ring hover:underline">
        Go to homepage
      </a>
    </article>
  );
}
