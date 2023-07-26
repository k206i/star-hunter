
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import PlayerPrefab from "./PlayerPrefab";
import starPrefab from "./starPrefab";
import platformPrefab from "./platformPrefab";
/* START-USER-IMPORTS */
import bombPrefab from "./bombPrefab";
import {
	ANIM_LEFT,
	ANIM_RIGHT,
	ANIM_FACELEFT,
	ANIM_FACERIGHT,
	ANIM_JUMPLEFT, ANIM_JUMPRIGHT
} from './animations';
import App from '../../ui/utils/App/app';
import { gameVars } from '../../ui/config';
import {TCustomEvents, TMoveAction, TMoveDirection} from '../../ui/app';
/* END-USER-IMPORTS */

export default class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		App.setState({
			isFlashVelocityAvailable: true,
			velocityValue: gameVars.defaultVelocityValue,
		});

		this.documentElement = document.documentElement;
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// leftKey
		const leftKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

		// rightKey
		const rightKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

		// upKey
		const upKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

		// spaceBar
		const spaceBar = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

		// sky
		const sky = this.add.image(640, 360, "sky");
		sky.scaleX = 1.6162429819166788;
		sky.scaleY = 1.2070412376520576;

		// player
		const player = new PlayerPrefab(this, 465, 233);
		this.add.existing(player);

		// starsLayer
		const starsLayer = this.add.layer();

		// star
		const star = new starPrefab(this, 38, -38.27272727272724);
		starsLayer.add(star);

		// star_1
		const star_1 = new starPrefab(this, 157.5424000886119, -38.27272727272724);
		starsLayer.add(star_1);

		// star_2
		const star_2 = new starPrefab(this, 277.0848001772238, -38.27272727272724);
		starsLayer.add(star_2);

		// star_3
		const star_3 = new starPrefab(this, 396.62720026583577, -38.27272727272724);
		starsLayer.add(star_3);

		// star_4
		const star_4 = new starPrefab(this, 516.1696003544477, -38.27272727272724);
		starsLayer.add(star_4);

		// star_5
		const star_5 = new starPrefab(this, 635.7120004430595, -38.27272727272724);
		starsLayer.add(star_5);

		// star_6
		const star_6 = new starPrefab(this, 755.2544005316714, -38.27272727272724);
		starsLayer.add(star_6);

		// star_7
		const star_7 = new starPrefab(this, 874.7968006202833, -38.27272727272724);
		starsLayer.add(star_7);

		// star_8
		const star_8 = new starPrefab(this, 994.3392007088952, -38.27272727272724);
		starsLayer.add(star_8);

		// star_9
		const star_9 = new starPrefab(this, 1113.8816007975072, -38.27272727272724);
		starsLayer.add(star_9);

		// star_10
		const star_10 = new starPrefab(this, 1233.424000886119, -38.27272727272724);
		starsLayer.add(star_10);

		// platformsLayer
		const platformsLayer = this.add.layer();

		// platform
		const platform = new platformPrefab(this, -6, 336);
		platformsLayer.add(platform);

		// platform_1
		const platform_1 = new platformPrefab(this, 690, 478);
		platformsLayer.add(platform_1);

		// platform_2
		const platform_2 = new platformPrefab(this, 904, 300);
		platformsLayer.add(platform_2);

		// platformGround
		const platformGround = new platformPrefab(this, -8, 639);
		platformGround.scaleX = 1.2408567062942588;
		platformGround.scaleY = 0.134667199855117;
		platformGround.body.setOffset(4, 28);
		platformGround.body.setSize(1274, 187, false);
		platformsLayer.add(platformGround);

		// bombsLayer
		const bombsLayer = this.add.layer();

		// player_platforms_collider
		this.physics.add.collider(player, platformsLayer.list);

		// stars_platforms_collider
		this.physics.add.collider(starsLayer.list, platformsLayer.list);

		// player_stars_collider
		this.physics.add.overlap(player, starsLayer.list, this.collectStar as any, undefined, this);

		// bombs_platforms_collider
		this.physics.add.collider(bombsLayer.list, platformsLayer.list);

		// player_bombs_collider
		this.physics.add.collider(player, bombsLayer.list, this.hitBomb as any, undefined, this);

		// bomb_bomb_collider
		this.physics.add.collider(bombsLayer.list, bombsLayer.list);

		this.player = player;
		this.starsLayer = starsLayer;
		this.platformGround = platformGround;
		this.bombsLayer = bombsLayer;
		this.leftKey = leftKey;
		this.rightKey = rightKey;
		this.upKey = upKey;
		this.spaceBar = spaceBar;

		this.events.emit("scene-awake");
	}

	private player!: PlayerPrefab;
	private starsLayer!: Phaser.GameObjects.Layer;
	private platformGround!: platformPrefab;
	private bombsLayer!: Phaser.GameObjects.Layer;
	private leftKey!: Phaser.Input.Keyboard.Key;
	private rightKey!: Phaser.Input.Keyboard.Key;
	private upKey!: Phaser.Input.Keyboard.Key;
	private spaceBar!: Phaser.Input.Keyboard.Key;

	/* START-USER-CODE */
	documentElement = null;

	private state = {
		moveDirection: 'right',
		moveAction: 'move',
	}
	private gameOver = false;

	create() {
		this.editorCreate();
		this.spawnBomb();
	}

	update() {
		if ( this.gameOver ) {
			return;
		}

		this.updatePlayer();
	}

	private hitBomb( player: PlayerPrefab, bomb: bombPrefab ) {
		const gameOverEvent: TCustomEvents = 'game:over';
		this.physics.pause();
		player.die();
		this.gameOver = true;
		App.dispatchCustomEvent( gameOverEvent );
	}

	private collectStar( player: PlayerPrefab, star: starPrefab ) {
		const currentScore = App.state.currentScore || 0;
		star.collected();

		App.setState({
			'currentScore': currentScore + 10,
		});

		if ( this.noStarActive() ) {
			// spawn stars
			for( let obj of this.starsLayer.list ) {
				const star = obj as starPrefab;

				star.resetStar();
			}

			// spawn bomb
			this.spawnBomb();
		}
	}

	private spawnBomb() {
		const sceneWidth: number = this.cameras.main.width;
		const bombX = ( this.player.x < sceneWidth / 2 )
			? Phaser.Math.Between( sceneWidth / 2, sceneWidth )
			: Phaser.Math.Between( 0, sceneWidth / 2 );
		const bomb = new bombPrefab( this, bombX, 0 );

		this.bombsLayer.add( bomb );
	}

	private noStarActive() {
		for( const star of this.starsLayer.list ) {
			if (star.active) {
				return false;
			}
		}

		return true;
	}

	private updatePlayer() {
		let moveDirection: TMoveDirection = null;
		let moveAction: TMoveAction = null;
		let fillBarInterval: number = null;
		let fillValue: number = 0;
		const checkDirection: TMoveDirection = 'right';

		if ( this.leftKey.isDown ) {
			moveDirection = 'left';
			moveAction = 'move';
			this.player.setVelocityX( -App.state.velocityValue );
			this.state.moveDirection = moveDirection;
			this.state.moveAction = moveAction;

		} else if ( this.rightKey.isDown ) {
			moveDirection = 'right';
			moveAction = 'move';
			this.player.setVelocityX( App.state.velocityValue );
			this.state.moveDirection = moveDirection;
			this.state.moveAction = moveAction;

		} else {
			moveAction = 'idle';
			this.player.setVelocityX( 0 );
			this.state.moveAction = moveAction;
		}

		if ( this.spaceBar.isDown ) {
			if ( App.state.isFlashVelocityAvailable ) {
				App.setState({
					isFlashVelocityAvailable: false,
					velocityValue: gameVars.flashVelocityValue,
				});

				fillBarInterval = setInterval(() => {
					fillValue += 10 / gameVars.flashVelocityCoolDown;
					this.documentElement.style.setProperty('--flash-velocity-cooldown', fillValue * 100 + '%');
				}, 10 );

				setTimeout(() => {
					App.setState({
						velocityValue: gameVars.defaultVelocityValue,
					});
				}, gameVars.flashVelocityTimeout );

				setTimeout(() => {
					clearInterval( fillBarInterval );
					App.setState({
						isFlashVelocityAvailable: true,
					});
				}, gameVars.flashVelocityCoolDown );
			}
		}

		if ( this.upKey.isDown && this.player.body.touching.down ) {
			moveAction = 'jump';
			this.player.setVelocityY( -gameVars.jumpVelocityValue );
			this.state.moveAction = moveAction;
		}

		if ( !this.player.body.touching.down ) {
			moveAction = 'jump';
			this.state.moveAction = moveAction;
		}


		switch ( this.state.moveAction as TMoveAction ) {
			case 'move':
				this.state.moveDirection === checkDirection
					? this.player.play( ANIM_RIGHT, true )
					: this.player.play( ANIM_LEFT, true );
				break;

			case 'jump':
				this.state.moveDirection === checkDirection
					? this.player.play( ANIM_JUMPRIGHT, true )
					: this.player.play( ANIM_JUMPLEFT, true );
				break;

			case 'idle':
			default:
				this.state.moveDirection === checkDirection
					? this.player.play( ANIM_FACERIGHT, true )
					: this.player.play( ANIM_FACELEFT, true );
				break;
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
