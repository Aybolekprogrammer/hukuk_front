export interface TestQuestion {
  id: number;
  text: string;
  answer_a: string;
  answer_b: string;
  answer_c: string;
  answer_d: string;
  photo?: string | null;  
}