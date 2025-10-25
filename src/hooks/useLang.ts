'use client';
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../store/hook";
import { setLang } from "../store/reducers/langSlice";
import { translations, fallbackLang, Lang } from "../translations";

export function useLang() {
  const dispatch = useAppDispatch();
  const lang = useAppSelector((state) => state.lang);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("lang") as Lang | null;
    if (stored && ["tm", "ru", "en", "tr"].includes(stored)) {
      dispatch(setLang(stored));
    }
    setReady(true);
  }, [dispatch]);

  const t = translations[lang] ?? translations[fallbackLang];

  return { lang, t, ready };
}
