'use client';

import SlideInLeft from "@/component/Sliders/slideInLeft";
import { useLang } from "../../../hooks/useLang";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hook";
import { startLoading, stopLoading } from "@/store/reducers/loadingSlice";

export default function FaqClient({ faq }: { faq: FaqItem[] }) {
  const { t, ready, lang } = useLang();
  const dispatch = useAppDispatch();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    dispatch(startLoading());
    const timer = setTimeout(() => dispatch(stopLoading()), 200);
    return () => clearTimeout(timer);
  }, [dispatch]);

  if (!ready) return null;

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const getLangValue = (item: FaqItem, key: "title" | "text") => {
    const langKey = `${key}_${lang}` as keyof FaqItem;
    return item[langKey] || '';
  };

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-800 
                 dark:text-gray-100 p-4 leading-7 pages mb-12 mt-4">
      <SlideInLeft>
        <h1 className="h1 mb-4">{t.faq}</h1>

        {faq.map((item, index) => (
          <div
            key={item.id}
            className="p-3 my-2 border border-gray-200
                     dark:border-gray-700 rounded-md "
          >
            <button
              onClick={() => toggleAnswer(index)}
              className="w-full text-left font-medium focus:outline-none"
            >
              {getLangValue(item, "title")}
            </button>
            {openIndex === index && (
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                {getLangValue(item, "text")}
              </p>
            )}
          </div>
        ))}
      </SlideInLeft>
    </div>
  );
}
