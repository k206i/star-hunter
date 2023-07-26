
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import {
	ANIM_JUMPLEFT
} from "./animations";
/* END-USER-IMPORTS */

export default interface PlayerPrefab {

	 body: Phaser.Physics.Arcade.Body;
}

export default class PlayerPrefab extends Phaser.Physics.Arcade.Sprite {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 100, y ?? 64, texture || "dude", frame ?? 27);

		scene.physics.add.existing(this, false);
		this.body.collideWorldBounds = true;
		this.body.setOffset(25, 7);
		this.body.setSize(12, 55, false);

		/* START-USER-CTR-CODE */
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */
	die() {
		this.setTint( 0xff0000 );
		this.play( ANIM_JUMPLEFT );
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */
// You can write more code here
