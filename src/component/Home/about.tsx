'use client';
import { useEffect, useState } from 'react';
import { useLang } from '@/hooks/useLang';
import Link from 'next/link';
import SlideInRight from '../Sliders/slideInRight';
import { getAbout } from '@/api/get';
import { Center } from '@mantine/core';
import ErrorMessage from '../Error/Error';

export default function About() {
  const { t, lang, ready } = useLang();
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAbout = async () => {
      setLoading(true);
      try {
        const res = await getAbout();
        setAboutData(Array.isArray(res) && res.length > 0 ? res[0] : null);
      } catch (err) {
        setError(true);
      } finally {
        setTimeout(() => setLoading(false), 200);
      }
    };

    fetchAbout();
  }, []);

  const getLocalizedHomeAbout = () => {
    const key = `home_about_${lang}` as keyof AboutData;
    return aboutData?.[key] || '';
  };

  if (!ready || loading) {
    return (
      <Center style={{ height: '20vh' }}>
        <div className="loader"></div>
      </Center>
    );
  }

  if (error) return <ErrorMessage message="" />;

  if (!aboutData) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400">
        {t.not_found}
      </p>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 py-12 media">
      <div className="relative max-w-4xl mx-auto border border-[#c9b77b] 
                      dark:border-secondary bg-white dark:bg-gray-800 md:p-10">
        <div className="-top-4 left-1/2 transform -translate-x-1/2 
                        bg-white dark:bg-gray-800 px-4 absolute">
          <span className="text-xl font-bold text-primary dark:text-white">
            {t.about}
          </span>
        </div>

        <SlideInRight>
          <p className="text-gray-700 dark:text-gray-300 
                         text-justify md:p-0 p-4 
                        whitespace-pre-line">
            {getLocalizedHomeAbout()}
          </p>
        </SlideInRight>

        <div className="bg-white dark:bg-gray-800 absolute -bottom-5 
                        left-1/2 transform -translate-x-1/2 b px-4">
          <Link
            href="/about"
            className="px-8 py-2 text-sm font-semibold text-white 
                       bg-secondary hover:opacity-90 transition rounded"
          >
            {t.more}
          </Link>
        </div>
      </div>
    </div>
  );
}
