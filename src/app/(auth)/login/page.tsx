'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { loginUser } from '@/lib/api/user/login';

const PASSWORD_MIN_LENGTH = 8;

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(PASSWORD_MIN_LENGTH),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setError(null);
    try {
      await loginUser(values);
      router.replace('/cluster');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to login.');
    }
  };

  const handleOAuth = async (provider: 'google' | 'facebook') => {
    setError(null);
    await signIn(provider, {
      callbackUrl: '/cluster',
    });
  };

  return (
    <Paper
      elevation={4}
      sx={{
        padding: { xs: '2rem', sm: '3rem' },
        width: '100%',
        maxWidth: '480px',
      }}
    >
      <Stack spacing={3} component="form" onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Typography variant="h5" component="h1" fontWeight={600}>
            Welcome back
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign in to access your cluster workspace.
          </Typography>
        </Box>

        {error ? (
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        ) : null}

        <TextField
          label="Email"
          type="email"
          autoComplete="email"
          fullWidth
          {...register('email')}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
        />

        <TextField
          label="Password"
          type="password"
          autoComplete="current-password"
          fullWidth
          {...register('password')}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Signing in…' : 'Sign in'}
        </Button>

        <Divider>or continue with</Divider>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => handleOAuth('google')}
          >
            Google
          </Button>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => handleOAuth('facebook')}
          >
            Facebook
          </Button>
        </Stack>

        <Typography textAlign="center" variant="body2">
          Need an account?{' '}
          <Button variant="text" href="/register">
            Register
          </Button>
        </Typography>
      </Stack>
    </Paper>
  );
}
