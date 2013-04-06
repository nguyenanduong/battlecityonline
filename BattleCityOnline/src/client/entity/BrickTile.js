define([
	"dojo/_base/declare",

	"bco-client/entity/_Obstacle",
	"bco-client/entity/Tile",

	"frozen/plugins/loadImage!script/bco-client/image/brick_00.png",
	"frozen/plugins/loadImage!script/bco-client/image/brick_01.png",
	"frozen/plugins/loadImage!script/bco-client/image/brick_10.png",
	"frozen/plugins/loadImage!script/bco-client/image/brick_11.png"
], function (
	declare,
	
	_Obstacle,
	Tile,

	brick00,
	brick01,
	brick10,
	brick11) {

	return declare([Tile, _Obstacle], {
		layerMask: 3,

		_corners: null,
		_originalX: null,
		_originalY: null,

		explode: function (source, power, direction) {
			this.explodeSound.play();
			if (power > 1) {
				this.setToDie();
				return true;
			}

			var x = this.x * this.scale,
				y = this.y * this.scale,
				halfW = this.halfWidth * this.scale,
				halfH = this.halfHeight * this.scale;

			switch (direction) {
				case "up":
					if (this._corners[1][0] || this._corners[1][1]) {
						this._corners[1][0] = this._corners[1][1] = false;
					} else {
						this._corners[0][0] = this._corners[0][1] = false;
						this.setToDie();
					}
					y -= 8;
					halfH /= 2;

					break;
				case "down":
					if (this._corners[0][0] || this._corners[0][1]) {
						this._corners[0][0] = this._corners[0][1] = false;
					} else {
						this._corners[1][0] = this._corners[1][1] = false;
						this.setToDie();
					}
					y += 8;
					halfH /= 2;

					break;
				case "left":
					if (this._corners[0][1] || this._corners[1][1]) {
						this._corners[0][1] = this._corners[1][1] = false;
					} else {
						this._corners[0][0] = this._corners[1][0] = false;
						this.setToDie();
					}
					x -= 8;
					halfW /= 2;

					break;
				case "right":
					if (this._corners[0][0] || this._corners[1][0]) {
						this._corners[0][0] = this._corners[1][0] = false;
					} else {
						this._corners[0][1] = this._corners[1][1] = false;
						this.setToDie();
					}
					x += 8;
					halfW /= 2;

					break;
			}

			this.setPosition(x, y);
			this.setSize(halfW, halfH);

			return this.state === "dead";
		},

		draw: function (ctx) {
			if (!this._corners) {
				this._corners = [
					[true, true],
					[true, true]
				];
				this._originalX = this.x;
				this._originalY = this.y;
			}

			var x = this._originalX * this.scale,
				y = this._originalY * this.scale;

			ctx.save();
			
			if (this._corners[0][0]) {
				ctx.drawImage(
					brick00,
					x - 8,
					y - 8
				);
			}

			if (this._corners[0][1]) {
				ctx.drawImage(
					brick01,
					x,
					y - 8
				);
			}

			if (this._corners[1][0]) {
				ctx.drawImage(
					brick10,
					x - 8,
					y
				);
			}

			if (this._corners[1][1]) {
				ctx.drawImage(
					brick11,
					x,
					y
				);
			}
      
			ctx.restore();
		}
	});
});