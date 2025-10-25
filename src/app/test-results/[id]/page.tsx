'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTestStore } from '@/store/testStore';
import { postSubmitTest } from '@/api/post';
import { Button, Title, Modal, Center } from '@mantine/core';
import { useLang } from '@/hooks/useLang';

export default function ResultPage() {
  const { id } = useParams();
  const userTestId = id as string;
  const router = useRouter();
  const { t } = useLang();

  const {
    questions,
    answers,
    reset,
  } = useTestStore();

  const [result, setResult] = useState<SubmitResponse | null>(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [correctMap, setCorrectMap] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const submitAnswers = async () => {
      try {
        const preparedAnswers = Object.entries(answers).map(([questionId, selected_answer]) => ({
          question_id: Number(questionId),
          selected_answer,
        }));

        const res = await postSubmitTest(userTestId, preparedAnswers);
        setResult(res);

        if (res.correct_answers_map) {
          setCorrectMap(res.correct_answers_map);
        }

        reset(); // clear store after submitting
        setLoading(false);
      } catch (error) {
        console.error('Netijäni ugratmak başartmady:', error);
        setLoading(false);
      }
    };

    if (questions.length) {
      submitAnswers();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <Center style={{ height: '20vh' }}>
        <div className="loader" />
      </Center>
    )
  }

  if (!result) {
    return (
      <div className="pages text-sm my-4 text-gray-600">
        {t.test_result_error}
      </div>
    );
  }

  return (
    <div className="mt-4 mb-12 max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded shadow p-6 mx-4">
        <Title order={2} className="text-center text-iprimary dark:text-white">
          {t.resultTest}
        </Title>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center 
                     text-lg text-gray-800 dark:text-gray-100 mt-6">
          <div className="bg-indigo-50 dark:bg-indigo-900 p-4 rounded">
            <p className="font-medium">{t.total_questionss}</p>
            <p className="text-xl font-bold">{result.total_questions}</p>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded">
            <p className="font-medium">{t.answered_questions}</p>
            <p className="text-xl font-bold">{result.answered_questions}</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900 p-4 rounded">
            <p className="font-medium">{t.correct_answers}</p>
            <p className="text-xl font-bold">{result.correct_answers}</p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded">
            <p className="font-medium">{t.score_percent}</p>
            <p className="text-xl font-bold">{result.score_percent}%</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Button
            variant="outline"
            color="blue"
            onClick={() => router.push('/test')}
          >
            {t.retry}
          </Button>
          {/* <Button
            color="green"
            onClick={() => setShowAnswers(true)}
          >
            {t.show_answers}
          </Button> */}
          <Button
            variant="outline"
            color="red"
            onClick={() => router.push('/')}
          >
            {t.close}
          </Button>
        </div>
      </div>

      <Modal
        opened={showAnswers}
        onClose={() => setShowAnswers(false)}
        title={t.given_answer}
        centered
        size="lg"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        transitionProps={{
          transition: 'fade',
          duration: 300,
          timingFunction: 'ease',
        }}
        classNames={{
          content: 'dark:bg-gray-800 ',
          header: 'dark:bg-gray-600 m-2',
          body: '',
        }}
      >
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          {questions.map((q) => {
            const selected = answers[q.id];
            const correct = correctMap[q.id];
            const isCorrect = selected === correct;

            return (
              <div
                key={q.id}
                className={`p-4 rounded-xl border-2 transition-all ${isCorrect
                    ? 'border-green-500 bg-green-50 text-green-900 dark:bg-green-900 dark:text-white'
                    : 'border-red-500 bg-red-50 text-red-900 dark:bg-red-900 dark:text-white'
                  }`}
              >
                <p className="font-semibold mb-2">{q.text}</p>
                <p>
                  {t.selected_answer}: <b>{selected || t.not_selected}</b>{' '}
                  {!isCorrect && correct && (
                    <span>
                      | {t.correct_answers}: <b>{correct}</b>
                    </span>
                  )}
                </p>
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );

}
