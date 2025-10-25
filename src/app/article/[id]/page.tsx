import { Metadata } from 'next';
import IdClient from './component/idClient';
import { getArticle, getArticleById } from '@/api/get';
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
    const article = await getArticleById(awaitedParams.id);
    return {
      title: article?.title_tm || 'Täzelikler',
      description: article?.text_tm || '',
    };
  } catch {
    return {
      title: 'Makalalar | TurkmenHukuk',
      description: 'Maglumat tapylmady!',
    };
  }
}

export default async function Page(
  { params }: { params: Promise<Params> }
) {
  const awaitedParams = await params;
  try {
    const [article, lastArticles] = await Promise.all([
      getArticleById(awaitedParams.id),
      getArticle(),
    ]);

    if (!article) {
      notFound();
    }

    return <IdClient
      article={article}
      lastArticles={lastArticles}
    />;
  } catch {
    return <ErrorMessage message="" />;
  }
}
