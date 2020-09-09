import { QuestionsActions, QuestionsActionTypes } from './questions.reducer.actions';
import { Question } from 'src/app/models';

export interface QuestionsState {
  questions: Question[];
  currentIndex: number;
}

const initialState: QuestionsState = {
  questions: [],
  currentIndex: 0
};

export function reducer(state: QuestionsState = initialState, action: QuestionsActions) {
  let newState;
  switch (action.type) {
    case QuestionsActionTypes.CLEAR:
      return initialState;
    case QuestionsActionTypes.SET_QUESTIONS:
      newState = Object.assign({}, state);
      newState.questions = Object.assign([], action.questions);
      return newState;
    case QuestionsActionTypes.SET_CURRENT_INDEX: {
      newState = Object.assign({}, state);
      newState.currentIndex = action.index;
      return newState;
    }
    case QuestionsActionTypes.SET_ANSWER: {
      newState = JSON.parse(JSON.stringify(state));
      newState.questions[state.currentIndex].options.map(opt => (opt.selected = false));
      newState.questions[state.currentIndex].options[action.optionIndex].selected = true;
      return newState;
    }
    case QuestionsActionTypes.NEXT_QUESTION: {
      newState = Object.assign({}, state);
      newState.currentIndex++;
      return newState;
    }
    default:
      return state;
  }
}
