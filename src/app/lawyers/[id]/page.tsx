import { Metadata } from 'next';
import IdClient from './component/idClient';
import { getLawyersById } from '@/api/get';
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
    const lawyers = await getLawyersById(awaitedParams.id);
    return {
      title: lawyers?.name || 'Hukukçylar',
      description: lawyers?.about_tm || '',
    };
  } catch {
    return {
      title: 'Hukukçylar | TurkmenHukuk',
      description: 'Maglumat tapylmady!',
    };
  }
}

export default async function Page(
  { params }: { params: Promise<Params> }
) {
  const awaitedParams = await params;
  try {
    const lawyers = await getLawyersById(awaitedParams.id);

    if (!lawyers) {
       notFound();
    }

    return <IdClient lawyers={lawyers} />;
  } catch {
    return <ErrorMessage message="" />;
  }
}
