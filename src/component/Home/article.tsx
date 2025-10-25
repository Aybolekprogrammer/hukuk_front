'use client';
import { useLang } from '../../hooks/useLang';
import year from '../../../public/Images/year.svg';
import Image from 'next/image';
import SlideInLeft from '../Sliders/slideInLeft';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getArticle } from '@/api/get';
import { Center } from '@mantine/core';
import ErrorMessage from '../Error/Error';

export const Article = () => {
  const { t, lang, ready } = useLang();
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const res = await getArticle();
        setArticles(Array.isArray(res) ? res : []);
      } catch (err) {
        setError(true);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 200);
      }
    };

    fetchArticles();
  }, []);

  const getLocalizedTitle = (article: ArticleItem) =>
    article[`title_${lang}` as keyof ArticleItem] || article.title_tm;

  if (!ready || loading) {
    return (
      <Center style={{ height: '10vh' }}>
        <div className="loader"></div>
      </Center>
    );
  }

  if (error) return <ErrorMessage message='' />;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 h-full rounded">
      <div className="flex justify-center">
        <Image
          src={year}
          alt="Year"
          className="object-contain w-[150px] lg:w-[250px]"
          priority
        />
      </div>

      <SlideInLeft>
        <h1 className="my-4 h2">{t.article}</h1>
        <div>
          {articles?.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-sm">{t.not_found}</p>
          ) : (
            articles?.slice(0, 5).map((article) => (
              <div
                key={article.id}
                className="border-b dark:border-b-gray-600 last:border-b-0 py-2"
              >
                <p className="text-sm text-primary font-semibold dark:text-gray-400">
                  {new Date(article.created_at).toLocaleDateString()}
                </p>
                <Link
                  href={`/article/${article.id}`}
                  className="hover:text-primary dark:hover:text-gray-400"
                >
                  <h2 className="text-sm pt-1 line-clamp-2">
                    {getLocalizedTitle(article)}
                  </h2>
                </Link>
              </div>
            ))
          )}
        </div>
      </SlideInLeft>
    </div>
  );
};
