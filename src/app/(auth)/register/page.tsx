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
import { registerUser } from '@/lib/api/user';
import { loginUser } from '@/lib/api/user/login';

const NAME_MIN_LENGTH = 3;
const NAME_MAX_LENGTH = 60;
const PASSWORD_MIN_LENGTH = 8;

const registerFormSchema = z
  .object({
    name: z.string().min(NAME_MIN_LENGTH).max(NAME_MAX_LENGTH),
    email: z.string().email(),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, 'At least 8 characters')
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/, {
        message: 'Include uppercase, lowercase, number, and special character.',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match',
  });

type RegisterFormValues = z.infer<typeof registerFormSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setError(null);
    try {
      await registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      await loginUser({ email: values.email, password: values.password });
      router.replace('/cluster');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Unable to create your account.',
      );
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
        maxWidth: '520px',
      }}
    >
      <Stack spacing={3} component="form" onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Typography variant="h5" component="h1" fontWeight={600}>
            Create your account
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Set up credentials or continue with Google or Facebook.
          </Typography>
        </Box>

        {error ? (
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        ) : null}

        <TextField
          label="Full name"
          fullWidth
          autoComplete="name"
          {...register('name')}
          error={Boolean(errors.name)}
          helperText={errors.name?.message}
        />

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
          autoComplete="new-password"
          fullWidth
          {...register('password')}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
        />

        <TextField
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          fullWidth
          {...register('confirmPassword')}
          error={Boolean(errors.confirmPassword)}
          helperText={errors.confirmPassword?.message}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating account…' : 'Create account'}
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
          Already have an account?{' '}
          <Button variant="text" href="/login">
            Sign in
          </Button>
        </Typography>
      </Stack>
    </Paper>
  );
}
