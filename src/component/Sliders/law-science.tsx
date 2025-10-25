'use client';

import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useLang } from '@/hooks/useLang';

const pictures = [
    {
        img: '/Images/pictures/1.png',
    },
    {
        img: '/Images/pictures/3.jpg',
    },
    {
        img: '/Images/pictures/2.jpg',
    },
    {
        img: '/Images/pictures/4.webp',
    },
    {
        img: '/Images/pictures/5.png',
    },
    {
        img: '/Images/pictures/6.jpeg',
    },
];

export const LawScienceSlider = (
    { lawScience }: { lawScience: any[] }
) => {
    const { lang } = useLang();
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const [sliderInstanceRef, sliderInstance] = useKeenSlider<HTMLDivElement>({
        loop: true,
        mode: 'snap',
        renderMode: 'precision',
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
        rubberband: false,
        drag: true,
        created(s) {
            // disables autoplay
        },
    });

    const getLangField = (item: any, field: 'title' | 'about') => {
        const key = `${field}_${lang}`;
        return item?.[key] || item?.[`${field}_tm`] || '';
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

            <div
                ref={(node) => {
                    sliderRef.current = node;
                    sliderInstanceRef(node);
                }}
                className="keen-slider"
            >
                {pictures.map((pic, index) => {
                    const item = lawScience[index];
                    if (!item) return null;

                    return (
                        <Link
                            key={item.id}
                            href={`/law-science/${item.id}`}
                            className="keen-slider__slide bg-white dark:bg-gray-800 rounded
                                       shadow-md hover:shadow-xl transition overflow-hidden"
                        >
                            <div className="relative w-full h-24 md:h-40">
                                <Image
                                    src={pic.img}
                                    alt='img'
                                    fill
                                    className="object-cover"
                                    sizes="(min-width: 768px) 128px, 100vw"
                                />
                            </div>
                            <div className="p-2.5">
                                <h3 className="text-primary dark:text-white 
                                              font-semibold text-md line-clamp-2">
                                    {getLangField(item, 'title')}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1 
                                           dark:text-gray-300 line-clamp-2 ">
                                    {getLangField(item, 'about')}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};