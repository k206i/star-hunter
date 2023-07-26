
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default interface bombPrefab {

	 body: Phaser.Physics.Arcade.Body;
}

export default class bombPrefab extends Phaser.Physics.Arcade.Image {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 380, y ?? 186, texture || "bomb", frame);

		this.scaleX = 0.03288430912274877;
		this.scaleY = 0.03288430912274877;
		scene.physics.add.existing(this, false);
		this.body.bounce.x = 1;
		this.body.bounce.y = 1;
		this.body.collideWorldBounds = true;
		this.body.setOffset(0, 533);
		this.body.setSize(1152, 1117, false);

		/* START-USER-CTR-CODE */
		this.setVelocity( Phaser.Math.Between( -200, 200 ), 20 );
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
