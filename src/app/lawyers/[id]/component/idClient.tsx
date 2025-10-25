'use client';

import { useLang } from '@/hooks/useLang';
import { useAppSelector, useAppDispatch } from '@/store/hook';
import { selectLang } from '@/store/selectors/lang';
import { startLoading, stopLoading } from '@/store/reducers/loadingSlice';
import { useEffect } from 'react';
import SlideInLeft from '@/component/Sliders/slideInLeft';
import Image from 'next/image';

interface Props {
  lawyers: LawyersItem;
}
export default function IdClient({ lawyers }: Props) {
  const { t, ready } = useLang();
  const dispatch = useAppDispatch();
  const currentLang = useAppSelector(selectLang);

  useEffect(() => {
    dispatch(startLoading());
    const timer = setTimeout(() => dispatch(stopLoading()), 300);
    return () => clearTimeout(timer);
  }, [dispatch]);

  if (!ready) return null;

  const getLocalizedAbout = () => {
    const key = `about_${currentLang}` as keyof LawyersItem;
    return lawyers[key] || '';
  };

  return (
    <div className="pages mt-4 mb-12">
      <SlideInLeft>
        <div className="relative overflow-hidden flex flex-col mx-auto
                        md:flex-row items-start gap-8 p-8 max-w-5xl">

          {/* Background image */}
          <Image
            src="/Images/bg.jpg"
            alt="background"
            fill
            className="object-cover opacity-30 z-0"
            priority
          />

          <div className="relative w-72 h-72 mx-auto md:mx-0 border-4
                           border-primary rounded-full overflow-hidden shadow">
            <Image
              src={lawyers.photo}
              alt={lawyers.name}
              fill
              className="object-cover  object-bottom"
              priority
              sizes="(max-width: 768px) 100vw, 192px"
            />
          </div>

          <div className="flex-1 z-10">
            <h1 className="text-3xl md:text-4xl font-bold text-primary 
                           mb-4 dark:text-gray-200">
              {lawyers.name}
            </h1>

            <div className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              <p className="font-medium mb-2">{lawyers.age}</p>
              <p className="font-medium">
                {t.experience}: {lawyers.experience} {t.years}
              </p>
            </div>

            <hr className="my-4 border-gray-300 dark:border-gray-600" />

            <div className="text-gray-700 dark:text-gray-200 l
                            eading-relaxed text-sm whitespace-pre-wrap">
              {getLocalizedAbout()}
            </div>
          </div>
        </div>
      </SlideInLeft>
    </div>
  );
}
