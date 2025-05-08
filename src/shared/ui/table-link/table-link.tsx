import { isLink } from '@/shared/lib/helpers/isLink';
import { Button } from '@mantine/core';

interface TableLinkProps {
  link: string | null;
  text?: string;
}

export const TableLink = ({ link, text }: TableLinkProps) => {
  const isValidLink = link && isLink(link);

  const linkText = text || link || 'Нет ссылки';

  return (
    <Button
      component="a"
      href={isValidLink ? link : '#'}
      target="_blank"
      rel="noopener noreferrer"
      disabled={!isValidLink}
    >
      {linkText}
    </Button>
  );
};
