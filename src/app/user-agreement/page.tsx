import { Metadata } from 'next';
import { getUserAgreement } from '@/api/get';
import ErrorMessage from '@/component/Error/Error';
import { notFound } from 'next/navigation';
import UserAgreementClient from './component/user-agreement-client';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const userData = await getUserAgreement();

    return {
      title: 'Ulanyjy düzgünnamasy | TurkmenHukuk',
      description: userData?.content_tm || '',
    };
  } catch {
    return {
      title: 'Ulanyjy düzgünnamasy | TurkmenHukuk',
      description: 'Maglumat tapylmady',
    };
  }
}

export default async function UsersAgreementPage() {
  try {
    const userData = await getUserAgreement();

    if (!userData) {
      notFound();
    }

    return <UserAgreementClient content={userData} />;
  } catch {
    return <ErrorMessage message="" />;
  }
}
