import '../ui/styles/index.scss';
import Phaser from 'phaser';
import Level from './scenes/Level';
import Preload from './scenes/Preload';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../ui/utils/firebase';
import preloadAssetPackUrl from '../static/assets/preload-asset-pack.json';
import App from '../ui/utils/App/app';
import {appCssClasses, gameVars} from '../ui/config';
import { TScoreItem } from '../ui/app';
import ScoreCounter from '../ui/utils/score-counter';
import HighScores from '../ui/utils/high-scores';
import SaveScore from '../ui/utils/save-score';
import ToggleClass from '../ui/utils/toggle-class';

(async () => {
	const scoresArray = [];
	const querySnapshot = await getDocs(collection(db, 'scores'));

	querySnapshot.forEach((doc) => {
		scoresArray.push({
			'name': doc.data().name,
			'value': doc.data().value,
		} as TScoreItem);
	});

	new HighScores( document.querySelector('.js-high-scores'), scoresArray );
})();

// UI boot
// Main application with state manager, custom events and state listeners
App.setState({
	currentScore: 0,
});

// Score counter init
new ScoreCounter();
let gameEngine = null;

// Save user score init
new SaveScore();

// Init toggle css classes
const toggleClass = new ToggleClass();
toggleClass.init();

const startGame = () => {
	gameEngine = new Phaser.Game({
		width: gameVars.canvasBaseWidth,
		height: gameVars.canvasBaseWidth / gameVars.canvasAspect,
		parent: 'gameContent',
		backgroundColor: '#2f2f2f',
		scale: {
			mode: Phaser.Scale.ScaleModes.FIT,
			autoCenter: Phaser.Scale.Center.CENTER_BOTH
		},
		physics: {
			default: 'arcade',
			arcade: {
				// debug: true,
				gravity: {
					y: 300
				}
			}
		},
		scene: [Boot, Preload, Level]
	});

	gameEngine.scene.start('Boot');
}

const resetGame = () => {
	window.location.reload();
}


// Phaser boot
class Boot extends Phaser.Scene {

    constructor() {
        super('Boot');
    }

    preload() {
        this.load.pack('pack', preloadAssetPackUrl);
    }

    create() {
       this.scene.start('Preload');
    }
}

window.addEventListener('load', function () {
	//startGame();

	document.getElementById('startButton')?.addEventListener('click', function () {
		document.body.classList.add( appCssClasses.isGameStarted );
		startGame();
	});

	document.getElementById('resetButton')?.addEventListener('click', function () {
		resetGame();
	});

});
