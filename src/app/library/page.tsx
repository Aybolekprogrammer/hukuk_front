import { getLibrary } from '@/api/get';
import LibraryClient from './component/libraryClient';
import { Metadata } from 'next';
import ErrorMessage from '@/component/Error/Error';
import { notFound } from 'next/navigation';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const library = await getLibrary();    

    return {
      title: 'Kitaphana | TurkmenHukuk',
      description: library?.[0]?.title_tm || '',
    };
  } catch {
    return {
      title: 'Kitaphana | TurkmenHukuk',
      description: 'Maglumat tapylmady!',
    };
  }
}

export default async function Library() {
  try {
    const library = await getLibrary();
    if (!library) {
       notFound();
    }
    return <LibraryClient books={library} />;
  } catch {
    return <ErrorMessage message="" />;
  }
}