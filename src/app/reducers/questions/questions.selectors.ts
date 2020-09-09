import { GameState } from '..';

export const getQuestions = (state: GameState) => state.questions.questions;
export const getCurrentQuestionIndex = (state: GameState) => state.questions.currentIndex;
export const getCurrentQuestion = (state: GameState) => state.questions.questions[state.questions.currentIndex];
export const hasMoreQuestions = (state: GameState) => state.questions.questions.length > state.questions.currentIndex + 1;

