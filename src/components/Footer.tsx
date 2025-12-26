export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full py-6 text-center text-sm font-medium text-[var(--color-ocean-blue)]/70 mt-auto">
      <p>&copy; {year} Fuwari. Powered by Gemini 3.0 Flash ⚡️</p>
    </footer>
  );
}