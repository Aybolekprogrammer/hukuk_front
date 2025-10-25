"use client";

import { useLang } from "@/hooks/useLang";
import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Container,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";
import { useState } from "react";
import { postLogin } from "@/api/post";
import SuccessMessage from "@/component/Success/Success";
import ErrorMessage from "@/component/Error/Error";
import { useRouter, useSearchParams } from "next/navigation";
import { saveToken } from "@/utils/auth";

export default function LoginClient() {
  const { t, ready } = useLang();
  const router = useRouter();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const form = useForm({
    initialValues: { username: "", password: "" },
    validate: {
      password: (value) => (value.length >= 6 ? null : `${t.invalid_password}`),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setSuccess("");
    setError("");
    setLoading(true);
    try {
      const res = await postLogin({
        username: values.username,
        password: values.password,
      });
      saveToken(res.access);
      setSuccess(t.success);
      form.reset();

      setTimeout(() => {
        setLoading(false);
        router.push(redirectPath);
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

      <Title className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
        {t.login}
      </Title>

      <p className="text-center text-gray-600 text-sm py-2">{t.login_text}</p>

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
            label={t.name}
            placeholder="username"
            required
            {...form.getInputProps("username")}
            classNames={{
              input: "dark:bg-gray-800 dark:text-white",
              label: "dark:text-white",
            }}
          />

          <PasswordInput
            label={t.password}
            placeholder="********"
            required
            mt="sm"
            {...form.getInputProps("password")}
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
              {t.login}
            </Button>

          </Group>

          <p className="text-center text-sm mt-4 dark:text-gray-300">
            {t.no_account}{" "}
            <Link
              href="/register"
              className="text-secondary underline hover:text-primary/80"
            >
              {t.register}
            </Link>
          </p>

          <p className="text-center text-sm mt-2 dark:text-gray-300">
            <Link
              href="/forgot-password"
              className="text-secondary underline hover:text-primary/80"
            >
              {t.forgot}
            </Link>
          </p>
        </form>
      </Paper>
    </Container>
  );
}
