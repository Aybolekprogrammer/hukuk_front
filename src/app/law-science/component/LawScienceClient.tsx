'use client';

import { useEffect, useState } from 'react';
import { getLawScienceCategories, getLawScienceWithParams } from '@/api/get';
import { useLang } from '@/hooks/useLang';
import { useAppSelector } from '@/store/hook';
import { selectLang } from '@/store/selectors/lang';
import { FaSearch, FaChevronDown, FaChevronUp, FaDownload } from 'react-icons/fa';
import { Center } from '@mantine/core';
import SlideInLeft from '@/component/Sliders/slideInLeft';
import SlideInRight from '@/component/Sliders/slideInRight';
import ErrorMessage from '@/component/Error/Error';
import Image from 'next/image';
import Link from 'next/link';

export default function LawScienceClient() {
    const { t, ready } = useLang();
    const lang = useAppSelector(selectLang);

    const [data, setData] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [showCategories, setShowCategories] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchData = async (params = {}) => {
        setLoading(true);
        setError(false);
        try {
            const res = await getLawScienceWithParams(params);
            setData(res || []);
        } catch {
            setError(true);
        } finally {
            setTimeout(() => setLoading(false), 300);
        }
    };

    const applyFilter = () => {
        const query: any = {};
        if (search) query.search = search;
        if (selectedCategory) {
            const categoryObj = categories.find((c) => c.name_tm === selectedCategory);
            if (categoryObj) query.category = categoryObj.id;
        }
        fetchData(query);
    };

    const clearFilters = () => {
        setSearch('');
        setSelectedCategory('');
        fetchData({});
    };

    const getLangField = (item: any, field: 'title' | 'about' | 'file') => {
        const key = `${field}_${lang}`;
        return item[key] || item[`${field}_tm`];
    };

    const getCategoryName = (cat: any) => {
        const key = `name_${lang}`;
        return cat[key] || cat.name_tm;
    };

    useEffect(() => {
        const init = async () => {
            setLoading(true);
            try {
                const [res, cats] = await Promise.all([
                    getLawScienceWithParams({}),
                    getLawScienceCategories(),
                ]);
                setData(res || []);
                setCategories(cats || []);
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        init();
    }, []);

    if (!ready || loading) {
        return (
            <Center style={{ height: '50vh' }}>
                <div className="loader"></div>
            </Center>
        );
    }

    if (error) return <ErrorMessage message="" />;

    return (
        <div className="pages flex flex-col lg:flex-row gap-4 mt-4 mb-12">
            {/* Filters */}
            <div className="w-full lg:w-[20%]">
                <SlideInLeft>
                    <aside className="bg-white dark:bg-gray-800 rounded p-4 h-max">
                        <label className="block mb-1 font-medium">
                            {t.search}
                        </label>
                        <div className="relative border dark:bg-gray-700 
                                       dark:border-gray-600 rounded">
                            <FaSearch className="absolute top-3 left-2 text-gray-500" />
                            <input
                                type="text"
                                placeholder={t.search}
                                className="pl-8 pr-2 py-1.5 w-full rounded
                                           outline-none dark:bg-gray-700"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        {/* Category Dropdown */}
                        <div className="relative mt-3">
                            <label className="block mb-1 font-medium">
                                {t.categories}
                            </label>
                            <button
                                onClick={() => setShowCategories((prev) => !prev)}
                                className="w-full py-2 px-3 rounded border dark:bg-gray-700
                                         dark:border-gray-600 flex justify-between items-center"
                            >
                                <span>
                                    {selectedCategory
                                        ? getCategoryName(categories.find((c) =>
                                            c.name_tm === selectedCategory))
                                        : t.choose}
                                </span>

                                {showCategories ?
                                    <FaChevronUp className='text-gray-400' /> :
                                    <FaChevronDown className='text-gray-400' />
                                }
                            </button>
                            {showCategories && (
                                <ul className="absolute z-10 w-full max-h-48 overflow-y-auto
                                             bg-white dark:bg-gray-700 border 
                                             dark:border-gray-600 rounded shadow-md">
                                    {categories.map((cat) => (
                                        <li
                                            key={cat.id}
                                            onClick={() => {
                                                setSelectedCategory(cat.name_tm);
                                                setShowCategories(false);
                                            }}
                                            className="px-3 py-2 hover:bg-gray-100 
                                                 dark:hover:bg-gray-600  cursor-pointer"
                                        >
                                            {getCategoryName(cat)}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-between mt-4 gap-2">
                            <button
                                onClick={applyFilter}
                                className="font-medium text-white hover:opacity-90
                                        w-full transition bg-secondary py-1.5  rounded"
                            >
                                {t.search}
                            </button>
                            <button
                                onClick={clearFilters}
                                className="w-full border dark:border-gray-500 py-1.5 rounded"
                            >
                                {t.clear}
                            </button>
                        </div>
                    </aside>
                </SlideInLeft>
            </div>

            {/* Cards */}
            <div className="w-full lg:w-[80%]">
                <SlideInRight>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                        {data.length === 0 ? (
                            <p className="text-gray-500 dark:text-gray-300">{t.not_found}</p>
                        ) : (
                            data.map((item) => (
                                <div key={item.id} className="bg-white dark:bg-gray-800 rounded relative 
                                                               hover:shadow-lg transition overflow-hidden">
                                    <Link href={`/law-science/${item.id}`}>
                                        <div className="relative w-full h-64">
                                            <Image
                                                src={item.photo}
                                                alt={getLangField(item, 'title')}
                                                fill
                                                className="object-cover object-top"
                                                sizes="(min-width: 768px) 128px, 100vw"
                                                priority
                                            />
                                        </div>
                                    </Link>
                                    <div className="p-2 pb-12">
                                        <h3 className="font-semibold text-gray-800 dark:text-white text-md line-clamp-2">
                                            {getLangField(item, 'title')}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 pt-1">
                                            {getLangField(item, 'about')}
                                        </p>
                                    </div>
                                    {getLangField(item, 'file') && (
                                        <div className="absolute bottom-2 right-2">
                                            <a
                                                href={getLangField(item, 'file')}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center bg-green-600 
                                                          text-white gap-1 py-1.5 px-2 rounded 
                                                            hover:opacity-80 text-sm h-8"
                                            >
                                                <FaDownload />
                                                {t.download}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </SlideInRight>
            </div>
        </div>
    );
}
