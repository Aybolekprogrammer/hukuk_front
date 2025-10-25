'use client';
import { useLang } from "@/hooks/useLang";
import {
  Paper,
  TextInput,
  Button,
  Title,
  Container,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";
import { useState } from "react";
import { postForgotPassword } from "@/api/post";
import SuccessMessage from "@/component/Success/Success";
import ErrorMessage from "@/component/Error/Error";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const { t, ready } = useLang();
  const router = useRouter();

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : `${t.invalid_email}`,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setSuccess('');
    setError('');
    setLoading(true);
    try {
      await postForgotPassword({ email: values.email });
      setSuccess(t.success);
      form.reset();
      setTimeout(() => {
        setLoading(false);
        router.push('/');
      }, 1000);
    } catch {
      setLoading(false);
      setError(t.error);
    }
  };

  if (!ready) return null;

  return (
    <Container size={520} my={40}>
      {success && <SuccessMessage message={success} />}
      {error && <ErrorMessage message={error} />}

      <Title className="text-2xl font-bold text-center 
                   text-gray-900 dark:text-white mb-8">
        {t.forgot}
      </Title>

      <p className="text-center text-gray-600 text-sm py-2">
        {t.reset_password_text}
      </p>

      <Paper
        withBorder
        shadow="md"
        p={30}
        m={10}
        radius="sm"
        className="dark:bg-gray-800"
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Email"
            placeholder="you@example.com"
            required
            {...form.getInputProps("email")}
            classNames={{
              input: "dark:bg-gray-800 dark:text-white",
              label: "dark:text-white",
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

          <p className="text-center text-sm mt-4 dark:text-gray-300">
            <Link
              href="/login"
              className="text-secondary underline hover:text-primary/80"
            >
              {t.back_to_login}
            </Link>
          </p>
        </form>
      </Paper>
    </Container>
  );
}
