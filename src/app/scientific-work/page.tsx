import { getScientificWorks } from '@/api/get';
import { Metadata } from 'next';
import ScientificWorkClient from './component/ScientificWorkClient';
import ErrorMessage from '@/component/Error/Error';
import { notFound } from 'next/navigation';

export async function generateMetadata(): Promise<Metadata> {
    try {
        const works = await getScientificWorks();
        return {
            title: 'Ylmy işler | TurkmenHukuk',
            description: works?.[0]?.title_tm || '',
        };
    } catch {
        return {
            title: 'Ylmy işler  | TurkmenHukuk',
            description: 'Maglumat tapylmady!',
        };
    }
}
export default async function ScientificWorkPage() {
    try {
        const works = await getScientificWorks();

        if (!works) {
            notFound();
        }

        return <ScientificWorkClient books={works} />;
    } catch {
        return <ErrorMessage message="" />;
    }
}
