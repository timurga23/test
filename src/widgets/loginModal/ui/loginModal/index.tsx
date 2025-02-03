import { useAuth } from '@/shared/auth/AuthContext';
import { Button, PasswordInput, Stack, TextInput, Title } from '@mantine/core';
import { useState } from 'react';

export function LoginModal() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login();
  };

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

        <Button type="submit" fullWidth>
          Войти
        </Button>
      </Stack>
    </form>
  );
}
