/**
 * Runs before paint to set dark class from localStorage or system preference.
 * Prevents flash of wrong theme.
 */
export function ThemeScript() {
  const script = `(function(){var d=document.documentElement;var s=localStorage.getItem('theme');if(s==='dark'||(s!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches)){d.classList.add('dark');}else{d.classList.remove('dark');}})();`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
