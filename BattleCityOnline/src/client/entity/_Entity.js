define([
	"dojo/_base/declare",

	"frozen/box2d/RectangleEntity"
], function (
	declare,
	
	RectangleEntity) {

	return declare([RectangleEntity], {
		restitution: 0,
		friction: 0,
		isSensor: true,

		box: null,

		state: null,
		layerMask: null,
		resistance: 0,
		autoMove: false,

		_prevX: null,
		_prevY: null,
		_isSlippery: 0,
		_stepBack: false,
		_moving: false,
		_inertia: 0,
		
		_moveMatrix: {
			"up": { x: 0, y: -1 },
			"down": { x: 0, y: 1 },
			"left": { x: -1, y: 0 },
			"right": { x: 1, y: 0 }
		},
		
		direction: null,
		speed: 0,

		command: function (cmdName) {
			switch (cmdName) {
				case "UP":
					this.move("up");
					break;
				case "DOWN":
					this.move("down");
					break;
				case "LEFT":
					this.move("left");
					break;
				case "RIGHT":
					this.move("right");
					break;
			}
		},

		setPosition: function (x, y) {
			this.box.setPosition(this.id, x, y);
			this.x = x;
			this.y = y;
		},

		setSize: function (halfW, halfH) {
			var fixture = this.box.bodiesMap[this.id].GetFixtureList();
			fixture.m_shape.SetAsBox(halfW, halfH);
			this.halfWidth = halfW;
			this.halfHeight = halfH;
		},

		onBeginContact: function (contactor) {
			return true;
		},

		onEndContact: function (contactor) {
		},

		move: function (direction, sliding) {
			var x = this.x * this.scale,
				y = this.y * this.scale;				 

			if (direction !== this.direction) {
				x = Math.round(x / 16) * 16;
				y = Math.round(y / 16) * 16;

				this.direction = direction;
			} else {
				this._prevX = x;
				this._prevY = y;

				x += this._moveMatrix[this.direction].x * this.speed;
				
				y += this._moveMatrix[this.direction].y * this.speed;
			}

			if (this._isSlippery && !sliding) {
				this._inertia = 64;
			}

			this._moving = true;

			this.setPosition(x / this.scale, y / this.scale);
		},

		slipperize: function (on) {
			this._isSlippery += on ? 1 : -1;
		},

		stepBack: function () {
			this._stepBack = true;
		},

		explode: function (power, direction) {
			if (power > this.resistance) {
				this.state = "dead";
			}
		},

		onBeforeUpdate: function () {
			if (this.autoMove) {
				this.move(this.direction);
			}
		},

		onAfterUpdate: function () {
			if (this._stepBack && this._prevX !== null && this._prevY !== null) {
				this.setPosition(this._prevX / this.scale, this._prevY / this.scale, false);
				this._prevX = this._prevY = null;
				this._stepBack = false;
			} else if (!this._moving && this._isSlippery && this._inertia > 0) {
				this.move(this.direction, true)
				this._inertia--;
			}

			this._moving = false;
		}
	});
});