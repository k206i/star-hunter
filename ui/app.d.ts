declare global {
  interface Window {
  }
}

export type TAppState = {
  currentScore?: number,
  velocityValue?: number,
  isFlashVelocityAvailable?: boolean,
  userName?: string,
};

export type TMoveDirection = 'left' | 'right';
export type TMoveAction = 'move' | 'idle' | 'jump';

export type TCustomEvents = 'app:refresh' | 'game:over';

export type TScoreItem = {
  name: string,
  value: number,
}
