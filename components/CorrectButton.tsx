'use client';

import { setCorrectAnswer } from "@/lib/actions";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useOptimistic, useEffect, useState } from "react";

interface CorrectButtonProps {
  questionId: string;
  answerId: string;
  isCorrectAnswer: boolean;
}

const CorrectButton = ({ questionId, answerId, isCorrectAnswer }: CorrectButtonProps) => {
  const [persistedCorrect, setPersistedCorrect] = useState(isCorrectAnswer);

  useEffect(() => {
    setPersistedCorrect(isCorrectAnswer);
  }, [isCorrectAnswer]);

  const handleSetCorrect = async (formData: FormData) => {
    setPersistedCorrect(true);
    await setCorrectAnswer(formData);
  };

  return (
    <form action={handleSetCorrect}>
      <input type="hidden" name="question_id" value={questionId} />
      <input type="hidden" name="answer_id" value={answerId} />
      <button
        type="submit"
        className={`h-8 w-8 min-w-[2rem] rounded-full transition-colors
          ${persistedCorrect 
            ? "bg-emerald-500 text-white ring-2" 
            : "text-gray-500 hover:text-emerald-500 active:bg-emerald-500"
          }`}
          disabled={persistedCorrect}
      >
        <CheckIcon className="h-5 w-5 mx-auto" />
      </button>
    </form>
  );
};

export default CorrectButton;
