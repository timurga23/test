import { Button, PasswordInput, Stack, TextInput, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useLoginMutation } from '@/enteties/user/api/queries';
import { toast } from 'react-toastify';
import { useAuth } from '@/shared/lib/context/auth';
import { userStore } from '@/enteties/user';

export function LoginModal() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutateAsync: loginMutation, error } = useLoginMutation();
  const { login } = useAuth();
  const setUser = userStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await loginMutation({
      login: email,
      password,
      projectId: import.meta.env.VITE_PROJECT_ID,
    });

    if (res.accessToken) {
      login(res.accessToken);
      setUser(res);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return (
    <form onSubmit={handleSubmit}>
      <Stack mx="auto" p="xl" maw={600} h="100vh" justify="center">
        <Title order={2}>Вход в систему</Title>

        <TextInput
          required
          label="Email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />

        <PasswordInput
          required
          label="Пароль"
          placeholder="Введите пароль"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />

        <Button type="submit" disabled={!email?.length || !password?.length} fullWidth>
          Войти
        </Button>
      </Stack>
    </form>
  );
}
