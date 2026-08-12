import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { NetworkProvider, ThemeProvider, APP_VERSION } from '@core';
import { AuthProvider, useAuth } from '@auth';
import { RecipeProvider } from '@recipes';
import { CookModeProvider, CookModeOverlay } from '@cook_mode';
import { Footer, TopNav } from './components';
import {
	AccountPage,
	AuthPage,
	DashboardPage,
	ExplorePage,
	RecipeDetailPage,
	SettingsPage
} from './pages';

import './index.css';

const AuthenticatedLayout = () => {
	return (
		<RecipeProvider>
			<CookModeProvider>
				<div className='flex flex-col h-screen w-full bg-bg-secondary text-text relative'>
					<TopNav />
					<main className='flex-1 overflow-y-auto'>
						<Routes>
							<Route
								path='/'
								element={<DashboardPage />}
							/>
							<Route
								path='/dashboard'
								element={<DashboardPage />}
							/>
							<Route
								path='/explore'
								element={<ExplorePage />}
							/>
							<Route
								path='/settings'
								element={<SettingsPage />}
							/>
							<Route
								path='/account'
								element={<AccountPage />}
							/>
							<Route
								path='/recipe/:id'
								element={<RecipeDetailPage />}
							/>
							<Route
								path='*'
								element={
									<Navigate
										to='/'
										replace
									/>
								}
							/>
						</Routes>
					</main>
					<Footer version={APP_VERSION} />
					<CookModeOverlay />
				</div>
			</CookModeProvider>
		</RecipeProvider>
	);
};

const AuthLayout = () => {
	return (
		<div className='flex flex-col h-screen w-full bg-bg-secondary text-text relative'>
			<main className='flex-1 overflow-y-auto flex items-center justify-center'>
				<AuthPage />
			</main>
			<Footer version={APP_VERSION} />
		</div>
	);
};

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
	const { user } = useAuth();
	if (!user) {
		return (
			<Navigate
				to='/auth'
				replace
			/>
		);
	}
	return <>{children}</>;
};

export function App() {
	return (
		<ThemeProvider>
			<NetworkProvider>
				<AuthProvider>
					<BrowserRouter>
						<Routes>
							<Route
								path='/auth'
								element={<AuthLayout />}
							/>
							<Route
								path='/*'
								element={
									<RequireAuth>
										<AuthenticatedLayout />
									</RequireAuth>
								}
							/>
						</Routes>
					</BrowserRouter>
				</AuthProvider>
			</NetworkProvider>
		</ThemeProvider>
	);
}
