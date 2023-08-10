import {TCustomEvents, TScoreItem} from "../app";
import {appCssClasses, gameVars} from '../config';


interface IHighScores {
  _initNodes: () => void,
  _initEvents: () => void,
  _renderTable: () => void,
  _sortItems: () => void,
  rootNode: HTMLElement,
  userScores: TScoreItem[],
  scoreListTemplate: HTMLElement,
  scoreItemTemplate: string,
}

export default class HighScores implements IHighScores {
  scoreListTemplate: HTMLElement = document.createElement( 'ul' );
  scoreItemTemplate: string = `
    <li class="high-scores__item">
    </li>
  `;
  constructor( public rootNode: HTMLElement, public userScores: TScoreItem[]) {
    this._initNodes();
    this._initEvents();
    this._renderTable();
  }

  _initNodes() {
    this.scoreListTemplate = document.createElement( 'ul' );
    this.scoreListTemplate.classList.add( 'high-scores__list' )
  }

  _initEvents() {
    // Placeholder
  }

  _sortItems() {
    this.userScores.sort(( a:TScoreItem, b:TScoreItem ) => a.value > b.value ? -1 : 1 );
  }

  _renderTable() {
    const highScoresCount =
      gameVars.highScoresCount <= this.userScores.length
        ? gameVars.highScoresCount
        : this.userScores.length;

    this._sortItems();

    for ( let i = 0; i < highScoresCount; i++ ) {
      const userItem = document.createElement( 'li' );

      userItem.classList.add( 'high-scores__item' );
      userItem.innerHTML = `
        <span class="high-scores__name">${ this.userScores[ i ].name }</span>
        <span>..........................</span>
        <span class="high-scores__value">${ this.userScores[ i ].value }</span>
      `;
      this.scoreListTemplate.appendChild( userItem );
    }

    this.rootNode.classList.remove( appCssClasses.isLoading );
    document.body.classList.add( appCssClasses.isLoaded );
    this.rootNode.appendChild( this.scoreListTemplate );
  }
}
