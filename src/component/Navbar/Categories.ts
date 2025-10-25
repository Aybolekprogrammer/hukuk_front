import type { TranslationKey } from '../../translations/index';

export const categories: {
  id: string;
  label: TranslationKey;
  href: string;
}[] = [
    { id: '1', label: 'home', href: '/' },
    { id: '2', label: 'about', href: '/about' },
    { id: '3', label: 'news', href: '/news' },
    { id: '4', label: 'library', href: '/library' },
    { id: '5', label: 'article', href: '/article' },
    { id: '6', label: 'scientific_work', href: '/scientific-work' },
    { id: '7', label: 'lawyers', href: '/lawyers' },
    { id: '8', label: 'announcement', href: '/announcement' },
    { id: '9', label: 'test', href: '/test' },
    { id: '10', label: 'law_science', href: '/law-science' },
    { id: '11', label: 'faq', href: '/faq' },
  ];
