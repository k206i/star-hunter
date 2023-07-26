
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default interface platformPrefab {

	 body: Phaser.Physics.Arcade.StaticBody;
}

export default class platformPrefab extends Phaser.Physics.Arcade.Image {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 4, y ?? 4, texture || "platform", frame);

		this.scaleX = 0.5684960719841474;
		this.scaleY = 0.134667199855117;
		this.setOrigin(0, 0);
		scene.physics.add.existing(this, true);
		this.body.setOffset(26, 28);
		this.body.setSize(556, 61, false);

		/* START-USER-CTR-CODE */
		// this.body.setOffset(26, 28);
		// this.body.setSize(556, 61, false);

		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
