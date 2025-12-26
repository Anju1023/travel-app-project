export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full py-6 text-center text-sm font-medium text-[var(--color-deep-ocean)]/60 mt-auto">
      <p>&copy; {year} Fuwari. Powered by Gemini 3.0 Flash ⚡️</p>
    </footer>
  );
}