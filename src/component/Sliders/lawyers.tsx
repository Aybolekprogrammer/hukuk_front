'use client';
import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';
import { useLang } from '@/hooks/useLang';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

export const LawyersSlider = (
    { lawyers }: { lawyers: LawyersItem[] }
) => {
    const { lang } = useLang();
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const [sliderInstanceRef, sliderInstance] = useKeenSlider<HTMLDivElement>({
        loop: true,
        mode: 'snap',
        slides: {
            perView: 1.2,
            spacing: 15,
        },
        breakpoints: {
            '(min-width: 340px)': {
                slides: { perView: 2, spacing: 8 },
            },
            '(min-width: 640px)': {
                slides: { perView: 3.2, spacing: 12 },
            },
            '(min-width: 1024px)': {
                slides: { perView: 4.2, spacing: 12 },
            },
            '(min-width: 1440px)': {
                slides: { perView: 5.2, spacing: 12 },
            },
        },
    });

    useEffect(() => {
        const interval = setInterval(() => {
            sliderInstance.current?.next();
        }, 3500);
        return () => clearInterval(interval);
    }, [sliderInstance]);

    const getLocalizedAbout = (item: LawyersItem): string => {
        const key = `about_${lang}` as keyof LawyersItem;
        return (item[key] as string) || item.about_tm || '';
    };

    return (
        <section className="relative">
            <button
                onClick={() => sliderInstance.current?.prev()}
                className="absolute top-1/2 -left-2 z-10 transform -translate-y-1/2 
                           p-2 bg-white dark:bg-gray-800 shadow rounded-full"
            >
                <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            </button>

            <button
                onClick={() => sliderInstance.current?.next()}
                className="absolute top-1/2 -right-2 z-10 transform -translate-y-1/2 
                           p-2 bg-white dark:bg-gray-800 shadow rounded-full"
            >
                <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            </button>

            {/* Slider container */}
            <div ref={(node) => {
                sliderRef.current = node;
                sliderInstanceRef(node);
            }} className="keen-slider">
                {lawyers?.slice(0, 10).map((lawyer) => (
                    <div
                        key={lawyer.id}
                        className="keen-slider__slide bg-white dark:bg-gray-800 rounded
                                   shadow-md hover:shadow-2xl transition-shadow duration-300
                                   cursor-pointer"
                    >
                        <Link href={`/lawyers/${lawyer.id}`} key={lawyer.id}>
                            <div className="relative w-full h-40 md:h-64 rounded overflow-hidden">
                                <Image
                                    src={lawyer.photo || '/Images/placeholder.png'}
                                    alt={lawyer.name}
                                    fill
                                    sizes="(min-width: 768px) 128px, 100vw"
                                    className="object-cover"
                                />
                            </div>
                        </Link>
                        <h3 className="font-semibold text-primary dark:text-white p-2 md:p-3">
                            {lawyer.name}
                        </h3>

                        <p className="text-gray-600 dark:text-gray-300 text-sm
                                       line-clamp-2 px-2 md:px-3 mb-4 lg:mb-6 ">
                            {getLocalizedAbout(lawyer)}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};
