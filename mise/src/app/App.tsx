import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Dashboard } from '../pages/DashboardPage';
import { Explore } from '../pages/ExplorePage';
import { Settings } from '../pages/SettingsPage';
import { Account } from '../pages/AccountPage';
import { RecipeDetail } from '../pages/RecipeDetailPage';
import { AuthPage } from '../pages/AuthPage';
import { Footer } from './components/molecules/Footer';
import { TopNav } from './components/organisms/TopNav';
import { CookModeOverlay } from './components/modals/CookModeOverlay';
import { RecipeProvider } from '../features/recipes/RecipeContext';
import { PreferencesProvider } from '../context/PreferencesContext';
import { NetworkProvider } from '../core/network/NetworkContext';
import { CookModeProvider } from '../features/cook_mode/CookModeContext';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';

import './index.css';

const APP_VERSION = '0.1.0-alpha';

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
								element={<Dashboard />}
							/>
							<Route
								path='/dashboard'
								element={<Dashboard />}
							/>
							<Route
								path='/explore'
								element={<Explore />}
							/>
							<Route
								path='/settings'
								element={<Settings />}
							/>
							<Route
								path='/account'
								element={<Account />}
							/>
							<Route
								path='/recipe/:id'
								element={<RecipeDetail />}
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

function App() {
	return (
		<ThemeProvider>
			<PreferencesProvider>
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
			</PreferencesProvider>
		</ThemeProvider>
	);
}

export default App;
