import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Dashboard } from './pages/Dashboard';
import { RecipeDetail } from './pages/RecipeDetail';
import { Footer } from './components/atoms/Footer';
import { TopNav } from './components/organisms/TopNav';
import { CookModeOverlay } from './components/modals/CookModeOverlay';
import { RecipeProvider } from './context/RecipeContext';
import { PreferencesProvider } from './context/PreferencesContext';
import { NetworkProvider } from './context/NetworkContext';
import { CookModeProvider } from './context/CookModeContext';

const APP_VERSION = '0.1.0-alpha';

function App() {
	return (
		<PreferencesProvider>
			<RecipeProvider>
				<NetworkProvider>
					<BrowserRouter>
						<CookModeProvider>
							<div className='flex flex-col h-screen w-full bg-bg-secondary text-text relative'>
								<TopNav />
								<main className='flex-1 overflow-y-auto'>
									<Routes>
										<Route
											path='/dashboard'
											element={<Dashboard />}
										/>
										<Route
											path='/recipe/:id'
											element={<RecipeDetail />}
										/>
										<Route
											path='/'
											element={
												<Navigate
													to='/dashboard'
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
					</BrowserRouter>
				</NetworkProvider>
			</RecipeProvider>
		</PreferencesProvider>
	);
}

export default App;
