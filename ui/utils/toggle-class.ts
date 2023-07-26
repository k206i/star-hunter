import { appCssClasses, customEvents } from '../config';
import App from './App/app';

interface IToggleClass {
  init: () => void,
  parentNodesArray: HTMLElement[],
  _initEvents: () => void,
  _initNodes: () => void,
  _toggleCssClass: ( node: HTMLElement, isRemoveClass?: boolean ) => void,
}

type TEvents = 'click' | 'mouseenter';

// Используемые datasets в разметке
type TDataset = {
  toggleClass: 'data-toggle-class', // имя css класса для переключения
  toggleTargetId: 'data-toggle-target-id', // переключать класс у целевого блока
  bodyBlock: 'data-body-block', // есть ли необходимость добавлять специальный класс body, когда присутствует целевой css класс
  toggleOnMouseenter: 'data-toggle-on-mouseenter', // менять класс по mouseenter, всесто того, чтобы его менять по click
  toggleOnce: 'data-toggle-once', // поменять класс один раз
  toggleClosestTarget: 'data-toggle-closest-target', // поменять класс у ближайшего querySelector "class-name" (без точки)
  toggleOuterClickRemove: 'data-toggle-outer-click-remove', // убрать класс, если случился outer click
}

const PARENT_NODE_CSS_CLASS = appCssClasses.toggleCssClass;

export default class ToggleClass implements IToggleClass {
  parentNodesArray: HTMLElement[] = [];

  _initNodes() {
    this.parentNodesArray =
      Array.from( document.querySelectorAll( '.' + PARENT_NODE_CSS_CLASS));
  }

  _initEvents() {
    this.parentNodesArray.forEach( node => {
      const userEvent: TEvents =
        typeof node.dataset.toggleOnMouseenter !== 'undefined'
          ? 'mouseenter'
          : 'click';
      const isOuterClickRemove: boolean =
        typeof node.dataset.toggleOuterClickRemove !== 'undefined';

      const eventFunction = () => {
        const isToggleOnce: boolean = typeof node.dataset.toggleOnce !== 'undefined';

        if ( isToggleOnce ) {
          node.removeEventListener( userEvent, eventFunction );
        }

        this._toggleCssClass( node );
      };

      if ( isOuterClickRemove ) {
        App.customEventsListeners.push( node );
        node.addEventListener( customEvents.closeDropdown, () => {
          this._toggleCssClass( node, true );
        });
      }

      node.addEventListener( userEvent, eventFunction );
    });
  }

  _toggleCssClass( node: HTMLElement, isRemoveClass?: boolean ) {
    const cssClassToToggle: string | undefined =
      node.dataset.toggleClass;
    const isBodyBlock: boolean =
      typeof node.dataset.bodyBlock !== 'undefined';
    const targetNode: HTMLElement | undefined =
      document.getElementById( node.dataset.toggleTargetId );
    const closestTargetNode: HTMLElement | undefined =
      node.closest( '.' + node.dataset.toggleClosestTarget );
    let isContainsTargetClass: boolean = null;

    if ( cssClassToToggle ) {
      if ( targetNode ) {
        isRemoveClass
          ? targetNode.classList.remove( cssClassToToggle )
          : targetNode.classList.toggle( cssClassToToggle );
      }

      if ( closestTargetNode ) {
        isRemoveClass
          ? closestTargetNode.classList.remove( cssClassToToggle )
          : closestTargetNode.classList.toggle( cssClassToToggle );
      }

      if ( !targetNode && !closestTargetNode ) {
        isRemoveClass
          ? node.classList.remove( cssClassToToggle )
          : node.classList.toggle( cssClassToToggle );
      }

      isContainsTargetClass = (targetNode && targetNode.classList.contains( cssClassToToggle ))
        || (closestTargetNode && closestTargetNode.classList.contains( cssClassToToggle ))
        || node.classList.contains( cssClassToToggle );

      if ( isBodyBlock ) {
        isContainsTargetClass
          ? document.body.classList.add( appCssClasses.isFreeze )
          : document.body.classList.remove( appCssClasses.isFreeze );
      }

    } else {
      console.warn( 'ToggleCssClass: No css class to toggle');
    }
  }

  init() {
    this._initNodes();
    this._initEvents();
  }
}
