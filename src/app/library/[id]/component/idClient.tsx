'use client';
import { useLang } from '@/hooks/useLang';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { selectLang } from '../../../../store/selectors/lang';
import { startLoading, stopLoading } from '@/store/reducers/loadingSlice';
import Image from 'next/image';
import { FaEye, FaBookOpen, FaDownload } from 'react-icons/fa';
import { useEffect } from 'react';
import SlideInLeft from '@/component/Sliders/slideInLeft';
import SlideInRight from '@/component/Sliders/slideInRight';

export default function IdClient(
    { library }: { library: LibraryItem }
) {
    const { lang, t, ready } = useLang();
    const currentLang = useAppSelector(selectLang);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(startLoading());
        const timer = setTimeout(() => dispatch(stopLoading()), 300);
        return () => clearTimeout(timer);
    }, [dispatch]);

    if (!ready) return null;

    const getLangField = (field: 'title' | 'file' | 'about') => {
        const key = `${field}_${currentLang}` as keyof LibraryItem;
        return library[key] as string;
    };

    const getCategory = () =>
        library.category[`name_${lang}` as
        keyof typeof library.category] ||
        library.category.name_tm;

    return (
        <div className="pages flex flex-col lg:flex-row gap-8 mt-6 mb-12">

            {/* LEFT: Image */}
            <div className="lg:w-1/3 w-full">
                <SlideInLeft>
                    <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden">
                        <Image
                            src={library.photo}
                            alt='undefined'
                            fill
                            className="object-contain object-top"
                            sizes="(min-width: 768px) 128px, 100vw"
                        />
                    </div>
                </SlideInLeft>
            </div>

            <div className='lg:w-2/3 w-full font-sans'>
                <SlideInRight>
                    <div>
                        <h1 className="text-4xl font-bold text-primary dark:text-white">
                            {getLangField('title')}
                        </h1>

                        <div className="flex items-center gap-2 pt-4">
                            <span className='text-gray-700 dark:text-gray-200'>
                                {t.categories}:
                            </span>
                            <span className='font-medium'>
                                {getCategory()}
                            </span>
                        </div>

                        <div className="flex gap-4 py-2">
                            <span className='text-gray-700 dark:text-gray-200'>
                                {t.author}:
                            </span>
                            <span className='font-medium'>
                                {library.author.name}
                            </span>
                        </div>

                        <div className="flex gap-4 py">
                            <span className='text-gray-700 dark:text-gray-200'>
                                {t.short_def}:
                            </span>
                            <span>
                                {getLangField('about')}
                            </span>
                        </div>


                        <div className='flex gap-8 mt-8 items-center'>
                            <div className="flex items-center gap-1 py-2 text-gray-400">
                                <FaEye />
                                {library.views}
                            </div>
                            <a
                                href={getLangField('file')}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center bg-green-600 text-white
                                           gap-1 transition py-1.5 px-2 rounded   hover:opacity-80"
                            >
                                <FaDownload />
                                {t.download}
                            </a>
                        </div>
                    </div>
                </SlideInRight>
            </div>
        </div>
    );
}
