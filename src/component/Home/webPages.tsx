'use client';
import { useLang } from '@/hooks/useLang';
import Image from 'next/image';
import Link from 'next/link';
import SlideInRight from '../Sliders/slideInRight';
import { webPages } from '@/data/webPages';

export const WebPages = () => {
  const { t, ready } = useLang();
  if (!ready) return null;

  return (
    <section className="bg-white dark:bg-gray-800 p-4 
                          h-full rounded lg:mt-0">
      <SlideInRight>
        <h1 className='mb-5 mt-1 h2'>
          {t.useful_sites}
        </h1>
        <div className="max-h-[640px] overflow-y-auto space-y-2 pr-2 
                      scroll-smooth custom-scroll w-full">
          {webPages.map((page) => (
            <Link
              key={page.id}
              href={page.href}
              className="flex items-center gap-4 p-1 border border-gray-200 
                       dark:border-gray-600 rounded-lg shadow-sm transition bg-white
                       dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"                       
            >
              <div className="relative w-14 h-14 rounded overflow-hidden shrink-0">
                <Image
                  src={page.img}
                  alt={page.name}
                  fill
                  className="object-contain"
                  sizes="(min-width: 768px) 128px, 100vw"
                />
              </div>
              <span className="dark:text-white text-primary text-sm">
                {page.name}
              </span>
            </Link>
          ))}
        </div>
      </SlideInRight>
    </section>
  );
};
