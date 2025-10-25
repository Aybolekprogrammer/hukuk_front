import type { TranslationKey } from '../../translations/index';

export const categories: {
  id: string;
  label: TranslationKey;
  href: string;
}[] = [
    { id: '1', label: 'library', href: '/library' },
    { id: '2', label: 'scientific_work', href: '/scientific-work' },
    { id: '3', label: 'lawyers', href: '/lawyers' },
    { id: '4', label: 'law_science', href: '/law-science' },
  ];
