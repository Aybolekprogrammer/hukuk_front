'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FaEye, FaCalendarAlt, FaExternalLinkAlt } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { selectLang } from '@/store/selectors/lang';
import { useLang } from '@/hooks/useLang';
import SlideInLeft from '@/component/Sliders/slideInLeft';
import SlideInRight from '@/component/Sliders/slideInRight';
import { useEffect } from 'react';
import { startLoading, stopLoading } from '@/store/reducers/loadingSlice';


export default function IdClient(
    { news, lastNews }:
        { news: NewsItem; lastNews: NewsItem[] }
) {
    const { ready, t } = useLang();
    const currentLang = useAppSelector(selectLang);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(startLoading());
        const timer = setTimeout(() => dispatch(stopLoading()), 200);
        return () => clearTimeout(timer);
    }, [dispatch]);

    if (!ready) return null;


    const getLangField = (field: 'title' | 'text') => {
        const key = `${field}_${currentLang}` as keyof NewsItem;
        return news[key] || '';
    };
    const getLangFieldForItem = (item: NewsItem, field: 'title') => {
        const key = `${field}_${currentLang}` as keyof NewsItem;
        return item[key] || '';
    };

    return (
        <div className="pages lg:flex justify-between gap-4 mt-4 mb-12">

            <article className="bg-white dark:bg-gray-800 p-4 w-full">
                <SlideInLeft>
                    <h1 className="text-lg font-bold text-primary 
                                   dark:text-gray-100 mb-2">
                        {getLangField('title')}
                    </h1>
                    <div className="relative w-full h-[160px] max-h-[400px] 
                                    md:h-[400px] md:max-h-[800px] 
                                    mx-auto overflow-hidden rounded mb-2">
                        <Image
                            src={news?.photo1}
                            alt="news"
                            fill
                            className="object-contain object-left"
                            sizes="(max-width: 768px) 100vw, 192px"
                            priority
                        />
                    </div>

                    <div className="flex items-center gap-6 text-sm my-3
                                    text-gray-500 dark:text-gray-300">
                        <span className="flex items-center gap-2">
                            <FaCalendarAlt />
                            {new Date(news.created_at).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-2">
                            <FaEye /> {news.views}
                        </span>
                    </div>

                    <p className="text-gray-700 dark:text-gray-200 
                                  leading-relaxed text-justify">
                        {getLangField('text')}
                    </p>
                    {news?.source &&
                        <a
                            href={news.source}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center gap-1
                                       font-semibold text-blue-800 hover:underline
                                       dark:text-blue-400 text-sm "
                        >
                            <FaExternalLinkAlt />
                            <p>{t.source}:</p>
                            {news.source}
                        </a>
                    }
                </SlideInLeft>
            </article>

            <aside className="lg:w-[35%] space-y-4 max-h-[640px] overflow-y-auto 
                              dark:bg-gray-800 p-4 mt-4 lg:mt-0 custom-scroll bg-white">
                <SlideInRight>
                    <h2 className="h2 mb-2">{t.last_news}</h2>

                    <div className="pr-2">
                        {lastNews?.slice(0, 12).map((item) => (
                            <Link
                                key={item.id}
                                href={`/news/${item.id}`}
                                className="flex items-center transition border-b 
                                           last:border-b-0 dark:border-b-gray-600 
                                           dark:hover:bg-gray-600 gap-3 py-2"
                            >
                                <div className="relative w-16 h-14 rounded overflow-hidden shrink-0">
                                    <Image
                                        src={item?.photo1}
                                        alt="news"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 192px"
                                        priority
                                    />
                                </div>
                                <span className="text-sm font-medium text-gray-700 
                                                 dark:text-gray-200 line-clamp-2">
                                    {getLangFieldForItem(item, 'title')}
                                </span>
                            </Link>
                        ))}
                    </div>
                </SlideInRight>
            </aside>
        </div>
    );
}
