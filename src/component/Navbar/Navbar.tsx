'use client';
import React, { useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { setLang } from "../../store/reducers/langSlice";
import { Lang } from "../../translations/index";
import { selectLang } from "../../store/selectors/lang";
import { useLang } from "../../hooks/useLang";
import { Context } from '../../store/context';
import { getFormattedDateTime } from '../../utils/dateConverter';
import { FaMoon, FaSun, FaRegCalendarAlt, FaPhone, FaEnvelope, FaSignInAlt } from "react-icons/fa";
import axios from 'axios';
import { WiDaySunny } from 'react-icons/wi';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { categories } from './Categories';
import { Burger, Drawer, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import SearchDropdown from '../Search/search';

const LANGS: Lang[] = ["tm", "ru", "en", "tr"];

export default function Navbar(
  { about }: { about?: AboutData }
) {
  const dispatch = useAppDispatch();
  const currentLang = useAppSelector(selectLang);
  const { darkMode, setDarkMode } = useContext(Context);
  const toggleDark = () => setDarkMode(!darkMode);
  const { t, ready } = useLang();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [opened, { toggle, close }] = useDisclosure(false);
  const pathname = usePathname();

  interface WeatherData {
    place: string;
    temperature: number;
  }
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const result = await axios.get<{ data: WeatherData[] }>(
          'https://meteo.gov.tm/api/current-weather'
        );
        const ashgabatWeather = result.data.data.find((e) => e.place === 'Aşgabat');
        if (ashgabatWeather) {
          setWeather(ashgabatWeather);
        }
      } catch (error) {
        console.error("Failed to fetch weather", error);
      }
    };
    fetchWeather();
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const { date, time } = getFormattedDateTime();
      setDate(date);
      setTime(time);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!ready) return null;

  const handleLangChange = (lang: Lang) => {
    if (lang === currentLang) return;
    localStorage.setItem("lang", lang);
    dispatch(setLang(lang));
  };

  return (
    <nav>
      <section className="media flex justify-between gap-2 items-center 
                          text-sm text-gray-200 dark:text-gray-200 
                          py-2 bg-primary dark:bg-gray-700">
        <div className="flex gap-2 items-center ">
          {/* date and time */}
          <div className='hidden lg:flex gap-1 items-center border-r-2
                        border-gray-300 pr-2 tems-center'>
            <FaRegCalendarAlt />
            <span>{date}</span>
            <span>{time}</span>
          </div>
          {/* weather */}
          {weather ? (
            <div className='flex  items-center border-r-2
                          border-gray-300 pr-2 gap-1'>
              <WiDaySunny className="text-[#c9b77b]" />
              {weather.temperature}
              <span className='hidden lg:block'>° Aşgabat</span>
            </div>
          ) : (
            ''
          )}
          {/* dark mode */}
          <button
            onClick={toggleDark}
            className="flex items-center gap-1 transition duration-300"
          >
            {darkMode ? (
              <>
                <FaMoon className="text-gray-200" />
                {t.dark}
              </>
            ) : (
              <>
                <FaSun className="text-[#c9b77b]" />
                {t.light}
              </>
            )}
          </button>
        </div>
        {/* language change */}
        <div className="flex gap-2 items-center">
          {LANGS.map((lang) => (
            <button
              key={lang}
              onClick={() => handleLangChange(lang)}
              className='cursor-pointer'
            >
              <img
                src={`/Icons/flag/${lang}.png`}
                alt={lang}
                className="w-5 h-4 rounded-sm object-contain"
              />
            </button>
          ))}
        </div>
      </section>

      <section className="media flex flex-col lg:flex-row justify-between 
                          items-center gap-2 py-4 bg-white dark:bg-gray-800">
        {/* Logo */}
        <Link href='/'>
          <div className="flex items-center justify-between gap-1 text-xl 
                        font-extrabold font-serif dark:text-gray-200">
            <div className='relative w-[70px] h-24'>
              <Image
                src="/Images/logo.png"
                alt="logo"
                fill
                className="object-contain mr-2"
                priority
                sizes="(max-width: 768px) 100vw, 192px"
              />
            </div>
            <div className='mt-4 font-'>
              <p>TÜRKMEN</p>
              <span className="text-[#c9b77b] text-2xl">Hukuk</span>
            </div>
          </div>
        </Link>

        {/* Contact & Search */}
        <div className="flex flex-col gap-2 w-full lg:w-[40%]">
          <div className="hidden sm:flex flex-wrap gap-4 justify-center lg:justify-end text-sm">
            <p className="flex items-center gap-2">
              <FaPhone className="text-secondary" />
              {about?.phone || ''}
            </p>
            <p className="flex items-center gap-2">
              <FaEnvelope className="text-secondary" />
              {about?.email || ''}
            </p>
          </div>
          <div className="hidden lg:block w-full">
            <SearchDropdown />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="hidden lg:flex  justify-between gap-8 items-center border-t
                          media bg-[#ffffffee]  shadow-sm  py-2 text-gray-800 
                        dark:bg-gray-800 dark:border-t-gray-500 dark:text-gray-100">
        <div className="flex gap-4 overflow-x-auto">
          {categories.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`relative pb-1 text-sm transition-all duration-300 
                        hover:text-[#c9b77b] ${pathname === item.href
                  ? 'border-b-2 border-[#c9b77b]'
                  : 'border-b-2 border-transparent'
                }`}
            >
              {t[item.label]}
            </Link>
          ))}

        </div>
        <Link
          href="/login"
          className="font-medium bg-secondary px-6 py-1.5 text-gray-50 
                    text-sm rounded hover:opacity-90 transition "
        >
          <p className='flex gap-2 items-center'>
            {t.login}
            <FaSignInAlt />
          </p>
        </Link>
      </section>

      {/* mobile categories and search area */}
      <section className="lg:hidden flex  justify-between items-center
                          media bg-[#ffffffee]  py-2 shadow-sm border-t
                        dark:bg-gray-500 dark:border-t-gray-500">
        <Burger
          opened={opened}
          onClick={toggle}
          aria-label="Toggle navigation"
          color=""
        />
        <div className=' w-[50%]'>
          <SearchDropdown />
        </div>

      </section>

      {/* categories modal for mobile */}
      <Drawer
        opened={opened}
        onClose={close}
        padding="md"
        size="80%"
        title={t.categories}
        classNames={{
          content: 'dark:bg-gray-800 ',
          header: 'dark:bg-gray-600 mx-2',
          body: '',
        }}
        overlayProps={{ opacity: 0.55, blur: 3 }}
        closeButtonProps={{ className: 'dark:text-gray-100' }}
      >
        <ScrollArea className="h-full pt-3 border-t dark:border-t-0">
          <div className="flex flex-col px-2">
            {categories.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`border-b py-2 dark:border-b-gray-600 
                            ${pathname === item.href ?
                    'text-[#c9b77b]' : ''}`}
                onClick={close}
              >
                {t[item.label]}
              </Link>
            ))}
          </div>

          <Link
            href="/login"
            className="block text-sm font-medium bg-secondary
                    text-white px-8 py-2 rounded my-4 w-fit ml-2
                      hover:shadow transition dark:bg-gray-600"
            onClick={close}
          >
            <p className='flex gap-2 items-center'>
              {t.login}
              <FaSignInAlt />
            </p>
          </Link>
        </ScrollArea>
      </Drawer>
    </nav>
  );
}
