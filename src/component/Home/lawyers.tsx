'use client';
import 'keen-slider/keen-slider.min.css';
import { useLang } from '@/hooks/useLang';
import { LawyersSlider } from '../Sliders/lawyers';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getLawyers } from '@/api/get';
import ErrorMessage from '../Error/Error';
import { Center } from '@mantine/core';

export const Lawyers = () => {
  const { t, ready } = useLang();
  const [lawyers, setLawyers] = useState<LawyersItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchLawyers = async () => {
      setLoading(true);
      try {
        const res = await getLawyers();
        setLawyers(Array.isArray(res) ? res : []);
      } catch (err) {
        setError(true);
      } finally {
        setTimeout(() => setLoading(false), 200);
      }
    };

    fetchLawyers();
  }, []);

  if (!ready || loading) {
    return (
      <Center style={{ height: '10vh' }}>
        <div className="loader"></div>
      </Center>
    );
  }

  if (error) return <ErrorMessage message='' />;

  return (
    <div className="w-full py-8 media">
      <h1 className="mb-8 h2">{t.lawyers}</h1>

      {lawyers.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {t.not_found}
        </p>
      ) : (
        <LawyersSlider lawyers={lawyers} />
      )}

      <Link href="/lawyers">
        <div className="w-full flex justify-center">
          <button className="font-medium text-white hover:opacity-90 
                            transition bg-secondary py-1.5 px-12 mt-8 rounded">
            {t.all}
          </button>
        </div>
      </Link>
    </div>
  );
};
