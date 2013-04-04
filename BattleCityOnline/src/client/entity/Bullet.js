define([
	"dojo/_base/declare",

	"bco-client/entity/_Entity",

	"frozen/plugins/loadImage!script/bco-client/image/bullet_0_up.png",
	"frozen/plugins/loadImage!script/bco-client/image/bullet_0_down.png",
	"frozen/plugins/loadImage!script/bco-client/image/bullet_0_left.png",
	"frozen/plugins/loadImage!script/bco-client/image/bullet_0_right.png"	
], function (
	declare,
	
	_Entity,

	bullet_0_up,
	bullet_0_down,
	bullet_0_left,
	bullet_0_right) {

	return declare([_Entity], {
		halfWidth: 4,
		halfHeight: 4,

		layerMask: 2,

		power: 1,
		direction: null,
		autoMove: true,

		speed: null,

		images: {
			"up": bullet_0_up,
			"down": bullet_0_down,
			"left": bullet_0_left,
			"right": bullet_0_right
		},

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

		_getImage: function () {
			return this.images[this.direction];
		},

		onBeginContact: function(contactor) {
			return contactor.explode(this.source, this.power, this.direction);
		},

		stepBack: function (obstacle) {
			if (obstacle !== this.source) {
				this.state = "dead";
				return true;
			}

			return false;
		}
	});
});