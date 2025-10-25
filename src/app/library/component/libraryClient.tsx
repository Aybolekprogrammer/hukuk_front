'use client';
import { useEffect, useState } from 'react';
import { useLang } from '@/hooks/useLang';
import { useAppSelector } from '@/store/hook';
import { selectLang } from '../../../store/selectors/lang';
import { FaChevronDown, FaChevronUp, FaDownload, FaSearch } from 'react-icons/fa';
import Image from 'next/image';
import SlideInLeft from '@/component/Sliders/slideInLeft';
import SlideInRight from '@/component/Sliders/slideInRight';
import { getLibraryWithParams } from '@/api/get';
import { Center } from '@mantine/core';
import ErrorMessage from '@/component/Error/Error';
import Link from 'next/link';

export default function LibraryClient(
    { books: initialBooks }: { books: LibraryItem[] }
) {
    const { ready, t } = useLang();
    const currentLang = useAppSelector(selectLang);

    const [books, setBooks] = useState<LibraryItem[]>(initialBooks);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedAuthor, setSelectedAuthor] = useState<string>('');
    const [showAuthors, setShowAuthors] = useState(false);
    const [showCategories, setShowCategories] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const categories = Array.from(new Set(initialBooks.map((b) => b.category.name_tm)));
    const authors = Array.from(new Set(initialBooks.map((b) => b.author.name)));

    const getLangField = (book: LibraryItem, field: 'title' | 'file'): string => {
        const key = `${field}_${currentLang}` as keyof LibraryItem;
        return book[key] as string;
    };

    const applyFilter = async () => {
        setLoading(true)
        setError(false);
        try {
            const queryParams: any = {};
            if (search) queryParams.search = search;

            if (selectedCategory) {
                const categoryObj = initialBooks.find(b => b.category.name_tm === selectedCategory);
                if (categoryObj) queryParams.category = categoryObj.category.id;
            }

            if (selectedAuthor) {
                const authorObj = initialBooks.find(b => b.author.name === selectedAuthor);
                if (authorObj) queryParams.author = authorObj.author.id;
            }

            const res = await getLibraryWithParams(queryParams);
            setBooks(res || []);
        } catch (err) {
            setBooks([]);
            setError(true);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 200);
        }
    };

    const clearFilters = async () => {
        setSearch('');
        setSelectedAuthor('');
        setSelectedCategory('');
        setLoading(true);
        setError(false);

        try {
            const res = await getLibraryWithParams({});
            setBooks(res || []);
        } catch (err) {
            setBooks([]);
            setError(true);
        } finally {
            setTimeout(() => setLoading(false), 500);
        }
    };

    useEffect(() => {
        setLoading(false)
    }, [setLoading]);

    if (!ready || loading) {
        return (
            <Center style={{ height: '50vh' }}>
                <div className="loader"></div>
            </Center>
        );
    }
    if (error) return <ErrorMessage message='' />;

    return (
        <div className="pages flex flex-col lg:flex-row gap-4 mt-4 mb-12">
            <div className='w-full lg:w-[20%]'>
                <SlideInLeft>
                    <aside className="bg-white dark:bg-gray-800 rounded p-4 h-max">
                        <label className="block mb-1 font-medium">
                            {t.search}
                        </label>
                        {/* Name */}
                        <div className="relative border dark:bg-gray-700
                                     dark:border-gray-600 rounded">
                            <FaSearch className="absolute top-3 left-2 text-gray-500" />
                            <input
                                type="text"
                                placeholder={t.search}
                                className="pl-8 pr-2 py-1.5 w-full rounded 
                                          outline-none  dark:bg-gray-700"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        {/* Categories */}
                        <div className="relative mt-3">
                            <label className="block mb-1 font-medium">
                                {t.categories}
                            </label>
                            <button
                                onClick={() => setShowCategories((prev) => !prev)}
                                className="w-full py-2 px-3 rounded border dark:bg-gray-700
                                       dark:border-gray-600 flex justify-between items-center"
                            >
                                <span>{selectedCategory || t.choose}</span>
                                {showCategories ?
                                    <FaChevronUp className='text-gray-400' /> :
                                    <FaChevronDown className='text-gray-400' />
                                }
                            </button>
                            {showCategories && (
                                <ul className="absolute z-10 w-full max-h-48 overflow-y-auto
                                             bg-white dark:bg-gray-700 border custom-scroll
                                              dark:border-gray-600 rounded shadow-md">
                                    {categories.map((cat) => (
                                        <li
                                            key={cat}
                                            onClick={() => {
                                                setSelectedCategory(cat);
                                                setShowCategories(false);
                                            }}
                                            className="hover:bg-gray-100 cursor-pointer
                                                       dark:hover:bg-gray-600 px-3 py-2"
                                        >
                                            {cat}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Authors */}
                        <div className="relative mt-3">
                            <label className="block mb-1 font-medium">{t.author}</label>
                            <button
                                onClick={() => setShowAuthors((prev) => !prev)}
                                className="w-full py-2 px-3 rounded border dark:bg-gray-700
                                       dark:border-gray-600 flex justify-between items-center"
                            >
                                <span>{selectedAuthor || t.choose}</span>
                                {showAuthors ?
                                    <FaChevronUp className='text-gray-400' /> :
                                    <FaChevronDown className='text-gray-400' />
                                }
                            </button>
                            {showAuthors && (
                                <ul className="absolute z-10 w-full max-h-48 overflow-y-auto
                                             bg-white dark:bg-gray-700 border custom-scroll
                                              dark:border-gray-600 rounded shadow-md">
                                    {authors.map((auth) => (
                                        <li
                                            key={auth}
                                            onClick={() => {
                                                setSelectedAuthor(auth);
                                                setShowAuthors(false);
                                            }}
                                            className="hover:bg-gray-100 cursor-pointer
                                                       dark:hover:bg-gray-600 px-3 py-2"
                                        >
                                            {auth}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className='flex justify-between my-4 gap-2'>
                            <button
                                onClick={applyFilter}
                                className="font-medium text-white hover:opacity-90
                                 w-full transition bg-secondary py-1.5  rounded"
                            >
                                {t.search}
                            </button>

                            <button
                                onClick={clearFilters}
                                className="w-full text-black border py-1.5 rounded
                                           dark:text-gray-400 dark:border-gray-400"
                            >
                                {t.clear}
                            </button>
                        </div>
                    </aside>
                </SlideInLeft>
            </div>

            {/* Kitaplar */}
            <div className='w-full lg:w-[85%]'>
                <SlideInRight>
                    <div className="grid grid-cols-1 sm:grid-cols-2 
                                   md:grid-cols-3 xl:grid-cols-4 gap-4">
                        {books.length === 0 ? (
                            <p className="text-gray-500 dark:text-gray-300">
                                {t.not_found}
                            </p>
                        ) : (
                            books.map((book) => (
                                <div key={book.id} className="bg-white dark:bg-gray-800 rounded shadow 
                                                        relative hover:shadow-lg transition-all overflow-hidden">
                                    <Link href={`/library/${book.id}`}>
                                        <div className="relative w-full h-64">
                                            <Image
                                                src={book?.photo}
                                                alt={getLangField(book, 'title')}
                                                fill
                                                sizes="(min-width: 768px) 128px, 100vw"
                                                className="object-cover object-top mt-rounded"
                                                priority
                                            />
                                        </div>
                                    </Link>
                                    <div className="p-2 pb-12">
                                        <h3 className="font-semibold text-gray-800 
                                                  text-md dark:text-white line-clamp-2">
                                            {getLangField(book, 'title')}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 
                                                        pt-1 line-clamp-2 text-sm">
                                            {book.author.name}
                                        </p>
                                    </div>
                                    <div className='absolute bottom-2 right-2'>
                                        <a
                                            href={getLangField(book, 'file')}
                                            target='_blank'
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center bg-green-600 text-white 
                                                  gap-1 transition py-1.5 px-2 rounded hover:opacity-80 text-sm h-8"
                                        >
                                            <FaDownload />
                                            {t.download}
                                        </a>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </SlideInRight>
            </div>
        </div>
    );
}
