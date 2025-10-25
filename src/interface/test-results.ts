type SubmitResponse = {
  total_questions: number;
  answered_questions: number;
  correct_answers: number;
  score_percent: number;
  correct_answers_map?: Record<number, string>;
};
