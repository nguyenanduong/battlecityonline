define([
	"dojo/_base/declare",

	"bco-client/entity/_Entity",
	"bco-client/entity/_Obstacle",

	"bco-client/entity/Bullet",

	"frozen/plugins/loadSound!script/bco-client/sound/bullet_shot.ogg",
	"frozen/plugins/loadSound!script/bco-client/sound/explosion_1.ogg",

	"frozen/plugins/loadImage!script/bco-client/image/tank_explosion_1.png",
	"frozen/plugins/loadImage!script/bco-client/image/tank_explosion_2.png",
	"frozen/plugins/loadImage!script/bco-client/image/tank_explosion_3.png",
	"frozen/plugins/loadImage!script/bco-client/image/tank_explosion_4.png",
	"frozen/plugins/loadImage!script/bco-client/image/tank_explosion_5.png"
], function (
	declare,
	
	_Entity,
	_Obstacle,

	Bullet,

	bullet_shot,
	explosion_1,

	tank_explosion_1,
	tank_explosion_2,
	tank_explosion_3,
	tank_explosion_4,
	tank_explosion_5) {

	return declare([_Entity, _Obstacle], {
		halfWidth: 15,
		halfHeight: 15,

		layerMask: 3,

		images: null,

		staticBody: false,

		_explosionImages: [
			tank_explosion_1,
			tank_explosion_2,
			tank_explosion_3,
			tank_explosion_4,
			tank_explosion_5
		],

		explodeSound: explosion_1,

		_bulletStartOffset: {
			"up": {
				x: 0,
				y: -6
			},
			"down": {
				x: 0,
				y: 6
			},
			"left": {
				x: -6,
				y: 0
			},
			"right": {
				x: 6,
				y: 0
			}
		},

		draw: function (ctx) {
			ctx.save();
			
			var image = this._getImage();

			ctx.drawImage(
				image,
				(this.x-this.halfWidth) * this.scale - 1,
				(this.y-this.halfHeight) * this.scale - 1
			);
      
			ctx.restore();
		},

		isAlive: function () {
			return this.state !== "exploding" && this.state !== "dead";
		},

		die: function () {
			this.state = "exploding";
			this.halfWidth = this.halfHeight = 32 / this.scale;
			this._explosionPhase = 1;
		},

		_getImage: function () {
			if (this._explosionPhase) {
				return this._explosionImages[this._explosionPhase - 1];
			}

			return this.images[this.direction];
		},

		command: function (cmd) {
			this.inherited(arguments);

			if (cmd === "FIRE") {
				return this.fire();
			}
		},

		fire: function () {
			if (this._bullet) {
				return;
			}

			bullet_shot.play();

			var x = this.x * this.scale + this._bulletStartOffset[this.direction].x,
				y = this.y * this.scale + this._bulletStartOffset[this.direction].y;

			this._bullet = new Bullet({
				id: "bullet_" + this.id,
				x: x,
				y: y,
				direction: this.direction,
				speed: 8,
				source: this
			});


			return this._bullet;
		},

		onBeforeUpdate: function () {
			if (this._explosionPhase) {
				this._explosionPhase++;
			}
			if (this._explosionPhase > 5) {
				this._explosionPhase = 0;
				this.state = "dead";
			}

			this.inherited(arguments);
		},

		onAfterUpdate: function () {
			this.inherited(arguments);

			if (this._bullet && this._bullet.state === "dead") {
				this._bullet = null;
			}
		}
	});
});