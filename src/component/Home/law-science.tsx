'use client';
import 'keen-slider/keen-slider.min.css';
import { useLang } from '@/hooks/useLang';
import Link from 'next/link';
import { LawScienceSlider } from '../Sliders/law-science';
import { getLawScience } from '@/api/get';
import { useEffect, useState } from 'react';
import { Center } from '@mantine/core';
import ErrorMessage from '../Error/Error';

export const Pictures = () => {
    const { t, ready } = useLang();
    const [lawScience, setLawScience] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await getLawScience();
                setLawScience(res || []);
            } catch (err) {
                setError(true)
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 200);
            }
        };
        fetchData();
    }, []);

    if (!ready || loading) {
        return (
            <Center style={{ height: '10vh' }}>
                <div className="loader"></div>
            </Center>
        );
    }

    if (error) return <ErrorMessage message='' />;

    return (
        <div className="w-full py-8 media">
            <h1 className="h2 mb-8">
                {t.law_science}
            </h1>
            <LawScienceSlider lawScience={lawScience}/>
            <Link
                href='/law-science'
            >
                <div className='w-full flex justify-center'>
                    <button className="font-medium text-white hover:opacity-90 mt-8
                                       bg-secondary py-1.5 px-12  rounded transition">
                        {t.all}
                    </button>
                </div>
            </Link>
        </div>
    );
};
