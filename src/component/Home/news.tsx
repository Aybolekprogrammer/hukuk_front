'use client';
import Image from 'next/image';
import { useLang } from '@/hooks/useLang';
import Link from 'next/link';
import SlideInLeft from '../Sliders/slideInLeft';
import { useEffect, useState } from 'react';
import { getNews } from '@/api/get';
import ErrorMessage from '../Error/Error';
import { Center } from '@mantine/core';

export const News = () => {
  const { t, ready, lang } = useLang();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const res = await getNews();
        setNews(Array.isArray(res) ? res : []);        
      } catch (err) {
        setError(true);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 200);
      }
    };

    fetchNews();
  }, []);

  const getLocalizedTitle = (item: NewsItem) =>
    item[`title_${lang}` as keyof NewsItem] || item.title_tm;

  if (error) return <ErrorMessage message='' />;
  if (!ready || loading) {
    return (
      <Center style={{ height: '10vh' }}>
        <div className="loader"></div>
      </Center>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded mt-4 lg:mt-0 h-full">
      <SlideInLeft>
        <h1 className="mb-5 mt-1 h2">{t.news}</h1>
        {news?.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm">{t.not_found}</p>
        ) : (
          news?.slice(0, 6).map((item) => (
            <div
              key={item.id}
              className="lg:flex items-start gap-4 py-4 border-b  
                         last:border-none dark:border-b-gray-600"
            >
              <div className="w-full md:w-32 h-56 md:h-20 shrink-0 
                              relative rounded overflow-hidden">
                <Image
                  src={item.photo1 || '/Images/placeholder.png'}
                  alt="news"
                  fill
                  sizes="(max-width: 768px) 100vw, 192px"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="flex-1">
                <p className="text-xs text-primary my-2 dark:text-gray-400 xl:mt-0">
                  {new Date(item.created_at).toLocaleDateString()}
                </p>
                <Link href={`/news/${item.id}`}>
                  <h2 className="line-clamp-2 dark:text-gray-200 text-sm hover:text-primary">
                    {getLocalizedTitle(item)}
                  </h2>
                </Link>
              </div>
            </div>
          ))
        )}
      </SlideInLeft>
    </div>
  );
};
