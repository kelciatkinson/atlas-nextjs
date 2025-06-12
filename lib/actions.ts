"use server";

import { revalidatePath } from "next/cache";
import { insertTopic } from "./data";
import { redirect } from "next/navigation";
import { insertQuestion } from "./data";
import { incrementVotes, insertAnswer, updateCorrectAnswer } from "./data";

export async function addTopic(data: FormData) {
  let topic;
  try {
    topic = await insertTopic({
      title: data.get("title") as string,
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add topic.");
  } finally {
    revalidatePath("/ui/topics/[id]", "page");
    topic && redirect(`/ui/topics/${topic.id}`);
  }
}

export async function addQuestion(question: FormData) {
  try {
    insertQuestion({
      title: question.get("title") as string,
      topic_id: question.get("topic_id") as string,
      votes: 0,
    });
    revalidatePath("/ui/topics/[id]", "page");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add question.");
  }
}

export async function addAnswer(formData: FormData) {
  try {
    const id = formData.get("question_id");
    const answer = formData.get("answer");
    if (!id || typeof id !== 'string') {
      throw new Error('Question ID is required');
    }
    if (!answer || typeof answer !== 'string') {
      throw new Error('Answer text is required');
    }
    await insertAnswer({
      id: id,
      answer: answer
    });
    revalidatePath("/ui/questions/[id]", "page");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add answer.");
  }
}

export async function addVote(data: FormData) {
  try {
    incrementVotes(data.get("id") as string);
    revalidatePath("/ui/topics/[id]", "page");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add vote.");
  }
}

export async function setCorrectAnswer(formData: FormData) {
  try {
    const questionId = formData.get("question_id");
    const answerId = formData.get("answer_id");
    
    console.log('Received form data:', { questionId, answerId });
    
    if (!questionId || typeof questionId !== 'string') {
      throw new Error('Question ID is required');
    }
    if (!answerId || typeof answerId !== 'string') {
      throw new Error('Answer ID is required');
    }

    const result = await updateCorrectAnswer(questionId, answerId);
    console.log('Update result:', result);
    
    revalidatePath("/ui/questions/[id]", "page");
  } catch (error) {
    console.error("Detailed Error:", error);
    throw error;
  }
}
