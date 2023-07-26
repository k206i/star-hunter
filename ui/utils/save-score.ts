import App from './App/app';
import { appIds, localStorageKeys, dbNames, appCssClasses } from '../config';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';
import { TCustomEvents } from '../app';

interface ISaveScore {
  state: {
    userName: string,
    userScore: number,
  }
  _initState: () => void,
  _initNodes: () => void,
  _initEvents: () => void,
  _saveScore: () => void,
  _resetGame: () => void,
  _showNicknameInput: () => void,
  rootNode: HTMLElement,
  userNameInputNode: HTMLInputElement,
  saveButtonNode: HTMLElement,
  closeButtonNode: HTMLElement,
}

const CSS_CLASSES = {
  rootNode: appCssClasses.saveScore,
  saveButtonNode: appCssClasses.saveScore + '__button',
  closeButtonNode: appCssClasses.saveScore + '__close',
}


export default class SaveScore implements ISaveScore {
  state = {
    userName: '',
    userScore: 0,
  };
  userNameInputNode: HTMLInputElement = null;
  saveButtonNode: HTMLElement = null;
  closeButtonNode: HTMLElement = null;
  rootNode: HTMLElement = null;

  constructor() {
    this._initState();
    this._initNodes();
    this._initEvents();
  }

  _initNodes() {
    this.rootNode = document.querySelector( '.' + CSS_CLASSES.rootNode );
    this.userNameInputNode = document.getElementById( appIds.userNameInput ) as HTMLInputElement;
    this.saveButtonNode = document.querySelector( '.' + CSS_CLASSES.saveButtonNode );
    this.closeButtonNode = document.querySelector( '.' + CSS_CLASSES.closeButtonNode );

    if ( !this.userNameInputNode ) {
      return false;
    }

    if ( this.state.userName.length ) {
      this.userNameInputNode.value = this.state.userName;
    }
  }

  _initEvents() {
    const refreshAppEvent: TCustomEvents = 'app:refresh';
    const gameOverEvent: TCustomEvents = 'game:over';

    this.userNameInputNode.addEventListener( 'input', ( ev:Event ) => {
      const currentInput: HTMLInputElement = ev.target as HTMLInputElement;

      this.state.userName = currentInput.value;
      localStorage.setItem( localStorageKeys.userName, currentInput.value );
    });

    this.saveButtonNode.addEventListener( 'click', () => {
      this._saveScore();
      this.saveButtonNode.classList.add( appCssClasses.isDisabled );
    });

    this.closeButtonNode.addEventListener( 'click', () => {
      this._resetGame();
    });

    window.addEventListener( gameOverEvent, () => {
      this._showNicknameInput();
    });

    window.addEventListener( refreshAppEvent, () => {
      this.state.userScore = App.state.currentScore;
    });
  }

  _initState() {
    const localStorageName = localStorage.getItem( localStorageKeys.userName );

    this.state.userScore = App.state.currentScore;

    if ( localStorageName ) {
      this.state.userName = localStorageName;
    }
  }

  _showNicknameInput() {
    this.rootNode.classList.add( appCssClasses.isVisible );
  }

  async _saveScore() {
    if ( this.state.userName.length > 0 ) {
      try {
        const docRef = await addDoc( collection( db, dbNames.scores ), {
          name: this.state.userName,
          value: this.state.userScore,
        });
        this._resetGame();

      } catch (e) {
        console.error('Error adding document: ', e);
      }
    } else {
      this._resetGame();
    }
  }

  _resetGame() {
    window.location.reload();
  }
}
