import Link from 'next/link';
import { Plane } from 'lucide-react';

export default function Header() {
	return (
		<header className="sticky top-0 z-50 w-full py-4 px-6 flex items-center justify-between bg-[var(--color-bg-base)]/80 backdrop-blur-md border-b border-[var(--color-border)] mb-4">
			<Link href="/" className="flex items-center gap-2 group">
				<div className="p-2 bg-[var(--color-text-main)] rounded-lg shadow-sm transition-transform duration-200 group-hover:scale-105">
					<Plane className="w-5 h-5 text-white transform -rotate-45" />
				</div>
				<span className="text-xl font-bold text-[var(--color-text-main)] tracking-tight">
					Fuwari
				</span>
			</Link>
			<nav>{/* Future nav items can go here */}</nav>
		</header>
	);
}