'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken, isTokenValid, removeToken } from '@/utils/auth';
import { useLang } from '@/hooks/useLang';
import { getTestCategories } from '@/api/get';
import ErrorMessage from '@/component/Error/Error';
import { Button, Center, Table, Image } from '@mantine/core';
import { postStartTest } from '@/api/post';
import { useTestStore } from '@/store/testStore';
import SlideInLeft from '@/component/Sliders/slideInLeft';
import SlideInRight from '@/component/Sliders/slideInRight';

export default function TestsPage() {
  const { t, ready } = useLang();
  const router = useRouter();
  const [testCategories, setTestCategories] = useState<Testcategories[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { setDuration } = useTestStore();

  useEffect(() => {
    const token = getToken();
    if (!token || !isTokenValid()) {
      removeToken();
      router.replace('/login?redirect=/test');
      return;
    }
    const fetchTests = async () => {
      try {
        const res = await getTestCategories();
        setTestCategories(res);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
  }, [router]);

  if (!ready || loading) {
    return (
      <Center style={{ height: '20vh' }}>
        <div className="loader" />
      </Center>
    );
  }

  if (error) return <ErrorMessage message={t.error} />;

  if (!testCategories.length) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400">
        {t.not_found}
      </p>
    );
  }

  const handleStart = async (id: number) => {
    try {
      const selected = testCategories.find((t) => t.id === id);
      if (!selected) return;
      setDuration(selected.duration_minutes);
      const res = await postStartTest({ test: id });
      router.push(`/test/${res.id}`);
    } catch (err) {
      alert(`${t.not_success}`);
    }
  };

  return (
    <div className="mt-4 mb-12 pages">
      <SlideInLeft>
        <h1 className="h1 mb-4">{t.test}</h1>
        <p className="text-sm text-gray-600">
          {t.test_text} <br />
          {t.test_text2}
        </p>
      </SlideInLeft>

      <SlideInRight>
        {/* MOBILE: dik tablisa (her kategoriýa aýratyn mini-table) */}
        <div className="md:hidden space-y-4 mt-6">
          {testCategories.map((cat, idx) => (
            <div
              key={cat.id}
              className={`rounded overflow-hidden border bg-white dark:bg-gray-700
                          border-gray-200 dark:border-gray-700`}
            >
              <Table
                className="w-full text-sm"
                highlightOnHover={false}
                withColumnBorders={false}
                striped={false}
              >
                <tbody>
                  <tr >
                    <th className="w-36 text-left px-4 py-2 font-medium">ID</th>
                    <td className="px-4 py-2 font-medium">{cat.id}</td>
                  </tr>
                  <tr>
                    <th className="text-left px-4 py-2 font-medium">{t.test_category}</th>
                    <td className="px-4 py-2">{cat.title}</td>
                  </tr>
                  <tr>
                    <th className="text-left px-4 py-2 font-medium">{t.test_time}</th>
                    <td className="px-4 py-2">{cat.duration_minutes} min</td>
                  </tr>
                  <tr>
                    <th className="text-left px-4 py-2 font-medium">{t.test_questions_number}</th>
                    <td className="px-4 py-2">{cat.total_questions}</td>
                  </tr>
                  <tr>
                    <th className="text-left px-4 py-2 font-medium">{t.start_test}</th>
                    <td className="px-4 py-2">
                      <button
                        className="rounded px-3 py-1.5 text-white bg-primary hover:opacity-90 "
                        onClick={() => handleStart(cat.id)}
                      >
                        {t.start_test}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          ))}
        </div>

        {/* DESKTOP: öňküsi ýaly keseligine tablisa */}
        <div className="hidden md:block overflow-x-auto max-w-full">
          <div className="rounded overflow-hidden dark:border-gray-600 mt-6">
            <Table
              striped={false}
              highlightOnHover
              withTableBorder
              withColumnBorders
              className="text-sm min-w-[600px]"
            >
              <thead>
                <tr className="text-center">
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">{t.test_category}</th>
                  <th className="px-4 py-3">{t.test_time}</th>
                  <th className="px-4 py-3">{t.test_questions_number}</th>
                  <th className="px-4 py-3">{t.start_test}</th>
                </tr>
              </thead>
              <tbody className="text-center rounded">
                {testCategories.map((cat, idx) => (
                  <tr
                    key={cat.id}
                    className={`transition duration-200 ${
                      idx % 2 === 0 ? 'bg-white dark:bg-gray-700' : 'bg-gray-50 dark:bg-gray-800'
                    } hover:bg-gray-100`}
                  >
                    <td className="px-4 py-2 font-medium">{cat.id}</td>
                    <td className="px-4 py-2">{cat.title}</td>
                    <td className="px-4 py-2">{cat.duration_minutes} min</td>
                    <td className="px-4 py-2">{cat.total_questions}</td>
                    <td className="px-4 py-2">
                      <button
                        className="rounded px-3 py-1.5 text-white bg-primary hover:opacity-90"
                        onClick={() => handleStart(cat.id)}
                      >
                        {t.start_test}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </SlideInRight>
    </div>
  );
}
