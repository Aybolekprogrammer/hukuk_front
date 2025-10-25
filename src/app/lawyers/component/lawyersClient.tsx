'use client';
import { useEffect, useState } from 'react';
import { useLang } from '@/hooks/useLang';
import { useAppSelector } from '@/store/hook';
import { selectLang } from '@/store/selectors/lang';
import SlideInLeft from '@/component/Sliders/slideInLeft';
import { FaSearch } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

export default function LawyersClient(
    { lawyers }: { lawyers: LawyersItem[] }
) {
    const { ready, t } = useLang();
    const currentLang = useAppSelector(selectLang);

    const [search, setSearch] = useState('');
    const [origin, setOrigin] = useState<'all' | 'national' | 'foreign'>('all');
    const [filtered, setFiltered] = useState<LawyersItem[]>(lawyers);
    const [loading, setLoading] = useState(false);

    const getAbout = (lawyer: LawyersItem): string => {
        const key = `about_${currentLang}` as keyof LawyersItem;
        return (lawyer[key] as string) || '';
    };

    useEffect(() => {
        setLoading(true);

        const timeout = setTimeout(() => {
            let result = [...lawyers];

            if (origin !== 'all') {
                result = result.filter(l => l.origin === origin);
            }

            if (search.trim()) {
                const lower = search.toLowerCase();
                result = result.filter(l =>
                    l.name.toLowerCase().includes(lower) ||
                    getAbout(l).toLowerCase().includes(lower)
                );
            }

            setFiltered(result);
            setLoading(false);
        }, 500);

        return () => clearTimeout(timeout);
    }, [search, origin, lawyers]);

    if (!ready) return null;

    return (
        <div className="pages mt-6 mb-12">
            {/* Filters Section */}
            <div className="flex flex-col md:flex-row mb-6 gap-2 sm:gap-4 
                            justify-between items-center flex-wrap">
                <div className="grid grid-cols-1 sm:grid-cols-3 
                               gap-2 sm:gap-4 w-full sm:w-max">
                    {(['all', 'foreign', 'national'] as const).map((type) => (
                        <button
                            key={type}
                            onClick={() => setOrigin(type)}
                            className={`px-4 py-2 rounded border transition
                                      dark:bg-gray-700 dark:border-gray-600 
                                  w-full sm:w-[200px]  md:w-[220px] ${origin === type ?
                                    'bg-white border-b-[#c9b77b] dark:border-b-gray-200'
                                    : 'bg-white hover:text-secondary'
                                }`}
                        >
                            {type === 'all'
                                ? t.all
                                : type === 'foreign'
                                    ? t.foreign_lawyers
                                    : t.national_lawyers}
                        </button>
                    ))}
                </div>

                {/* Search Input */}
                <div className="relative w-full sm:w-max">
                    <div className="border border-gray-300 bg-gray-50 rounded 
                                 dark:border-gray-600 dark:bg-gray-700 w-full">
                        <input
                            type="search"
                            placeholder={t.search}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full px-4 py-2 border-none bg-gray-50 
                                       text-sm rounded dark:bg-gray-700 focus:ring-2
                                     placeholder-gray-400 dark:placeholder-gray-300
                                       focus:outline-none  focus:ring-blue-400 pr-8"
                        />
                        <p className="absolute right-0 top-1/2 -translate-y-1/2 w-8 text-sm
                                      flex justify-center items-center h-full text-gray-400"
                        >
                            <FaSearch />
                        </p>

                    </div>
                </div>
            </div>

            {/* Lawyers List */}
            <SlideInLeft>
                <div className="relative grid grid-cols-1 sm:grid-cols-2 
                                md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {loading ? (
                        <div className="lg:absolute flex justify-center
                                       items-center my-24 w-full">
                            <div className="loader"></div>
                        </div>
                    ) : filtered.length === 0 ? (
                        <p className="text-gray-500 dark:text-gray-300 col-span-full">
                            {t.not_found}
                        </p>
                    ) : (
                        filtered?.map((lawyer) => (
                            <Link href={`/lawyers/${lawyer.id}`} key={lawyer.id}>
                                <div className="text-center bg-white p-4 rounded dark:bg-gray-700 h-full">
                                    <div className="w-40 h-40 mx-auto mb-3 relative">
                                        <Image
                                            src={lawyer?.photo}
                                            alt={lawyer.name}
                                            className="rounded-full object-cover"
                                            fill
                                            sizes="(max-width: 768px) 100vw, 192px"
                                            priority
                                        />
                                    </div>
                                    <h2 className="text-lg font-semibold text-primary dark:text-gray-300 mb-1">
                                        {lawyer.name}
                                    </h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">
                                        {getAbout(lawyer)}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        {t.experience}: {lawyer.experience} {t.years}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 font-bold">
                                        {lawyer.age}
                                    </p>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </SlideInLeft>
        </div>
    );
}

