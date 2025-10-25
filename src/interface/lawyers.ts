interface LawyersItem {
    id: number;
    name: string;
    age: string;
    origin: 'national' | 'foreign';
    experience: number;
    photo: string;
    about_tm?: string;
    about_en?: string;
    about_ru?: string;
    about_tr?: string;
    email: string,
    phone: number,
}