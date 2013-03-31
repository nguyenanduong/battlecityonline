define([
    "dojo/_base/declare",
    "dojo/keys",
    "dojo/when",

    "bco-client/entity/BrickTile",
    "bco-client/entity/ConcreteTile",
    "bco-client/entity/ForestTile",
    "bco-client/entity/IceTile",
    "bco-client/entity/WaterTile",
    "bco-client/entity/Wall",

    "bco-client/entity/Player",

	"frozen/box2d/BoxGame"
], function(
	declare,
	keys,
	when,

	BrickTile,
	ConcreteTile,
	ForestTile,
	IceTile,
	WaterTile,

	Wall,

	Player,
	
	BoxGame) {
	
	return declare([BoxGame], {
		canvas: null,
		stageSpec: null,
		playerColor: null,

		gameHost: null,
		
		draw: function(context) {
			context.fillStyle = "#000";
			context.fillRect(0, 0, 416, 416);

			this._drawEntities(context);
		},

		_drawEntities: function(context) {
			var entities = [];

			for (entityId in this.entities) {
				entities.push(this.entities[entityId]);
			}

			entities.sort(function (entity1, entity2) {
				return entity1.layerMask - entity2.layerMask;
			});

			entities.forEach(function (entity) {
				entity.draw(context);
			});
		},

		preUpdate: function() {
			if (!this._commandHandled) {
				return this.inherited(arguments);
			}

			this._commandHandled = false;

			var entityId;

			for (entityId in this.entities) {
				this.entities[entityId].onBeforeUpdate();
			}

			this.inherited(arguments);

			for (entityId in this.entities) {
				this.entities[entityId].onAfterUpdate();
			}

			for (entityId in this.entities) {
				if (this.entities[entityId].state === "dead") {
					this.box.removeBody(entityId);
					delete this.entities[entityId];
				}
			}			
		},

		handleInput: function (im, ellapsedTime) {
			this.inherited(arguments);

			if (this.gameHost.waiting) {
				return;
			}

			var commands = [];

			if (im.keyActions[keys.UP_ARROW].isPressed()) {
				commands.push({
					target: this.player.id,
					name: "UP"
				});
				//this._player1.move("up");
			} else if (im.keyActions[keys.DOWN_ARROW].isPressed()) {
				commands.push({
					target: this.player.id,
					name: "DOWN"
				});
				//this._player1.move("down");
			} else if (im.keyActions[keys.LEFT_ARROW].isPressed()) {
				commands.push({
					target: this.player.id,
					name: "LEFT"
				});
				//this._player1.move("left");
			} else if (im.keyActions[keys.RIGHT_ARROW].isPressed()) {
				commands.push({
					target: this.player.id,
					name: "RIGHT"
				});
				//this._player1.move("right");
			}

			if (im.keyActions[keys.SPACE].isPressed()) {
				commands.push({
					target: this.player.id,
					name: "FIRE"
				});
			}			

			if (im.keyActions[keys.ENTER].isPressed()) {
				commands.push({
					name: "START"
				});
			}
			
			when(this.gameHost.sendCommands(commands), this.handleCommands.bind(this));
		},

		handleCommands: function (commands) {
			commands.forEach(function (command) {
				var entity = this.entities[command.target],
					result = entity.command(command.name);

				if (result) {
					this._addEntity(result);
				}
			}, this);

			this._commandHandled = true;
		},

		initInput: function (im) {
			this.inherited(arguments);

			im.addKeyAction(keys.ENTER);
			im.addKeyAction(keys.LEFT_ARROW);
			im.addKeyAction(keys.RIGHT_ARROW);
			im.addKeyAction(keys.UP_ARROW);
			im.addKeyAction(keys.DOWN_ARROW);
			im.addKeyAction(keys.SPACE);
		},

		init: function () {
			this.inherited(arguments);
			
			var self = this;

			this.box.setGravity({ x: 0.0, y: 0.0 });
			this.box.resolveCollisions = true;
			this.box.scale = 10;

			this.box.addContactListener({
				beginContact: function (id1, id2, b2Contact) {
					var entity1 = self.entities[id1],
						entity2 = self.entities[id2];

					if (entity1.layerMask & entity2.layerMask) {
						var entity1AllowContact = entity1.onBeginContact(entity2);
							entity2AllowContact = entity2.onBeginContact(entity1);
	
						if (!entity1AllowContact && !entity2AllowContact) {
							b2Contact.m_flags &= !0x0010;
						}
					}
				},
				endContact: function (id1, id2) {
					var entity1 = self.entities[id1],
						entity2 = self.entities[id2];
						
					if (entity1.layerMask & entity2.layerMask) {
						entity1.onEndContact(entity2);
						entity2.onEndContact(entity1);
					}
				}
			});

			// add a player
			this._createPlayers(this.stageSpec.players);

			this._createTiles(this.stageSpec.map);

			this._createWalls(this.stageSpec.size.w, this.stageSpec.size.h);
		},

		_addEntity: function (entity) {
			this.box.addBody(entity);

			//shims
			this.box.bodiesMap[entity.id].GetFixtureList().SetSensor(entity.isSensor);
			entity.box = this.box;
			this.entities[entity.id] = entity;
		},

		_createPlayers: function (players) {
			players.forEach(function (player) {
				var playerObj = new Player({
					id: "player_" + player.color,
					color: player.color,
					x: player.x,
					y: player.y,
					speed: 4,
					direction: player.direction
				});
				
				this._addEntity(playerObj);

				if (player.color === this.playerColor) {
					this.player = playerObj;
				}
			}, this);
		},

		_createTiles: function (tiles) {
			tiles.forEach(function (row, rowIndex) {
				row.forEach(function(cell, cellIndex) {
					switch (cell) {
						case 1: // brick
							//TODO: TileFactory
							this._addEntity(new BrickTile({
								id: "tile_" + rowIndex + "_" + cellIndex,
								x: cellIndex * 16 + 8,
								y: rowIndex * 16 + 8
							}));

							break;
						case 2: // concrete
							//TODO: TileFactory
							this._addEntity(new ConcreteTile({
								id: "tile_" + rowIndex + "_" + cellIndex,
								x: cellIndex * 16 + 8,
								y: rowIndex * 16 + 8
							}));

							break;
						case 3: // forest
							//TODO: TileFactory
							this._addEntity(new ForestTile({
								id: "tile_" + rowIndex + "_" + cellIndex,
								x: cellIndex * 16 + 8,
								y: rowIndex * 16 + 8
							}));

							break;
						case 4: // ice
							//TODO: TileFactory
							this._addEntity(new WaterTile({
								id: "tile_" + rowIndex + "_" + cellIndex,
								x: cellIndex * 16 + 8,
								y: rowIndex * 16 + 8
							}));

							break;
						case 5: // water
							//TODO: TileFactory
							this._addEntity(new IceTile({
								id: "tile_" + rowIndex + "_" + cellIndex,
								x: cellIndex * 16 + 8,
								y: rowIndex * 16 + 8
							}));

							break;
					}
				}, this);
			}, this);
		},

		_createWalls: function (mapSizeX, mapSizeY) {
			var i;
			for (i = -1; i <= mapSizeX; i++) {
				this._addEntity(new Wall({
					id: "wallX_Bottom_" + i,
					x: i * 16 + 8,
					y: -8
				}));
				this._addEntity(new Wall({
					id: "wallX_Top_" + i,
					x: i * 16 + 8,
					y: mapSizeY * 16 + 8
				}));
			}
			for (i = 0; i < mapSizeY; i++) {
				this._addEntity(new Wall({
					id: "wallY_Left_" + i,
					x: -8,
					y: i * 16 + 8
				}));
				this._addEntity(new Wall({
					id: "wallY_Right_" + i,
					x: mapSizeX * 16 + 8,
					y: i * 16 + 8
				}));
			}
		}
	});
});