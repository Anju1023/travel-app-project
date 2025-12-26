export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <p>&copy; {year} Fuwari. Powered by Gemini 3.0 Flash ⚡️</p>
    </footer>
  );
}