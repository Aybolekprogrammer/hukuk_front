'use client';
import { useEffect, useState } from 'react';
import { getNews } from '@/api/get';
import { useLang } from '@/hooks/useLang';
import { useAppSelector } from '@/store/hook';
import { selectLang } from '@/store/selectors/lang';
import { FaEye, FaCalendarAlt } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import SlideInLeft from '@/component/Sliders/slideInLeft';
import { Center } from '@mantine/core';
import ErrorMessage from '@/component/Error/Error';

export default function NewsClient() {
  const { t, ready } = useLang();
  const lang = useAppSelector(selectLang);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
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

    fetchData();
  }, []);

  const getLangField = (item: NewsItem, field: 'title' | 'text') => {
    const key = `${field}_${lang}` as keyof NewsItem;
    return item[key] as string || '';
  };

  if (!ready || loading) {
    return (
      <Center style={{ height: '50vh' }}>
        <div className="loader"></div>
      </Center>
    );
  }
  if (error) return <ErrorMessage message='' />;

  return (
    <div className="mt-4 mb-12 bg-white dark:bg-gray-800
                    text-gray-800 dark:text-gray-100 p-4 pages">
      <SlideInLeft>
        <h1 className="h1 mb-4">{t.news}</h1>

        {news?.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row gap-4 border-b  
                       py-4 last:border-b-0 dark:border-b-gray-600">
            <div className="relative w-full md:w-48 h-56 md:h-36 
                            shrink-0 rounded overflow-hidden">
              <Image
                src={item?.photo1}
                alt='news'
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 192px"
                priority
              />
            </div>

            <div className="flex-1 space-y-2">
              <h2 className="text-lg font-bold text-primary dark:text-white">
                {getLangField(item, 'title')}
              </h2>

              <div className="flex items-center gap-4 text-sm 
                              text-gray-600 dark:text-gray-300">
                <span className="flex items-center gap-1">
                  <FaCalendarAlt />
                  {new Date(item.created_at).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <FaEye />
                  {item.views}
                </span>
              </div>

              <p className="line-clamp-3 text-gray-600 
                            dark:text-gray-300 text-sm ">
                {getLangField(item, 'text')}
              </p>

              <Link
                href={`/news/${item.id}`}
                className="inline-block text-primary text-hover mt-1
                           dark:text-gray-400 text-sm font-medium"
              >
                {t.more}
              </Link>
            </div>
          </div>
        ))}
      </SlideInLeft>
    </div>
  );
}