'use client';
import { useAppSelector } from '@/store/hook';
import { selectLoading } from '../../store/selectors/loading';
import { Center } from '@mantine/core';
import Image from 'next/image';
import logo from '../../../public/Images/logo.png';

export default function GlobalLoader() {
  const loading = useAppSelector(selectLoading);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-white
                  dark:bg-gray-900 flex items-center 
                    justify-center">
      <Center style={{ flexDirection: 'column' }}>
        <Image
          src={logo}
          alt="Logo"
          className="w-40 h-40 object-contain animate-pulse"
          priority
        />
        <div className="loader mt-6"></div>
      </Center>
    </div>
  );
}
