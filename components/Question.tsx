import VoteButton from "./VoteButton";


type QuestionProps = {
  id: string;
  text: string;
  votes: number;
  correct_answer_id?: string;
};

export function Question({ id, text, votes, correct_answer_id }: QuestionProps) {
  const isAnswered = correct_answer_id !== undefined;

  return (
    <div className={`flex items-center border-l border-r border-t border-atlas-white-300 p-6 first:rounded-t-md last:rounded-b-md last:border-b
    ${isAnswered ? 'bg-green-50' : ''}`}>
      <div className="mr-2 rounded-xl bg-secondary px-2 text-sm text-white">
        {votes}
      </div>
      <p className="text w-full text-left font-semibold">{text}</p>
      <VoteButton id={id} />
    </div>
  );
}
