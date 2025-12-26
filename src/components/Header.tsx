import Link from 'next/link';
import { Plane } from 'lucide-react';

export default function Header() {
	return (
		<header>
			<Link href="/">
				<div>
					<Plane />
				</div>
				<span>
					Fuwari
				</span>
			</Link>
			<nav>{/* Future nav items can go here */}</nav>
		</header>
	);
}