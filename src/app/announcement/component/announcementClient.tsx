'use client';
import { useEffect, useState } from 'react';
import { useLang } from '../../../hooks/useLang';
import { useAppSelector } from '@/store/hook';
import { selectLang } from '../../../store/selectors/lang';
import SlideInLeft from '@/component/Sliders/slideInLeft';
import Image from 'next/image';
import Link from 'next/link';
import { Eye } from 'lucide-react';
import { getAnnouncement } from '@/api/get';
import ErrorMessage from '@/component/Error/Error';
import { Center } from '@mantine/core';

export default function AnnouncementClient() {
    const { t, ready } = useLang();
    const currentLang = useAppSelector(selectLang);
    const [announcement, setAnnouncement] = useState<AnnouncementItem[]>([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await getAnnouncement();
                setAnnouncement(Array.isArray(res) ? res : []);
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

    if (!ready || loading) {
        return (
            <Center style={{ height: '50vh' }}>
                <div className="loader"></div>
            </Center>
        );
    }
    if (error) return <ErrorMessage message='' />;

    const getLangField = (
        item: AnnouncementItem,
        field: 'title' | 'description'
    ) => {
        const key = `${field}_${currentLang}` as keyof AnnouncementItem;
        return (item[key] as string) || '';
    };

    return (
        <div className="mt-6 mb-12 pages">
            <SlideInLeft>
                <h1 className="h1 mb-6">
                    {t.announcement}
                </h1>
            </SlideInLeft>
            {announcement.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400  text-sm">
                    {t.not_found}
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  
                               xl:grid-cols-4   gap-4">
                    {announcement?.map((item) => (
                        <div
                            key={item.id}
                            className="rounded overflow-hidden shadow-sm bg-gray-50
                                    dark:bg-gray-900 border dark:border-gray-700"
                        >
                            <Link
                                href={`/announcement/${item.id}`}>
                                <div className="relative h-[200px] w-full">
                                    <Image
                                        src={item.image || '/Images/placeholder.png'}
                                        alt={getLangField(item, 'title') || ''}
                                        sizes="(max-width: 768px) 100vw, 192px"
                                        fill
                                        className="object-cover object-top  "
                                        priority
                                    />
                                </div>
                            </Link>

                            <div className="p-4 space-y-2">
                                <div className="text-sm text-gray-500 dark:text-gray-400 
                                                flex items-center justify-between">
                                    <span>{item.date}</span>
                                    <span className="flex items-center gap-1">
                                        <Eye className="w-4 h-4" />
                                        {item.views}
                                    </span>
                                </div>

                                <h2 className="text-lg font-semibold line-clamp-2">
                                    {getLangField(item, 'title')}
                                </h2>

                                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                                    {getLangField(item, 'description')}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )
            }
        </div >
    );
}
