import Link from 'next/link';
import { Plane } from 'lucide-react';

export default function Header() {
	return (
		<header className="sticky top-4 z-50 px-4 mb-8">
			<div className="backdrop-blur-md bg-white/60 border border-white/50 shadow-sm rounded-full px-6 py-3 flex items-center justify-between max-w-3xl mx-auto transition-all hover:shadow-md">
				<Link href="/" className="flex items-center gap-2 group">
					<div className="p-2 bg-linear-to-br from-sky-400 to-sky-500 rounded-full text-white shadow-sm transition-transform group-hover:rotate-12">
						<Plane size={20} />
					</div>
					<span className="font-bold text-xl text-slate-700 tracking-tight group-hover:text-sky-500 transition-colors">
						Fuwari
					</span>
				</Link>
				<nav>
					{/* Future nav items can go here */}
				</nav>
			</div>
		</header>
	);
}