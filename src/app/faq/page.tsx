import { Metadata } from 'next';
import { getFaq } from '@/api/get';
import ErrorMessage from '@/component/Error/Error';
import { notFound } from 'next/navigation';
import FaqClient from './component/faq-client';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const faq = await getFaq();
    return {
      title: 'Köp soralýan soraglar | TurkmenHukuk',
      description: faq?.title_tm || '',
    };
  } catch {
    return {
      title: 'Köp soralýan soraglar | TurkmenHukuk',
      description: 'Maglumat tapylmady',
    };
  }
}

export default async function Faq() {
  try {
    const faq = await getFaq();

    if (!faq) {
      notFound();
    }

    return <FaqClient faq={faq} />;
  } catch {
    return <ErrorMessage message="" />;
  }
}