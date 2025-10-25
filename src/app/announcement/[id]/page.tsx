import { Metadata } from 'next';
import IdClient from './component/idClient';
import { getAnnouncement, getAnnouncementById } from '@/api/get';
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
    const announcement = await getAnnouncementById(awaitedParams.id);
    return {
      title: announcement?.title_tm || 'Bildirişler',
      description: announcement?.description_tm || '',
    };
  } catch {
    return {
      title: 'Bildirişler | TurkmenHukuk',
      description: 'Maglumat tapylmady!',
    };
  }
}

export default async function Page(
  { params }: { params: Promise<Params> }
) {
  const awaitedParams = await params;
  try {
    const [announcement, allAnnouncement] = await Promise.all([
      getAnnouncementById(awaitedParams.id),
      getAnnouncement(),
    ]);

    if (!announcement) {
      notFound();
    }

    return <IdClient
      announcement={announcement}
      allAnnouncement={allAnnouncement}
    />;
  } catch {
    return <ErrorMessage message="" />;
  }
}
