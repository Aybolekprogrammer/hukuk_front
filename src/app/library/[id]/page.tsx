import { Metadata } from 'next';
import IdClient from './component/idClient';
import { getLibraryById } from '@/api/get';
import ErrorMessage from '@/component/Error/Error';
import { notFound } from 'next/navigation';

type Params = {
  id: string;
};

export async function generateMetadata(
  { params }: { params: Promise<Params> }
  ): Promise<Metadata> {
  const awaitedParams = await params;
  try {
    const news = await getLibraryById(awaitedParams.id);
    return {
      title: news?.title_tm || 'Kitaphana',
      description: news?.file_tm?.slice(0, 150) || '',
    };
  } catch {
    return {
      title: 'Kitaphana | TurkmenHukuk',
      description: 'Maglumat tapylmady!',
    };
  }
}

export default async function Page(
  { params }: { params: Promise<Params> }
) {
  const awaitedParams = await params;
  try {
    const libraryById = await getLibraryById(awaitedParams.id)

    if (!libraryById) {
       notFound();
    }

    return <IdClient library={libraryById}/>;
  } catch {
    return <ErrorMessage message="" />;
  }
}
