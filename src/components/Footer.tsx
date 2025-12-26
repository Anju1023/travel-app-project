export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 py-8 text-center text-slate-400 text-sm">
      <p className="flex items-center justify-center gap-2">
        &copy; {year} Fuwari. 
        <span className="opacity-60">Powered by Gemini 3.0 Flash ⚡️</span>
      </p>
    </footer>
  );
}