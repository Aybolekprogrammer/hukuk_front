import axiosInstance from './axiosInstance';
import axiosAuthInstance from './axiosAuthInstance';

// news
export async function getNews() {
  const res = await axiosInstance.get('/news/');
  return res.data;
}
export async function getNewsById(id: string) {
  const res = await axiosInstance.get(`/news/${id}`);
  return res.data;
}

// about
export async function getAbout() {
  const res = await axiosInstance.get('/about/');
  return res.data;
}

// articles
export async function getArticle() {
  const res = await axiosInstance.get('/articles/');
  return res.data;
}
export async function getArticleById(id: string) {
  const res = await axiosInstance.get(`/articles/${id}`);
  return res.data;
}

// library
export async function getLibrary() {
  const res = await axiosInstance.get('/library/');
  return res.data;
}
export async function getLibraryById(id: string) {
  const res = await axiosInstance.get(`/library/${id}`);
  return res.data;
}
export async function getLibraryWithParams(params: {
  search?: string;
  author?: string;
  category?: string;
}) {
  const query = new URLSearchParams();

  if (params.search) query.append('search', params.search);
  if (params.author) query.append('author', params.author);
  if (params.category) query.append('category', params.category);

  const res = await axiosInstance.get(`/library/?${query.toString()}`);
  return res.data;
}

// scientific-works
export async function getScientificWorks() {
  const res = await axiosInstance.get('/library/?category=1');
  return res.data;
}

export async function getScientificLibraryWithParams(params: {
  search?: string;
  author?: string;
}) {
  const query = new URLSearchParams();

  query.append('category', '1'); // diňe ylmy işler üçin

  if (params.search) query.append('search', params.search);
  if (params.author) query.append('author', params.author);

  const res = await axiosInstance.get(`/library/?${query.toString()}`);
  return res.data;
}

// lawyers
export async function getLawyers() {
  const res = await axiosInstance.get('/lawyers/');
  return res.data;
}
export async function getLawyersById(id: string) {
  const res = await axiosInstance.get(`/lawyers/${id}`);
  return res.data;
}
export async function getLawyersFiltered(params: {
  origin?: 'national' | 'foreign';
  search?: string;
}) {
  const query = new URLSearchParams();
  if (params.origin) query.append('origin', params.origin);
  if (params.search) query.append('search', params.search);

  const res = await axiosInstance.get(`/lawyers/?${query.toString()}`);
  return res.data;
}

// law-science
export async function getLawScience() {
  const res = await axiosInstance.get('/law-science/');
  return res.data;
}
export async function getLawScienceById(id: string) {
  const res = await axiosInstance.get(`/law-science/${id}`);
  return res.data;
}

export async function getLawScienceWithParams(params: {
  category?: string;
  search?: string;
}) {
  const query = new URLSearchParams();
  if (params.category) query.append('category', params.category);
  if (params.search) query.append('search', params.search);

  const res = await axiosInstance.get(`/law-science/?${query.toString()}`);
  return res.data;
}

export async function getLawScienceCategories() {
  const res = await axiosInstance.get('/law-science-categories/');
  return res.data;
}

// notifications
export async function getAnnouncement() {
  const res = await axiosInstance.get('/notifications/');
  return res.data;
}
export async function getAnnouncementById(id: string) {
  const res = await axiosInstance.get(`/notifications/${id}`);
  return res.data;
}

// faqs
export async function getFaq() {
  const res = await axiosInstance.get('/faqs/');
  return res.data;
}

// faqs
export async function getUserAgreement() {
  const res = await axiosInstance.get('/latest/');
  return res.data;
}

// tests
export async function getTestCategories() {
  const res = await axiosAuthInstance.get('/tests/');
  return res.data;
}

// test questions
export async function getTestQuestions(id: string) {
  const res = await axiosAuthInstance.get(`/user-tests/${id}/questions/`);
  return res.data;
}