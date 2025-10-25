'use client';
import Link from 'next/link';
import { useLang } from '@/hooks/useLang';

export default function NotFound() {
    const { t } = useLang();

    return (
        <div className="min-h-[70vh] flex items-center justify-center 
                        px-4 bg-gray-100 dark:bg-gray-900">
            <div className="max-w-md w-full text-center space-y-6">
                <h1 className="text-4xl font-extrabold text-[#c9b77b] dark:text-gray-100">
                    404
                </h1>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                    {t.notFoundTitle}
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                    {t.notFoundDesc}
                </p>

                <Link
                    href="/"
                    className="inline-block mt-4 px-6 py-2 rounded text-white 
                                bg-secondary hover:bg-primary/90 transition">
                    {t.backHome}
                </Link>
            </div>
        </div>
    );
}
