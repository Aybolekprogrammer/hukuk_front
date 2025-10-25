import { getNews } from '@/api/get';
import { Metadata } from 'next';
import LawScienceClient from './component/LawScienceClient';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const lawSience = await getNews();
    return {
      title: 'Hukuk ylymlary | TurkmenHukuk',
      description: lawSience?.[0]?.about_tm?.slice(0, 150) || '',
    };
  } catch {
    return {
      title: 'Täzelikler | TurkmenHukuk',
      description: 'Maglumat tapylmady!',
    };
  }
}

export default async function NewsPage() {
    return <LawScienceClient />;
}