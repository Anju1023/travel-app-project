import Link from 'next/link';
import { Plane } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full py-4 px-6 flex items-center justify-between glass sticky top-0 z-50 transition-all duration-300">
      <Link href="/" className="flex items-center gap-3 group">
        <div className="p-2.5 bg-gradient-to-tr from-sky-400 to-cyan-300 rounded-xl shadow-lg shadow-sky-200/50 group-hover:shadow-sky-300/60 transition-all duration-300 animate-float">
          <Plane className="w-5 h-5 text-white transform group-hover:-rotate-12 transition-transform" />
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-700">
          Fuwari
        </span>
      </Link>
      <nav>
        {/* Future nav items can go here */}
      </nav>
    </header>
  );
}
