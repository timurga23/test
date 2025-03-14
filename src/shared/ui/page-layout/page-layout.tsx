import { Container, Title } from '@mantine/core';

interface PageLayoutProps {
  title?: string;
  children: React.ReactNode;
}

export const PageLayout = ({ title, children }: PageLayoutProps) => {
  return (
    <Container size="xl" pl={0} pr={0} ml={20} mr={0} w="100%">
      {title && (
        <Title order={2} mb="lg">
          {title}
        </Title>
      )}
      {children}
    </Container>
  );
};
