import { getLawyers } from '@/api/get';
import LawyersClient from './component/lawyersClient';
import { Metadata } from 'next';
import ErrorMessage from '@/component/Error/Error';
import { notFound } from 'next/navigation';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const lawyers = await getLawyers();

    return {
      title: 'Hukukçylar | TurkmenHukuk',
      description: lawyers?.[0]?.name || '',
    };
  } catch {
    return {
      title: 'Hukukçylar | TurkmenHukuk',
      description: 'Maglumat tapylmady!',
    };
  }
}

export default async function LawyersPage() {
  try {
    const lawyers = await getLawyers();

    if (!lawyers) {
       notFound();
    }

    return <LawyersClient lawyers={lawyers} />;
  } catch {
    return <ErrorMessage message="" />;
  }
}