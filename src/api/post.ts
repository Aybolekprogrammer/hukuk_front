import axiosInstance from './axiosInstance';
import axiosAuthInstance from './axiosAuthInstance';

// feedback
export async function postFeedback(data: { email: string; text: string }) {
  const res = await axiosInstance.post('/feedback/', data);
  return res.data;
}

// register
export async function postRegister(data: {
  username: string;
  email: string;
  password: string;
  accepted_terms: boolean,
}) {
  const res = await axiosInstance.post('/register/', data);
  return res.data;
}

// login
export async function postLogin(data: {
  username: string;
  password: string;
}) {
  const res = await axiosInstance.post('/login/', data);
  return res.data;
}

// forgot
export async function postForgotPassword(data: {
  email: string;
}) {
  const res = await axiosInstance.post('/auth/password-reset/', data);
  return res.data;
}


// reset
export async function postResetPassword(data: {
  uid: string;
  token: string;
  password: string;
}) {
  const res = await axiosInstance.post('/auth/password-reset-confirm/', data);
  return res.data;
}

//  test id for get questions
export async function postStartTest(data: { test: number }) {
  const res = await axiosAuthInstance.post('/user-tests/', data);
  return res.data;
}


// submit answers for a test
export async function postSubmitTest(userTestId: number | string, answers: { question_id: number; selected_answer: string }[]) {
  const res = await axiosAuthInstance.post(`/user-tests/${userTestId}/submit/`, {
    answers,
  });
  return res.data;
}
