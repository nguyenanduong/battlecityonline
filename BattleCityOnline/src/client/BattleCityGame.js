define([
    "dojo/_base/declare",

	"frozen/box2d/BoxGame",
	"frozen/box2d/RectangleEntity",

	"frozen/plugins/loadImage!script/bco-client/image/brick_l_b.png",
	"frozen/plugins/loadImage!script/bco-client/image/brick_l_t.png",
	"frozen/plugins/loadImage!script/bco-client/image/brick_r_t.png",
	"frozen/plugins/loadImage!script/bco-client/image/brick_r_b.png",

	"frozen/plugins/loadImage!script/bco-client/image/concrete_l_b.png",
	"frozen/plugins/loadImage!script/bco-client/image/concrete_l_t.png",
	"frozen/plugins/loadImage!script/bco-client/image/concrete_r_t.png",
	"frozen/plugins/loadImage!script/bco-client/image/concrete_r_b.png"
], function(
	declare,
	
	BoxGame, 
	Rectangle, 

	brick_l_b,
	brick_l_t,
	brick_r_t,
	brick_r_b, 

	concrete_l_b,
	concrete_l_t,
	concrete_r_t,
	concrete_r_b) {
	
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
			context.fillRect(0, 0, 415, 415);
			var entityId;
			for (entityId in this.entities) {
				this.entities[entityId].draw(context);
			}
		},

		init: function () {
			this.inherited(arguments);
			
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
						case 3: // forest
							break;
						case 4: // ice
							break;
						case 5: // water
							break;
					}
				}, this);
			}, this);
		},

		_createTile: function (rowIndex, cellIndex, tileType, corner) {
			var self = this;
			var tile = new Rectangle({
				id: "tile_" + rowIndex + "_" + cellIndex + "_" + corner,
				x: cellIndex * 16 + self._cornerOffset[corner].x + 4,
				y: rowIndex * 16 + self._cornerOffset[corner] .y+ 4,
				halfWidth: 4,
				halfHeight: 4,
				staticBody: true,
				draw: function(ctx) {
					ctx.save();
					
					ctx.translate(this.x * this.scale, this.y * this.scale);
					ctx.rotate(this.angle);
					ctx.translate(-(this.x) * this.scale, -(this.y) * this.scale);
					ctx.fillStyle = this.color;

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