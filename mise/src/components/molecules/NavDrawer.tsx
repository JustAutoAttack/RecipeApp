import { useRef, useEffect } from 'react';
import {
	X,
	Plus,
	ChefHat,
	Compass,
	Home,
	Settings as SettingsIcon,
	User as UserIcon,
	LogOut
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

import { Button } from '../atoms/Button';
import { NavItemButton } from '../atoms/NavItemButton';
import { useCookMode } from '../../features/cook_mode/CookModeContext';
import { useAuth } from '../../context/AuthContext';

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
	const { user, logout } = useAuth();
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
		navigate(path.startsWith('/') ? path : `/${path}`);
		onClose();
	};

	const handleLogout = () => {
		logout();
		navigate('/auth');
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
				{/* Header */}
				<div className='flex items-center justify-between pb-6 border-b border-border'>
					<span className='font-bold text-lg text-text'>
						Mise en place
					</span>
					<button
						onClick={onClose}
						aria-label='Close menu'
						className='p-2 rounded-lg text-text-secondary hover:bg-bg-hover transition-colors'
					>
						<X className='w-5 h-5' />
					</button>
				</div>

				{/* Navigation Links */}
				<div className='flex-1 py-6 space-y-2 overflow-y-auto'>
					<NavItemButton
						icon={<Home className='w-4 h-4' />}
						label='Dashboard'
						isActive={location.pathname === '/dashboard'}
						onClick={() => handleNavigate('/dashboard')}
					/>
					<NavItemButton
						icon={<Compass className='w-4 h-4' />}
						label='Explore'
						isActive={location.pathname === '/explore'}
						onClick={() => handleNavigate('/explore')}
					/>
					<NavItemButton
						icon={<SettingsIcon className='w-4 h-4' />}
						label='Settings'
						isActive={location.pathname === '/settings'}
						onClick={() => handleNavigate('/settings')}
					/>

					{/* Actions Section: Create & Cook */}
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
							<Button
								onClick={() => {
									// Navigate to cook mode / session view or handle resume action
									handleNavigate('/cook-mode');
								}}
								variant='secondary'
								className='w-full justify-center border-accent/30 text-accent hover:bg-accent/10'
							>
								<ChefHat className='w-4 h-4 mr-2' />
								<span className='truncate'>
									Cook ({activeSession.recipe.title})
								</span>
							</Button>
						)}
					</div>
				</div>

				{/* Footer - Always Authenticated */}
				<div className='pt-6 border-t border-border'>
					{user && (
						<div className='flex items-center justify-between w-full'>
							<button
								onClick={() => handleNavigate('/account')}
								className={`flex items-center gap-2.5 text-sm font-medium transition-colors truncate pr-2 ${
									location.pathname === '/account'
										? 'text-accent'
										: 'text-text hover:text-accent'
								}`}
							>
								<div className='w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0'>
									<UserIcon className='w-4 h-4' />
								</div>
								<span className='truncate'>
									{user.username}
								</span>
							</button>
							<button
								onClick={handleLogout}
								title='Logout'
								className='p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors shrink-0'
							>
								<LogOut className='w-4 h-4' />
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
