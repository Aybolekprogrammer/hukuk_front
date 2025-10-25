'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getTestQuestions } from '@/api/get';
import { useTestStore } from '@/store/testStore';
import { Button, Center, Radio, Title } from '@mantine/core';
import Image from 'next/image';
import SlideInLeft from '@/component/Sliders/slideInLeft';
import SlideInRight from '@/component/Sliders/slideInRight';
import { useLang } from '@/hooks/useLang';
import { TestQuestion } from '@/interface/test-questions';


export default function TestPage() {
  const { id } = useParams();
  const testId = id as string;
  const router = useRouter();
  const { t } = useLang();

  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [timerStarted, setTimerStarted] = useState(false);

  const {
    questions,
    setQuestions,
    current,
    answers,
    answerQuestion,
    next,
    duration,
  } = useTestStore() as {
    questions: TestQuestion[];
    setQuestions: (q: TestQuestion[]) => void;
    current: number;
    answers: Record<number, string>;
    answerQuestion: (id: number, a: string) => void;
    next: () => void;
    duration: number;
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getTestQuestions(testId);
        setQuestions(res);
        console.log(res);


        if (res.length > 0 && !timerStarted && duration > 0) {
          const durationSeconds = duration * 60;
          setTimeLeft(durationSeconds);
          setTimerStarted(true);
        }
      } catch (error) {
        console.error('Soraglary alyp bolmady:', error);
      }
    };

    fetch();
  }, [testId]);

  useEffect(() => {
    if (timeLeft === 0) {
      router.push(`/test-results/${testId}`);
      return;
    }

    if (timeLeft === null) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev! > 0 ? prev! - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  if (!questions.length || timeLeft === null) {
    return (
      <Center style={{ height: '20vh' }}>
        <div className="loader" />
      </Center>
    );
  }

  const q = questions[current];

  const handleNext = () => {
    if (current + 1 < questions.length) {
      next();
    } else {
      router.push(`/test-results/${testId}`);
    }
  };

  return (
    <div className="mt-4 mb-12 pages">
      <div className="flex flex-col md:flex-row gap-4 md:gap-12">

        <div className="md:w-1/3 w-full flex justify-center items-start">
          <SlideInLeft><Image
            src={q.photo ?? '/placeholder.png'}
            alt="Test image"
            width={500}
            height={300}
            className="rounded object-contain w-full"
          />
          </SlideInLeft>  </div>

        <div className="md:w-2/3 w-full">
          <SlideInRight>
            <div className="flex justify-between items-center">
              <Title order={3} className="text-xl font-bold text-primary">
                {t.question}: {current + 1}/{questions.length}
              </Title>
              <div className="text-red-600 font-semibold text-md">
                {t.time}: {Math.floor(timeLeft / 60)}:
                {(timeLeft % 60).toString().padStart(2, '0')}
              </div>
            </div>

            <p className="mt-8 mb-6">{q.text} </p>

            <Radio.Group
              value={answers[q.id] || ''}
              onChange={(val) => answerQuestion(q.id, val)}
            >
              {[
                { value: 'A', label: q.answer_a },
                { value: 'B', label: q.answer_b },
                { value: 'C', label: q.answer_c },
                { value: 'D', label: q.answer_d },
              ]?.map(({ value, label }) => (
                <div
                  key={value}
                  onClick={() => answerQuestion(q.id, value)}
                  className={`flex items-center cursor-pointer rounded-lg px-4 py-3 
                           transition-all  mb-3 ${answers[q.id] === value
                      ? 'bg-indigo-50 dark:bg-indigo-700 text-indigo-700 dark:text-white'
                      : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'}
      `}
                >
                  <div className='w-[10%] md:w-max'>
                    <div className="w-5 h-5 mr-3 rounded-full border-2 flex 
                                  items-center justify-center transition-all
                                  ${
                                    answers[q.id] === value
                                      ? 'border-indigo-600 bg-indigo-600'
                                      : 'border-gray-400'
                                  }"
                    >
                      {answers[q.id] === value && (
                        <div className="w-2.5 h-2.5 bg-primary rounded-full" />
                      )}
                    </div>
                  </div>

                  <span className="text-sm">{label}</span>
                </div>
              ))}
            </Radio.Group>

            <div className="mt-6 text-right">
              <button
                onClick={handleNext}
                className="rounded px-3 py-1.5 text-white 
                           bg-primary hover:opacity-90"
              >
                {current + 1 === questions.length ? t.show_answers : t.next}
              </button>
            </div>
          </SlideInRight>
        </div>
      </div>
    </div>
  );
}
