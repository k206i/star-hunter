import { customEvents } from '../../config';
import { TAppState, TCustomEvents } from '../../app';

interface IAppClass {
  stateListeners: {
    callback: ( appState: {}) => void,
  }[]; // элементы, которые слушают изменения состояния приложения
  customEventsListeners: HTMLElement[];
  customEventsArray: Event[];
  state: TAppState,
  _initEvents: () => void;
  _dispatchCustomMouseEvents: ( ev: MouseEvent ) => void;
  dispatchCustomEvent: ( customEventName: TCustomEvents ) => void;
  setState: ( setObject: TAppState, callback?: () => void ) => void;
}

const REFRESH_APP_EVENT: TCustomEvents = 'app:refresh';

class AppClass implements IAppClass {
  private privateState = {};
  state: TAppState = {
    currentScore: 0,
  };
  stateListeners: {
    callback: ( appState: {}) => void,
  }[] = [];
  customEventsListeners: HTMLElement[] = [];
  customEventsArray: Event[] = [];

  constructor() {
    Object.defineProperty( this, 'state', {
      get: () => {
        return this.privateState;
      },
      configurable: false,
    });

    for ( let key in customEvents ) {
      this.customEventsArray.push( new Event( customEvents[ key ], { bubbles: true }));
    }

    this._initEvents();
  }

  setState( setObject: TAppState, callback?: () => void ) {
    for ( let key in setObject ) {
      if ( setObject.hasOwnProperty( key )) {
        this.privateState[ key ] = setObject[ key ];
      }
    }

    callback && callback();

    this.stateListeners.forEach( stateListener => {
      stateListener.callback && typeof stateListener.callback === 'function'
        ? stateListener.callback( this.state )
        : console.warn( 'Can not find appropriate callback function in App.ts');
    });

    this.dispatchCustomEvent( REFRESH_APP_EVENT );
  }

  _initEvents() {
    window.addEventListener( 'click', ( ev: MouseEvent ) => {
      this._dispatchCustomMouseEvents( ev );
    });
  }

  dispatchCustomEvent( customEventName: TCustomEvents ) {
    const customEvent: Event = new Event( customEventName, { bubbles: true });
    window.dispatchEvent( customEvent );
  }

  _dispatchCustomMouseEvents( ev: MouseEvent ) {
    this.customEventsListeners.forEach( node => {
      let isOwnEvent: boolean = false; // проверяю, вывзал ли клик сам элемент. Если да, то на нём самом не запускается custom event
      let nodeParent: HTMLElement = ( ev.target as HTMLElement );

      while( nodeParent && nodeParent.nodeName.toLowerCase() !== 'body') {
        if ( nodeParent === node ) {
          isOwnEvent = true;
          break;
        } else {
          nodeParent = ( nodeParent.parentNode as HTMLElement );
        }
      }

      if ( !isOwnEvent ) {
        this.customEventsArray.forEach( customEvent => {
          node.dispatchEvent( customEvent );
        });
      }
    });
  }
}

const App = new AppClass();

export default App;
