import { Metadata } from 'next';
import { getLawScienceById, getLawScienceWithParams } from '@/api/get';
import IdClient from './component/idClient';
import ErrorMessage from '@/component/Error/Error';
import { notFound } from 'next/navigation';

type Params = { id: string };

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const awaitedParams = await params;
  try {
    const data = await getLawScienceById(awaitedParams.id);
    return {
      title: data?.title_tm || 'TurkmenHukuk',
      description: data?.about_tm || '',
    };
  } catch {
    return {
      title: 'Ýlmy işler | TurkmenHukuk',
      description: 'Maglumat tapylmady!',
    };
  }
}

export default async function Page(
  { params }: { params: Promise<Params> }
) {
  const awaitedParams = await params;
  try {
    const [item, list] = await Promise.all([
      getLawScienceById(awaitedParams.id),
      getLawScienceWithParams({}),
    ]);

    if (!item) return notFound();

    return <IdClient item={item} list={list} />;
  } catch {
    return <ErrorMessage message="" />;
  }
}
