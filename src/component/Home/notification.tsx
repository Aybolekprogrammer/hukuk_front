'use client';
import { useLang } from '@/hooks/useLang';
import Image from 'next/image';
import {
  Bell, ShieldAlert, Gavel
} from 'lucide-react';
import Link from 'next/link';
import SlideInLeft from '../Sliders/slideInLeft';
import { useEffect, useState } from 'react';
import { getAnnouncement } from '@/api/get';
import { Center } from '@mantine/core';
import ErrorMessage from '../Error/Error';

const icons = [Bell, ShieldAlert, Gavel];

export const Notification = () => {
  const { t, lang, ready } = useLang();
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getAnnouncement();
        setAnnouncements(Array.isArray(res) ? res : []);
      } catch (err) {
        setError(true);
      } finally {
        setTimeout(() => setLoading(false), 200);
      }
    };

    fetchData();
  }, []);

  const getLangField = (
    item: AnnouncementItem,
    field: 'title' | 'description'
  ) => {
    const key = `${field}_${lang}` as keyof AnnouncementItem;
    return (item[key] as string) || '';
  };

  if (!ready || loading) {
    return (
      <Center style={{ height: '30vh' }}>
        <div className="loader"></div>
      </Center>
    );
  }

  if (error) return <ErrorMessage message="" />;

  return (
    <section className="relative overflow-hidden py-12 min-h-max">
      <Image
        src="/Images/bld.jpg"
        alt="Notification Background"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-70 z-10" />

      <div className="relative z-20 flex items-center media
                      h-full justify-center text-center ">
        <SlideInLeft>
          <h1 className="font-bold text-xl text-white dark:text-gray-200">
            {t.announcement}
          </h1>

          {announcements?.length === 0 ? (
            <p className="text-white my-4">{t.not_found}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full my-8">
              {announcements?.slice(0, 3).map((item, index) => {
                const Icon = icons[index % icons.length];
                const isCenter = index === 1;

                return (
                  <div
                    key={item.id}
                    className={`p-6 shadow-xl text-center transition-all
                      ${isCenter
                        ? 'bg-primary text-white'
                        : 'bg-white text-gray-800 dark:bg-gray-800 dark:text-white'}
                           hover:-translate-y-1 hover:shadow-2xl cursor-pointer`}
                  >
                    <Icon
                      className={`w-16 h-16 mb-3 mx-auto rounded-full p-4 border 
                         ${isCenter ? 'text-white' : 'text-[#c9b77b] border-[#c9b77b]'}`}
                    />
                    <h3 className="font-semibold text-lg mb-2 line-clamp-3">
                      {getLangField(item, 'title')}
                    </h3>
                    <p className="text-sm line-clamp-2">
                      {getLangField(item, 'description')}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          <Link
            href="/announcement"
            className="border border-[#cec091] rounded text-center button-hover
                       mt-2 py-1.5 px-12 w-max z-0 text-gray-50 overflow-hidden"
          >
            {t.all}
          </Link>
        </SlideInLeft>
      </div>
    </section>
  );
};
