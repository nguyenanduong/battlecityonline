define([
    "dojo/_base/declare",
    "dojo/keys",

	"frozen/box2d/BoxGame",
	"frozen/box2d/RectangleEntity",

	"frozen/plugins/loadImage!script/bco-client/image/brick_l_b.png",
	"frozen/plugins/loadImage!script/bco-client/image/brick_l_t.png",
	"frozen/plugins/loadImage!script/bco-client/image/brick_r_t.png",
	"frozen/plugins/loadImage!script/bco-client/image/brick_r_b.png",

	"frozen/plugins/loadImage!script/bco-client/image/concrete_l_b.png",
	"frozen/plugins/loadImage!script/bco-client/image/concrete_l_t.png",
	"frozen/plugins/loadImage!script/bco-client/image/concrete_r_t.png",
	"frozen/plugins/loadImage!script/bco-client/image/concrete_r_b.png",

	"frozen/plugins/loadImage!script/bco-client/image/player1_0_up.png",
	"frozen/plugins/loadImage!script/bco-client/image/player1_0_down.png",
	"frozen/plugins/loadImage!script/bco-client/image/player1_0_left.png",
	"frozen/plugins/loadImage!script/bco-client/image/player1_0_right.png"
], function(
	declare,
	keys,
	
	BoxGame, 
	Rectangle, 

	brick_l_b,
	brick_l_t,
	brick_r_t,
	brick_r_b, 

	concrete_l_b,
	concrete_l_t,
	concrete_r_t,
	concrete_r_b,

	player1_0_up,
	player1_0_down,
	player1_0_left,
	player1_0_right) {
	
	return declare([BoxGame], {
		canvas: null,
		stageSpec: null,
		
		_cornerOffset: {
			"l_t": { x: 0, y: 0 },
			"r_t": { x: 8, y: 0 },
			"r_b": { x: 8, y: 8 },
			"l_b": { x: 0, y: 8 },
		},

		_tileImage: {
			"brick": {
				"l_t": brick_l_t,
				"r_t": brick_r_t,
				"r_b": brick_r_b,
				"l_b": brick_l_b
			},
			"concrete": {
				"l_t": concrete_l_t,
				"r_t": concrete_r_t,
				"r_b": concrete_r_b,
				"l_b": concrete_l_b
			}
		},

		draw: function(context) {
			context.fillStyle = "#000";
			context.fillRect(0, 0, 416, 416);
			var entityId;
			for (entityId in this.entities) {
				this.entities[entityId].draw(context);
			}
		},

		initInput: function (im) {
			this.inherited(arguments);

			im.addKeyAction(keys.LEFT_ARROW);
			im.addKeyAction(keys.RIGHT_ARROW);
			im.addKeyAction(keys.UP_ARROW);
			im.addKeyAction(keys.DOWN_ARROW);
		},

		handleInput: function (im) {
			this.inherited(arguments);
			
			var scale = this.box.scale;
			var currX = this._player1.x * scale,
				currY = this._player1.y * scale;

			if (im.keyActions[keys.UP_ARROW].isPressed()) {
				if (this._player1.direction === "left") {
					currX = this._normalizePos(currX, 0);
				} else if (this._player1.direction === "right") {
					currX = this._normalizePos(currX, 1);
				}

				this._player1.direction = "up";

				this.box.setPosition(this._player1.id, currX / scale, (currY - 1.5) / scale);
			} else if (im.keyActions[keys.DOWN_ARROW].isPressed()) {
				if (this._player1.direction === "left") {
					currX = this._normalizePos(currX, 0);
				} else if (this._player1.direction === "right") {
					currX = this._normalizePos(currX, 1);
				}

				this._player1.direction = "down";
				this.box.setPosition(this._player1.id, currX / scale, (currY + 1.5) / scale);
			} else if (im.keyActions[keys.LEFT_ARROW].isPressed()) {
				if (this._player1.direction === "up") {
					currX = this._normalizePos(currX, 0);
				} else if (this._player1.direction === "down") {
					currX = this._normalizePos(currX, 1);
				}

				this._player1.direction = "left";
				this.box.setPosition(this._player1.id, (currX - 1.5) / scale, currY / scale);
			} else if (im.keyActions[keys.RIGHT_ARROW].isPressed()) {
				if (this._player1.direction === "up") {
					currX = this._normalizePos(currX, 0);
				} else if (this._player1.direction === "down") {
					currX = this._normalizePos(currX, 1);
				}

				this._player1.direction = "right";
				this.box.setPosition(this._player1.id, (currX + 1.5) / scale, currY / scale);
			}
		},

		_normalizePos: function (x, increase) {
			return (Math.floor(x / 4) + increase) * 4;
		},

		init: function () {
			this.inherited(arguments);
			
			this.box.setGravity({ x: 0.0, y: 0.0 });
			this.box.resolveCollisions = true;
			this.box.addContactListener({
				beginContact: function (arguments) {
					console.log(arguments);
				},
				endContact: function (arguments) {
					console.log(arguments);
				},
				postSolve: function (arguments) {
					console.log(arguments);
				}
			});

			// add a player
			this._player1 = this._createPlayer(1);

			this.stageSpec.map.forEach(function (row, rowIndex) {
				row.forEach(function(cell, cellIndex) {
					switch (cell) {
						case 1: // brick
							this._createTile(rowIndex, cellIndex, "brick", "l_t");
							this._createTile(rowIndex, cellIndex, "brick", "r_t");
							this._createTile(rowIndex, cellIndex, "brick", "r_b");
							this._createTile(rowIndex, cellIndex, "brick", "l_b");

							break;
						case 2: // concrete
							this._createTile(rowIndex, cellIndex, "concrete", "l_t");
							this._createTile(rowIndex, cellIndex, "concrete", "r_t");
							this._createTile(rowIndex, cellIndex, "concrete", "r_b");
							this._createTile(rowIndex, cellIndex, "concrete", "l_b");

							break;
						case 3: // forrest
							break;
						case 4: // ice
							break;
						case 5: // water
							break;
					}
				}, this);
			}, this);
		},

		_createPlayer: function(id) {
			var self = this;
			var player = new Rectangle({
				id: "player_" + id,
				x: 144,
				y: 400,
				halfWidth: 15,
				halfHeight: 15,
				restitution: 0,
				friction: 0,
				staticBody: false,
				direction: "up",
				draw: function(ctx) {
					ctx.save();

					var playerImg;
					switch (this.direction) {
						case "up":
							playerImg = player1_0_up;
							break;
						case "down":
							playerImg = player1_0_down;
							break;
						case "left":
							playerImg = player1_0_left;
							break;
						case "right":
							playerImg = player1_0_right;
							break;
					}
					
					ctx.drawImage(
						playerImg,
						(this.x-this.halfWidth) * this.scale,
						(this.y-this.halfHeight) * this.scale
					);
		      
					ctx.restore();
				}
			});

			this.box.addBody(player);

			this.box.bodiesMap[player.id].SetFixedRotation(true);

			this.entities[player.id] = player;

			return player;
		},

		_createTile: function (rowIndex, cellIndex, tileType, corner) {
			var self = this;
			var tile = new Rectangle({
				id: "tile_" + rowIndex + "_" + cellIndex + "_" + corner,
				x: cellIndex * 16 + self._cornerOffset[corner].x + 4,
				y: rowIndex * 16 + self._cornerOffset[corner] .y+ 4,
				halfWidth: 4,
				halfHeight: 4,
				estitution: 0,
				friction: 0,
				staticBody: true,
				draw: function(ctx) {
					ctx.save();
					
					ctx.drawImage(
						self._tileImage[tileType][corner],
						(this.x-this.halfWidth) * this.scale,
						(this.y-this.halfHeight) * this.scale
					);
		      
					ctx.restore();
				}
			});

			this.box.addBody(tile);
			this.entities[tile.id] = tile;

			return tile;
		}
	});

});