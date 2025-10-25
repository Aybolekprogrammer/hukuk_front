'use client';
import { useEffect } from 'react';
import { useLang } from '@/hooks/useLang';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { selectLang } from '@/store/selectors/lang';
import { startLoading, stopLoading } from '@/store/reducers/loadingSlice';
import Image from 'next/image';
import { FaCalendarAlt, FaExternalLinkAlt, FaEye } from 'react-icons/fa';
import Link from 'next/link';
import SlideInRight from '@/component/Sliders/slideInRight';
import SlideInLeft from '@/component/Sliders/slideInLeft';

export default function IdClient(
    { announcement, allAnnouncement }:
        {
            announcement: AnnouncementItem;
            allAnnouncement: AnnouncementItem[];
        }
) {
    const { t, ready } = useLang();
    const currentLang = useAppSelector(selectLang);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(startLoading());
        const timer = setTimeout(() =>
            dispatch(stopLoading()), 200);
        return () => clearTimeout(timer);
    }, [dispatch]);

    if (!ready) return null;

    const getLangField = (
        item: AnnouncementItem,
        field: 'title' | 'description'
    ) => {
        const key = `${field}_${currentLang}` as keyof AnnouncementItem;
        return item[key] as string || '';
    };

    return (
        <div className="pages lg:flex justify-between gap-6 mt-4 mb-12">

            <article className="w-full bg-white dark:bg-gray-800 p-4">
                <SlideInLeft>
                    <h1 className="text-2xl font-bold text-primary
                                   dark:text-gray-100  mb-2">
                        {getLangField(announcement, 'title')}
                    </h1>

                    <div className="relative w-full h-[160px] max-h-[400px] 
                                    md:h-[400px] md:max-h-[800px] 
                                    mx-auto overflow-hidden rounded mb-2">
                        <Image
                            src={announcement?.image}
                            alt={getLangField(announcement, 'title')}
                            fill
                            className="object-contain object-left"
                            sizes="(max-width: 768px) 100vw, 768px"
                            priority
                        />
                    </div>

                    <div className="flex items-center flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300 mb-4">
                        <span className="flex items-center gap-2">
                            <FaCalendarAlt />
                            {new Date(announcement.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-2">
                            <FaEye />
                            {announcement.views}
                        </span>
                    </div>

                    <p className="text-gray-700 dark:text-gray-200 
                                  leading-relaxed text-justify">
                        {getLangField(announcement, 'description')}
                    </p>

                    {announcement.source && (
                        <a
                            href={announcement.source}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center gap-1
                                     text-blue-800 hover:underline text-sm 
                                       font-semibold dark:text-blue-400 "
                        >
                            <FaExternalLinkAlt />
                            <span>{t.source}:</span>
                            {announcement.source}
                        </a>
                    )}
                </SlideInLeft>
            </article>

            <aside className="lg:w-[35%] space-y-4 bg-white custom-scroll
                              max-h-[640px] overflow-y-auto
                            dark:bg-gray-800 p-4 mt-4 lg:mt-0">
                <SlideInRight>
                    <h2 className="h2 mb-3">{t.announcement}</h2>

                    <div className="pr-2">
                        {allAnnouncement.slice(0, 12).map((item) => (
                            <Link
                                key={item.id}
                                href={`/announcement/${item.id}`}
                                className="flex items-center transition border-b 
                                           last:border-b-0 dark:border-b-gray-600 
                                           dark:hover:bg-gray-600 gap-3 py-2"
                            >
                                <div className="relative w-16 h-14 rounded overflow-hidden shrink-0">
                                    <Image
                                        src={item?.image}
                                        alt={getLangField(item, 'title')}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 192px"
                                        priority
                                    />
                                </div>
                                <span className="text-sm font-medium text-gray-700 
                                                 dark:text-gray-200 line-clamp-2">
                                    {getLangField(item, 'title')}
                                </span>
                            </Link>
                        ))}
                    </div>
                </SlideInRight>
            </aside>
        </div>
    );
}
