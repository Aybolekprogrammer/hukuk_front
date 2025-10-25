import { Metadata } from 'next';
import IdClient from './component/idClient';
import { getNews, getNewsById } from '@/api/get';
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
    const news = await getNewsById(awaitedParams.id);
    return {
      title: news?.title_tm || 'Täzelikler',
      description: news?.text_tm || '',
    };
  } catch {
    return {
      title: 'Täzelikler | TurkmenHukuk',
      description: 'Maglumat tapylmady!',
    };
  }
}

export default async function Page(
  { params }: { params: Promise<Params> }
) {
  const awaitedParams = await params;
  try {
    const [news, lastNews] = await Promise.all([
      getNewsById(awaitedParams.id),
      getNews(),
    ]);

    if (!news) {
      notFound();
    }

    return <IdClient
      news={news}
      lastNews={lastNews}
    />;
  } catch {
    return <ErrorMessage message="" />;
  }
}
