'use client';
import { useLang } from "@/hooks/useLang";
import {
  Paper, TextInput, PasswordInput, Button, Title, Container, Group, Checkbox,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";
import { useState } from "react";
import { postRegister } from "@/api/post";
import SuccessMessage from "@/component/Success/Success";
import ErrorMessage from "@/component/Error/Error";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { t, ready } = useLang();
  const router = useRouter();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      accepted_terms: false,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : `${t.invalid_email}`),
      password: (value) => (value.length >= 6 ? null : `${t.invalid_password}`),
      confirmPassword: (value, values) =>
        value === values.password ? null : `${t.do_not_match_password}`,
      accepted_terms: (v) => (v ? null : t.must_accept_terms),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setSuccess("");
    setError("");
    setLoading(true);

    try {
      await postRegister({
        username: values.name,
        email: values.email,
        password: values.password,
        accepted_terms: values.accepted_terms,
      });
      setSuccess(t.success);
      form.reset();
      setTimeout(() => {
        router.push('/');
      }, 1000);
    } catch {
      setError(t.error);
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
        {t.register}
      </Title>

      <p className="text-center text-gray-600 text-sm py-2">
        {t.register_text}
      </p>

      <Paper withBorder shadow="md" p={30} m={10} radius="sm" className="dark:bg-gray-800">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label={t.name}
            placeholder="Your full name"
            required
            {...form.getInputProps("name")}
            classNames={{
              input: "dark:bg-gray-800 dark:text-white",
              label: "dark:text-white",
            }}
          />

          <TextInput
            label="Email"
            placeholder="you@example.com"
            required
            mt="sm"
            {...form.getInputProps("email")}
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

          <PasswordInput
            label={t.confirm_password}
            placeholder="********"
            required
            mt="sm"
            {...form.getInputProps("confirmPassword")}
            classNames={{
              input: "dark:bg-gray-800 dark:text-white",
              label: "dark:text-white",
            }}
          />

          <div className="flex items-center flex-wrap gap-2 mt-3 text-sm">
            <Checkbox
              label={t.i_accept_terms}
              {...form.getInputProps("accepted_terms", { type: "checkbox" })}
            />
            <Link
              href="/user-agreement"
              className="text-blue-500 underline hover:text-blue-700"
            >
              {t.user_agreement}
            </Link>
          </div>


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
                  '&:hover': { opacity: 0.85 },
                },
              }}
            >
              {t.register}
            </Button>
          </Group>

          <p className="text-center text-sm mt-4 dark:text-gray-300">
            {t.have_account}{" "}
            <Link
              href="/login"
              className="text-secondary underline hover:text-primary/80"
            >
              {t.login}
            </Link>
          </p>
        </form>
      </Paper>
    </Container>
  );
}
