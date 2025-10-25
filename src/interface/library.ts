interface LibraryItem {
    id: number;
    title_tm: string;
    title_en: string;
    title_ru: string;
    title_tr: string;
    file_tm: string;
    file_en: string;
    file_ru: string;
    file_tr: string;
    photo: string;
    views: number;
    about_tm: string,
    about_en: string,
    about_ru: string,
    about_tr: string,
    category: {
      id: number;
      name_tm: string;
      name_en: string;
      name_ru: string;
      name_tr: string;
    };
    author: {
      id: number;
      name: string;
    };
  }
  