import { Metadata } from 'next';
import AboutClient from './component/about-client';
import { getAbout } from '@/api/get';
import ErrorMessage from '@/component/Error/Error';
import { notFound } from 'next/navigation';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const aboutData = await getAbout();
    const about = aboutData?.[0];

    return {
      title: 'Biz barada | TurkmenHukuk',
      description: about?.about_tm || '',
    };
  } catch {
    return {
      title: 'Biz barada | TurkmenHukuk',
      description: 'Maglumat tapylmady',
    };
  }
}

export default async function AboutPage() {
  try {
    const aboutData = await getAbout();
    const about = aboutData?.[0];

    if (!about) {
      notFound();
    }

    return <AboutClient about={about} />;
  } catch {
    return <ErrorMessage message="" />;
  }
}
