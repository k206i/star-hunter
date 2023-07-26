import App from './App/app';
import {appCssClasses} from '../config';
import {TCustomEvents} from '../app';

interface IScoreCounter {
  state: {
    currentScore: number,
  },
  scoreNodes: HTMLElement[],
  _initEvents: () => void,
  _initNodes: () => void,
  _updateMarkup: () => void,
}

export default class ScoreCounter implements IScoreCounter {
  state = {
    currentScore: 0,
  }
  scoreNodes = [];

  constructor() {
    this._initEvents();
  }

  _initEvents() {
    const refreshAppEvent: TCustomEvents = 'app:refresh';

    window.addEventListener( refreshAppEvent, () => {
      this.state.currentScore = App.state.currentScore;
      this._initNodes();
      this._updateMarkup();
    });
  }

  _initNodes() {
    this.scoreNodes = [
      ...document.querySelectorAll( '.' + appCssClasses.scoreNode )
    ];
  }

  _updateMarkup() {
    this.scoreNodes.forEach(( scoreNode: HTMLElement ) => {
      scoreNode.innerHTML = this.state.currentScore.toString();
    });
  }
}
