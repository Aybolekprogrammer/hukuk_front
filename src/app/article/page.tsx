import { getArticle } from '@/api/get';
import ArticleClient from './component/articleClient';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const article = await getArticle();

    return {
      title: 'Täzelikler | TurkmenHukuk',
      description: article?.[0]?.text_tm?.slice(0, 170) || '',
    };
  } catch {
    return {
      title: 'Makalalar | TurkmenHukuk',
      description: 'Maglumat tapylmady!',
    };
  }
}

export default async function NewsPage() {
    return <ArticleClient/>;
}