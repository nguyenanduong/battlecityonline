define([
	"dojo/_base/declare",

	"bco-client/entity/_Entity",

	"frozen/plugins/loadImage!script/bco-client/image/bullet_0_up.png",
	"frozen/plugins/loadImage!script/bco-client/image/bullet_0_down.png",
	"frozen/plugins/loadImage!script/bco-client/image/bullet_0_left.png",
	"frozen/plugins/loadImage!script/bco-client/image/bullet_0_right.png",

	"frozen/plugins/loadImage!script/bco-client/image/bullet_explosion_1.png",
	"frozen/plugins/loadImage!script/bco-client/image/bullet_explosion_2.png",
	"frozen/plugins/loadImage!script/bco-client/image/bullet_explosion_3.png"
], function (
	declare,
	
	_Entity,

	bullet_0_up,
	bullet_0_down,
	bullet_0_left,
	bullet_0_right,

	bullet_explosion_1,
	bullet_explosion_2,
	bullet_explosion_3) {

	return declare([_Entity], {
		halfWidth: 4,
		halfHeight: 4,

		layerMask: 2,

		power: 1,
		direction: null,
		autoMove: true,

		speed: null,

		staticBody: false,

		images: {
			"up": bullet_0_up,
			"down": bullet_0_down,
			"left": bullet_0_left,
			"right": bullet_0_right
		},

		_explosionImages: [
			bullet_explosion_1,
			bullet_explosion_2,
			bullet_explosion_3
		],

		draw: function (ctx) {
			ctx.save();
			
			var image = this._getImage();

			ctx.drawImage(
				image,
				(this.x-this.halfWidth) * this.scale,
				(this.y-this.halfHeight) * this.scale
			);
      
			ctx.restore();
		},

		isAlive: function () {
			return this.state !== "exploding" && this.state !== "dead";
		},

		die: function () {
			this.state = "exploding";
			this.halfWidth = this.halfHeight = 16 / this.scale;
			this._explosionPhase = 1;
		},

		_getImage: function () {
			if (this._explosionPhase) {
				return this._explosionImages[this._explosionPhase - 1];
			}

			return this.images[this.direction];
		},

		onBeforeUpdate: function () {
			if (this._explosionPhase) {
				this._explosionPhase++;
			}
			if (this._explosionPhase > 3) {
				this._explosionPhase = 0;
				this.state = "dead";
			}

			this.inherited(arguments);
		},

		onBeginContact: function(contactor) {
			return contactor.explode(this.source, this.power, this.direction);
		},

		stepBack: function (obstacle) {
			if (obstacle !== this.source) {
				this.setToDie();
				return true;
			}

			return false;
		}
	});
});