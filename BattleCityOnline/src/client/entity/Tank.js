define([
	"dojo/_base/declare",

	"bco-client/entity/_Entity",
	"bco-client/entity/_Obstacle",

	"bco-client/entity/Bullet"
], function (
	declare,
	
	_Entity,
	_Obstacle,

	Bullet) {

	return declare([_Entity, _Obstacle], {
		halfWidth: 15,
		halfHeight: 15,

		layerMask: 3,

		images: null,

		staticBody: false,

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

		_getImage: function () {
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

		onAfterUpdate: function () {
			this.inherited(arguments);

			if (this._bullet && this._bullet.state === "dead") {
				this._bullet = null;
			}
		}
	});
});