import CorrectButton from "./CorrectButton.tsx";


interface AnswerProps {
  id: string;
  question_id: string;
  text: string;
  votes: number;
  is_correct: boolean;
};

export function Answer({ id, question_id, text, votes, is_correct = false  }: AnswerProps) {
  return (
    <div className="flex items-center border-l border-r border-t border-gray-200 p-6 first:rounded-t-md last:rounded-b-md last:border-b">
      <div className="mr-2 rounded-xl bg-emerald-100 px-2 text-sm text-emerald-700">
        {votes}
      </div>
      <p className="text w-full text-left font-semibold">{text}</p>
      <CorrectButton questionId={question_id} answerId={id} isCorrectAnswer={is_correct} />
    </div>
  );
}
