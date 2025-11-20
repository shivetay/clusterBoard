'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Box, Typography, Button, Paper, Alert } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

/**
 * Auth error page
 * Displays authentication errors
 */
export default function AuthErrorPage() {
	const searchParams = useSearchParams();
	const error = searchParams?.get('error');

	const getErrorMessage = (error: string | null) => {
		switch (error) {
			case 'Configuration':
				return 'There is a problem with the server configuration.';
			case 'AccessDenied':
				return 'Access denied. You do not have permission to sign in.';
			case 'Verification':
				return 'The verification token has expired or has already been used.';
			case 'OAuthSignin':
				return 'Error in constructing an authorization URL.';
			case 'OAuthCallback':
				return 'Error in handling the response from an OAuth provider.';
			case 'OAuthCreateAccount':
				return 'Could not create OAuth provider user in the database.';
			case 'EmailCreateAccount':
				return 'Could not create email provider user in the database.';
			case 'Callback':
				return 'Error in the OAuth callback handler route.';
			case 'OAuthAccountNotLinked':
				return 'Email already exists. Try signing in with a different account.';
			case 'CredentialsSignin':
				return 'Invalid email or password.';
			default:
				return 'An unexpected error occurred. Please try again.';
		}
	};

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				minHeight: '100vh',
				padding: 2,
				backgroundColor: 'background.default',
			}}
		>
			<Paper
				elevation={3}
				sx={{
					padding: 4,
					maxWidth: 500,
					width: '100%',
					textAlign: 'center',
				}}
			>
				<ErrorOutlineIcon
					sx={{
						fontSize: 64,
						color: 'error.main',
						mb: 2,
					}}
				/>

				<Typography variant="h4" component="h1" gutterBottom>
					Authentication Error
				</Typography>

				<Alert severity="error" sx={{ my: 3, textAlign: 'left' }}>
					{getErrorMessage(error)}
				</Alert>

				<Typography variant="body2" color="text.secondary" mb={3}>
					If this problem persists, please contact support.
				</Typography>

				<Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
					<Button variant="contained" component={Link} href="/login">
						Try Again
					</Button>

					<Button variant="outlined" component={Link} href="/">
						Go Home
					</Button>
				</Box>
			</Paper>
		</Box>
	);
}
