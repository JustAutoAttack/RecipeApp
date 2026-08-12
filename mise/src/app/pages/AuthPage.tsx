import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat } from 'lucide-react';

import { Button, Input } from '@design_system';
import { useAuth } from '@auth';

export const AuthPage = () => {
	const navigate = useNavigate();
	const { signIn, signUp } = useAuth();
	const [isSignUp, setIsSignUp] = useState(false);
	const [username, setUsername] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');

		if (!username.trim()) {
			setError('Please enter a username.');
			return;
		}

		setLoading(true);
		try {
			if (isSignUp) {
				await signUp(username.trim());
			} else {
				await signIn(username.trim());
			}
			navigate('/dashboard', { replace: true });
		} catch (err: any) {
			setError(err.message || 'Authentication failed. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-bg px-4'>
			<div className='max-w-md w-full bg-bg border border-border rounded-xl shadow-lg p-8 space-y-6'>
				<div className='flex flex-col items-center text-center space-y-2'>
					<div className='w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent'>
						<ChefHat className='w-6 h-6' />
					</div>
					<h1 className='text-2xl font-bold text-text'>
						{isSignUp ? 'Create an Account' : 'Welcome Back'}
					</h1>
					<p className='text-sm text-text-secondary'>
						{isSignUp
							? 'Start organizing and sharing your favorite recipes'
							: 'Sign in to access your recipe workspace'}
					</p>
				</div>

				{error && (
					<div className='p-3 rounded-lg bg-red-50 text-red-600 text-sm'>
						{error}
					</div>
				)}

				<form
					onSubmit={handleSubmit}
					className='space-y-4'
				>
					<Input
						label='Username'
						type='text'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder='Enter your username'
						required
						autoFocus
					/>

					<Button
						type='submit'
						variant='primary'
						className='w-full py-2.5'
						disabled={loading}
					>
						{loading
							? 'Processing...'
							: isSignUp
								? 'Sign Up'
								: 'Sign In'}
					</Button>
				</form>

				<div className='text-center text-sm'>
					<button
						type='button'
						onClick={() => setIsSignUp(!isSignUp)}
						className='text-text-secondary hover:text-accent font-medium transition-colors'
					>
						{isSignUp
							? 'Already have an account? Sign in'
							: "Don't have an account? Sign up"}
					</button>
				</div>
			</div>
		</div>
	);
};
