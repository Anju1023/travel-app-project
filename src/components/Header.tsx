import Link from 'next/link';
import { Plane } from 'lucide-react';

export default function Header() {
	return (
		<header className="w-full py-4 px-6 flex items-center justify-between border-b border-gray-200">
			<Link href="/" className="flex items-center gap-2">
				<div className="p-2 bg-gray-100 rounded">
					<Plane className="w-5 h-5 text-gray-700" />
				</div>
				<span className="text-xl font-bold text-gray-900">
					Fuwari
				</span>
			</Link>
			<nav>{/* Future nav items can go here */}</nav>
		</header>
	);
}