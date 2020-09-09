import { GameState } from '..';

export const getGameStatus = (state: GameState) => state.gameStatus.status;
export const getGameScore = (state: GameState) => state.gameStatus.score;
