'use client';

import { useParams, useRouter } from 'next/navigation';
import {
  Paper,
  PasswordInput,
  Button,
  Title,
  Container,
  Group,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { postResetPassword } from '@/api/post';
import SuccessMessage from '@/component/Success/Success';
import ErrorMessage from '@/component/Error/Error';
import { useLang } from '@/hooks/useLang';

export default function ResetPasswordPage() {
  const params = useParams();
  const router = useRouter();
  const { t, ready } = useLang();

  const uid = params.uid as string;
  const token = params.token as string;

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      password: '',
    },
    validate: {
      password: (value) =>
        value.length < 6 ? `${t.invalid_password}` : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setSuccess('');
    setError('');
    setLoading(true);
    try {
      const response = await postResetPassword({
        uid,
        token,
        password: values.password,
      });

      console.log('Response:', response);
      setSuccess('Password reset successfully');
      setTimeout(() => router.push('/login'), 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (!ready) return null;

  return (
    <Container size={520} my={40}>
      {success && <SuccessMessage message={success} />}
      {error && <ErrorMessage message={error} />}

      <Title className="text-2xl font-bold text-center 
                      text-gray-900 dark:text-white mb-8">
        {t.reset_password}
      </Title>

      <Paper
        withBorder
        shadow="md"
        p={30}
        radius="sm"
        className="dark:bg-gray-800"
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <PasswordInput
            label={t.new_password}
            placeholder="********"
            required
            {...form.getInputProps('password')}
            classNames={{
              input: 'dark:bg-gray-800 dark:text-white',
              label: 'dark:text-white',
            }}
          />

          <Group mt="lg">
            <Button
              type="submit"
              fullWidth
              loading={loading}
              size="md"
              loaderProps={{ type: 'oval' }}
              styles={{
                root: {
                  backgroundColor: '#2563eb',
                  color: 'white',
                  fontWeight: 600,
                  transition: 'opacity 0.2s ease',
                  '&:hover': {
                    opacity: 0.85,
                  },
                },
              }}
            >
              {t.send}
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
