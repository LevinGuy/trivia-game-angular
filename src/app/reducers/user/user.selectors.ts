import { GameState } from '..';

export const getUserLives = (state: GameState) => state.user.lives;
export const getUserName = (state: GameState) => state.user.name;
