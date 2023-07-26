
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default interface starPrefab {

	 body: Phaser.Physics.Arcade.Body;
}

export default class starPrefab extends Phaser.Physics.Arcade.Image {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 153, y ?? 64, texture || "star", frame);

		this.scaleX = 0.014771200044305953;
		this.scaleY = 0.014771200044305953;
		scene.physics.add.existing(this, false);
		this.body.setSize(2000, 1925, false);

		/* START-USER-CTR-CODE */
		this.setBounceY( Phaser.Math.FloatBetween( 0.4, 0.8 ));
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	collected() {
		this.disableBody( true, true );
	}

	resetStar() {
		this.enableBody( true, Phaser.Math.Between( 0, 1280 ), Phaser.Math.Between( 0, 600 ), true, true );
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
