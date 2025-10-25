interface LawScienceItem {
  id: number;
  title_tm: string;
  title_en: string;
  title_ru: string;
  title_tr: string;
  file_tm: string | null;
  file_en: string | null;
  file_ru: string | null;
  file_tr: string | null;
  photo: string;
  about_tm: string;
  about_en: string;
  about_ru: string;
  about_tr: string;
  views: number;
  category: {
    id: number;
    name_tm: string;
    name_en: string;
    name_ru: string;
    name_tr: string;
  };
}