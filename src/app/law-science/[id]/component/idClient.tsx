'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLang } from '@/hooks/useLang';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { selectLang } from '@/store/selectors/lang';
import { useEffect } from 'react';
import { FaDownload, FaEye } from 'react-icons/fa';
import { startLoading, stopLoading } from '@/store/reducers/loadingSlice';
import SlideInLeft from '@/component/Sliders/slideInLeft';
import SlideInRight from '@/component/Sliders/slideInRight';

export default function IdClient({
  item,
  list
}: {
  item: any;
  list: any[];
}) {
  const { t, ready } = useLang();
  const lang = useAppSelector(selectLang);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(startLoading());
    const timer = setTimeout(() => dispatch(stopLoading()), 300);
    return () => clearTimeout(timer);
  }, [dispatch]);

  if (!ready) return null;

  const getField = (field: 'title' | 'about' | 'file') => {
    return item?.[`${field}_${lang}`] || item?.[`${field}_tm`] || '';
  };

  const getFieldForList = (it: any, field: 'title') => {
    return it?.[`${field}_${lang}`] || it?.[`${field}_tm`] || '';
  };

  return (
    <div className="pages lg:flex justify-between gap-4 mt-4 mb-12">
      <article className="bg-white dark:bg-gray-800 p-4 w-full">
        <SlideInLeft>
          <h1 className="text-lg font-bold text-primary dark:text-gray-100 mb-2">
            {getField('title')}
          </h1>

          {item?.photo &&
            <div className="relative w-full h-[200px] md:h-[400px] 
                         rounded overflow-hidden mb-2">
              <Image
                src={item?.photo}
                alt={getField('title')}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 192px"
              />
            </div>
          }

          <p className="text-gray-700 dark:text-gray-200  
                         leading-relaxed text-justify
                         whitespace-pre-wrap">
            {getField('about')}
          </p>

          <div className='flex items-center gap-6 mt-4'>
            {getField('file') && (
                <a
                  href={getField('file')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-green-600 text-white 
                           gap-2 py-2 px-4 rounded hover:opacity-90 text-sm"
                >
                  <FaDownload />
                  {t.download}
                </a>
            )}
            <div className="flex items-center gap-4 text-sm my-3
                       text-gray-500 dark:text-gray-300">
              <span className="flex items-center gap-1">
                <FaEye />
                {item.views}
              </span>
            </div>
          </div>

        </SlideInLeft>
      </article>

      <aside className="lg:w-[35%] space-y-4 max-h-[640px] overflow-y-auto
                      dark:bg-gray-800 p-4 mt-4 lg:mt-0 custom-scroll bg-white">
        <SlideInRight>
          <h2 className="h2 mb-2">{t.law_science}</h2>
          <div className="pr-2">
            {list
              ?.filter((it) => it.id !== item.id)
              .slice(0, 12)
              .map((it) => (
                <Link
                  key={it.id}
                  href={`/law-science/${it.id}`}
                  className="flex items-center transition border-b 
                             last:border-b-0 dark:border-b-gray-600 
                             dark:hover:bg-gray-600 gap-3 py-2"
                >
                  <div className="relative w-16 h-14 rounded 
                                  overflow-hidden shrink-0">
                    <Image
                      src={it?.photo}
                      alt={getFieldForList(it, 'title')}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 192px"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700
                                  dark:text-gray-200 line-clamp-2">
                    {getFieldForList(it, 'title')}
                  </span>
                </Link>
              ))}
          </div>
        </SlideInRight>
      </aside>
    </div>
  );
}
