import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Dashboard } from './pages/Dashboard';
import { RecipeDetail } from './pages/RecipeDetail';
import { Footer } from './components/molecules/Footer';
import { TopNav } from './components/organisms/TopNav';
import { RecipeProvider } from './context/RecipeContext';

const APP_VERSION = '0.1.0-alpha';

function App() {
	return (
		<RecipeProvider>
			<BrowserRouter>
				<div className='flex flex-col h-screen w-full bg-bg-secondary text-text'>
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
				</div>
			</BrowserRouter>
		</RecipeProvider>
	);
}

export default App;
