import { useRef, useEffect } from 'react';
import {
	X,
	Plus,
	ChefHat,
	Compass,
	Home,
	Settings as SettingsIcon,
	User,
	LogOut
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

import { Button } from '../atoms/Button';
import { useCookMode } from '../../context/CookModeContext';

interface NavDrawerProps {
	isOpen: boolean;
	onClose: () => void;
	onOpenNewRecipe: () => void;
}

export const NavDrawer = ({
	isOpen,
	onClose,
	onOpenNewRecipe
}: NavDrawerProps) => {
	const navigate = useNavigate();
	const location = useLocation();
	const { activeSession } = useCookMode();
	const drawerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				drawerRef.current &&
				!drawerRef.current.contains(e.target as Node)
			) {
				onClose();
			}
		};
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}
		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
	}, [isOpen, onClose]);

	const handleNavigate = (path: string) => {
		navigate(path);
		onClose();
	};

	return (
		<div
			className={`fixed inset-0 z-50 transition-all duration-300 ${
				isOpen
					? 'bg-black/50 backdrop-blur-xs opacity-100 pointer-events-auto'
					: 'bg-black/0 backdrop-blur-none opacity-0 pointer-events-none'
			}`}
		>
			<div
				ref={drawerRef}
				className={`absolute inset-y-0 left-0 w-72 bg-bg border-r border-border shadow-2xl flex flex-col justify-between p-6 transition-transform duration-300 ease-out ${
					isOpen ? 'translate-x-0' : '-translate-x-full'
				}`}
			>
				{/* Drawer Header */}
				<div className='flex items-center justify-between pb-6 border-b border-border'>
					<span className='font-bold text-lg text-text'>
						Recipe IDE
					</span>
					<button
						onClick={onClose}
						aria-label='Close menu'
						className='p-2 rounded-lg text-text-secondary hover:bg-bg-hover transition-colors'
					>
						<X className='w-5 h-5' />
					</button>
				</div>

				{/* Drawer Navigation Links */}
				<div className='flex-1 py-6 space-y-2 overflow-y-auto'>
					<button
						onClick={() => handleNavigate('/dashboard')}
						className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
							location.pathname === '/dashboard'
								? 'bg-accent/10 text-accent'
								: 'text-text hover:bg-bg-hover'
						}`}
					>
						<Home className='w-4 h-4' /> Dashboard
					</button>
					<button
						onClick={() => handleNavigate('/explore')}
						className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
							location.pathname === '/explore'
								? 'bg-accent/10 text-accent'
								: 'text-text hover:bg-bg-hover'
						}`}
					>
						<Compass className='w-4 h-4' /> Explore
					</button>
					<button
						onClick={() => handleNavigate('/settings')}
						className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
							location.pathname === '/settings'
								? 'bg-accent/10 text-accent'
								: 'text-text hover:bg-bg-hover'
						}`}
					>
						<SettingsIcon className='w-4 h-4' /> Settings
					</button>

					<div className='pt-4 space-y-2'>
						<Button
							onClick={() => {
								onClose();
								onOpenNewRecipe();
							}}
							variant='primary'
							className='w-full justify-center'
						>
							<Plus className='w-4 h-4 mr-2' /> Create
						</Button>
						{activeSession && (
							<button
								onClick={onClose}
								className='w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-border text-sm font-medium hover:bg-bg-hover transition-colors text-text'
							>
								<ChefHat className='w-4 h-4 text-accent' /> Cook
								({activeSession.recipe.title})
							</button>
						)}
					</div>
				</div>

				{/* Drawer Footer: Account & Logout */}
				<div className='pt-6 border-t border-border space-y-2'>
					<button
						onClick={() => handleNavigate('/account')}
						className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
							location.pathname === '/account'
								? 'bg-accent/10 text-accent'
								: 'text-text hover:bg-bg-hover'
						}`}
					>
						<User className='w-4 h-4 text-text-secondary' /> Account
					</button>
					<button
						onClick={onClose}
						className='w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors'
					>
						<LogOut className='w-4 h-4' /> Logout
					</button>
				</div>
			</div>
		</div>
	);
};
