import { getNews } from '@/api/get';
import NewsClient from './component/newsClient';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const news = await getNews();
    return {
      title: 'Täzelikler | TurkmenHukuk',
      description: news?.[0]?.text_tm?.slice(0, 150) || '',
    };
  } catch {
    return {
      title: 'Täzelikler | TurkmenHukuk',
      description: 'Maglumat tapylmady!',
    };
  }
}

export default async function NewsPage() {
    return <NewsClient />;
}