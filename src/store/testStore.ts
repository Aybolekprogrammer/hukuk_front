// store/testStore.ts
import { create } from 'zustand';

type Question = {
  id: number;
  text: string;
  answer_a: string;
  answer_b: string;
  answer_c: string;
  answer_d: string;
};

type Store = {
  questions: Question[];
  answers: Record<number, string>;
  current: number;
  duration: number;
  setDuration: (d: number) => void;
  setQuestions: (q: Question[]) => void;
  answerQuestion: (id: number, val: string) => void;
  next: () => void;
  reset: () => void;
};

export const useTestStore = create<Store>((set) => ({
  questions: [],
  answers: {},
  current: 0,
  duration: 0,
  setDuration: (d) => set({ duration: d }),
  setQuestions: (q) => set({ questions: q }),
  answerQuestion: (id, val) =>
    set((state) => ({
      answers: { ...state.answers, [id]: val },
    })),
  next: () => set((state) => ({ current: state.current + 1 })),
  reset: () => set({ questions: [], answers: {}, current: 0 }),
}));
