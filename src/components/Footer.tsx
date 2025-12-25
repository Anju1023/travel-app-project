export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full py-6 text-center text-sm text-muted-foreground mt-auto bg-muted/30">
      <p>&copy; {year} AI Travel Planner. Powered by Gemini 3.0 Flash.</p>
    </footer>
  );
}
