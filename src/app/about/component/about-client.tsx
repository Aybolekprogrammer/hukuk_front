'use client';
import SlideInLeft from "@/component/Sliders/slideInLeft";
import { useLang } from "../../../hooks/useLang";
import { useAppDispatch } from "@/store/hook";
import { useEffect } from "react";
import { startLoading, stopLoading } from "@/store/reducers/loadingSlice";

export default function AboutClient(
  { about }: { about: AboutData }
) {
  const { t, ready, lang } = useLang();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(startLoading());
    const timer = setTimeout(() => dispatch(stopLoading()), 200);
    return () => clearTimeout(timer);
  }, [dispatch]);

  if (!ready) return null;

  const getLangText = () => {
    const key = `about_${lang}` as keyof AboutData;
    return about?.[key] || '';
  };  

  return (
    <div className="mt-4 mb-12 bg-white dark:bg-gray-800 text-gray-800 
                    dark:text-gray-100 p-4 rspace-y-4 leading-7 pages">
      <SlideInLeft>
        <h1 className="h1 mb-4">{t.about}</h1>
        <p className="whitespace-pre-line">
          {getLangText()}
        </p>
      </SlideInLeft>
    </div>
  );
}
