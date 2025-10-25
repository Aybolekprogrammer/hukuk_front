import { getAnnouncement } from '@/api/get';
import { Metadata } from 'next';
import AnnouncementClient from './component/announcementClient';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const announcement = await getAnnouncement();

    return {
      title: 'Bildirişler | TurkmenHukuk',
      description: announcement?.[0]?.description_tm?.slice(0, 150) || '',
    };
  } catch {
    return {
      title: 'Bildirişler | TurkmenHukuk',
      description: 'Maglumat tapylmady!',
    };
  }
}

export default function NewsPage() {
    return <AnnouncementClient/>;
}