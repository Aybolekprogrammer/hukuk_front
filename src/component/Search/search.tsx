'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';
import { categories } from './searchByCategories';
import { useLang } from '@/hooks/useLang';

export default function SearchDropdown() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="relative w-full">
      {/* Desktop Search */}
      <div className="hidden lg:block relative w-full">
        <div className="border border-gray-300 bg-gray-50 rounded
                        dark:border-gray-600 dark:bg-gray-700 w-full relative">
          <input
            type="search"
            placeholder={t.search}
            readOnly
            className="w-full px-4 py-1.5 border-none bg-gray-50 pr-14 text-sm rounded
                       dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-300 
                       focus:outline-none focus:ring-2 focus:ring-blue-400"
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
          />
          <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        {open && (
          <ul className="absolute z-20 mt-1 w-full bg-white dark:bg-gray-700 border 
                         dark:border-gray-600 shadow-lg rounded py-2 text-sm">
            {categories.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600
                             text-gray-700 dark:text-gray-200"
                  onClick={() => setOpen(false)}
                >
                  {t[item.label]}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Mobile Search */}
      <div className="block lg:hidden relative">
        <div className="flex border border-gray-300 text-sm
                        dark:border-gray-600 dark:bg-gray-700 relative">
          <input
            id="mobile-search"
            type="search"
            readOnly
            placeholder={t.search}
            className="w-full px-2 py-1.5 border-none shadow-inner
                       dark:bg-gray-700 dark:placeholder-gray-300 
                       focus:outline-none focus:ring-1 focus:ring-blue-400"
            onFocus={() => setMobileOpen(true)}
            onBlur={() => setTimeout(() => setMobileOpen(false), 150)}
          />
          <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        {mobileOpen && (
          <ul className="absolute z-20 mt-1 w-full bg-white dark:bg-gray-700 border 
                         dark:border-gray-600 shadow-lg rounded py-2 text-sm">
            {categories.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600
                             text-gray-700 dark:text-gray-200"
                  onClick={() => setMobileOpen(false)}
                >
                  {t[item.label]}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
