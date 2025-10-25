'use client';
import Link from 'next/link';
import { useLang } from '@/hooks/useLang';
import SlideInRight from '../Sliders/slideInRight';
import Image from 'next/image';
import {
    FaPhoneAlt, FaEnvelope, FaInfoCircle,
    FaQuestionCircle, FaMapMarkerAlt,
    FaFileContract
} from 'react-icons/fa';

export const Footer = (
    { about }: { about?: AboutData }
) => {
    const { t, ready } = useLang();
    if (!ready) return null;

    return (
        <footer className="bg-primary media text-white pt-12 pb-6">
            <SlideInRight>
                <div className="flex flex-col lg:flex-row md:justify-between 
                                flex-wrap gap-6 items-center md:items-start">

                    <div className="w-full lg:w-[25%] flex justify-center 
                                    lg:justify-start mb-6 lg:mb-0 ">
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
                    </div>

                    {/* ✅ 2. About */}
                    <div className="w-full lg:w-[20%] text-center lg:text-left">
                        <h3 className="text-xl font-semibold mb-3  mx-auto lg:mx-0
                                       border-b border-b-[#c9b77b] w-fit pb-1">
                            {t.about}
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2 justify-center lg:justify-start">
                                <FaInfoCircle className="hidden lg:block lg:text-secondary" />
                                <Link href="/about">
                                    {t.about}
                                </Link>
                            </li>
                            <li className="flex items-center gap-2 justify-center lg:justify-start">
                                <FaQuestionCircle className="hidden lg:block text-secondary" />
                                <Link href="/faq">
                                    {t.faq}
                                </Link>
                            </li>
                            <li className="flex items-center gap-2 justify-center lg:justify-start">
                                <FaFileContract className="hidden lg:block text-secondary" />
                                <Link href="/user-agreement">
                                    {t.user_agreement}
                                </Link>
                            </li>
                        </ul>

                    </div>

                    {/* ✅ 3. Services */}
                    <div className="w-full lg:w-[20%] text-center lg:text-left">
                        <h3 className="text-xl font-semibold mb-3 border-b  mx-auto
                                     border-b-[#c9b77b] w-fit lg:mx-0 pb-1">
                            {t.services}
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/lawyers" >
                                    {t.lawyers}
                                </Link>
                            </li>
                            <li>
                                <Link href="/library"  >
                                    {t.library}
                                </Link>
                            </li>
                            <li>
                                <Link href="/scientific-work" >
                                    {t.scientific_work}
                                </Link>
                            </li>
                            <li>
                                <Link href="/law-science" >
                                    {t.law_science}
                                </Link>
                            </li>
                            {/* <li>
                                <Link href="/test" >
                                    {t.test}
                                </Link>
                            </li> */}
                        </ul>
                    </div>

                    {/* ✅ 4. Contact */}
                    <div className="w-full lg:w-[20%] text-center lg:text-left">
                        <h3 className="text-xl font-semibold  mb-3 pb-1 border-b
                                     border-b-[#c9b77b] w-fit mx-auto lg:mx-0 ">
                            {t.contact}
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2 justify-center lg:justify-start">
                                <FaPhoneAlt className="text-secondary" />
                                <a
                                    href={`tel:${about?.phone || ''}`}
                                >
                                    {about?.phone || ''}
                                </a>
                            </li>
                            <li className="flex items-center gap-2 justify-center lg:justify-start">
                                <FaEnvelope className="text-secondary" />
                                <a
                                    href={`mailto:${about?.email || ''}`}
                                >
                                    {about?.email || ''}
                                </a>
                            </li>
                            <li className="flex gap-2 justify-center lg:justify-start">
                                <FaMapMarkerAlt className="text-secondary mt-1" />
                                {about?.address || ''}
                            </li>
                        </ul>

                    </div>
                </div>

                {/* ✅ Footer Bottom */}
                <div className="mt-10 border-t border-white/20 pt-4 
                                text-center text-sm text-white/70">
                    &copy; {new Date().getFullYear()} {t.logo} | {t.privacy}
                </div>
            </SlideInRight>
        </footer>
    );
};
