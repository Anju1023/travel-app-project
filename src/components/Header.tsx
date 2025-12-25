import Link from 'next/link';
import { Plane } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full py-4 px-6 flex items-center justify-between border-b border-secondary bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <Link href="/" className="flex items-center gap-2 group">
        <div className="p-2 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
          <Plane className="w-6 h-6 text-primary transform group-hover:-rotate-12 transition-transform" />
        </div>
        <span className="text-xl font-bold tracking-tight text-primary">
          Fuwari
        </span>
      </Link>
      <nav>
        {/* Future nav items can go here */}
      </nav>
    </header>
  );
}
