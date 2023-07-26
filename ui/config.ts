export const appCssClasses = {
  scoreNode: 'js-score-node',
  saveScore: 'js-save-score',
  toggleCssClass: 'js-toggle-class',
  isGameStarted: 'is-game-started',
  isFreeze: 'is-freeze',
  isActive: 'is-active',
  isLoaded: 'is-loaded',
  isLoading: 'is-loading',
  isVisible: 'is-visible',
  isHidden: 'is-hidden',
  isDisabled: 'is-disabled',
};

export const appIds = {
  userNameInput: 'userName',
}

export const localStorageKeys = {
  userName: 'userName',
}

export const dbNames = {
  scores: 'scores',
}

export const customEvents = { // :TCustomEvents Которые запускаются при любом клике мышки
  closeDropdown: 'close:dropdown',
};

export const buttonNames = {
  ArrowUp: 'ArrowUp',
  ArrowDown: 'ArrowDown',
  ArrowLeft: 'ArrowLeft',
  ArrowRight: 'ArrowRight',
  Enter: 'Enter',
  Escape: 'Escape',
};

export const gameVars = {
  canvasBaseWidth: 1280,  // Совпадает со значением в
  canvasAspect: 1.78,     // ui/styles/constants.scss
  highScoresCount: 10, // Сколько выводить игроков в таблице рекордов
  defaultVelocityValue: 160,
  jumpVelocityValue: 330,
  flashVelocityValue: 1000,
  flashVelocityCoolDown: 3000, // ms
  flashVelocityTimeout: 150, // ms
}
