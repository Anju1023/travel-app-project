import Link from 'next/link';
import { Plane } from 'lucide-react';

export default function Header() {
	return (
		<header className="sticky top-0 z-50 w-full py-3 px-6 flex items-center justify-between glass-panel rounded-none border-t-0 border-x-0 border-b border-white/40 mb-4">
			<Link href="/" className="flex items-center gap-2 group">
				<div className="p-2 bg-gradient-to-br from-[var(--color-ice-white)] to-white rounded-full shadow-md group-hover:scale-110 transition-transform duration-300">
					<Plane className="w-5 h-5 text-[var(--color-ocean-blue)] transform -rotate-45" />
				</div>
				<span className="text-xl font-bold bg-gradient-to-r from-[var(--color-ocean-blue)] to-[var(--color-sunset-orange)] bg-clip-text text-transparent">
					Fuwari
				</span>
			</Link>
			<nav>{/* Future nav items can go here */}</nav>
		</header>
	);
}