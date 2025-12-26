export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full py-6 text-center text-sm text-gray-500 mt-auto border-t border-gray-200">
      <p>&copy; {year} Fuwari. Powered by Gemini 3.0 Flash.</p>
    </footer>
  );
}