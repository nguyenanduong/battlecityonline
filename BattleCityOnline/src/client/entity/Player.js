define([
	"dojo/_base/declare",

	"bco-client/entity/Tank",

	"frozen/plugins/loadImage!script/bco-client/image/player1_0_up.png",
	"frozen/plugins/loadImage!script/bco-client/image/player1_0_down.png",
	"frozen/plugins/loadImage!script/bco-client/image/player1_0_left.png",
	"frozen/plugins/loadImage!script/bco-client/image/player1_0_right.png",

	"frozen/plugins/loadImage!script/bco-client/image/player2_0_up.png",
	"frozen/plugins/loadImage!script/bco-client/image/player2_0_down.png",
	"frozen/plugins/loadImage!script/bco-client/image/player2_0_left.png",
	"frozen/plugins/loadImage!script/bco-client/image/player2_0_right.png",

	"frozen/plugins/loadImage!script/bco-client/image/player3_0_up.png",
	"frozen/plugins/loadImage!script/bco-client/image/player3_0_down.png",
	"frozen/plugins/loadImage!script/bco-client/image/player3_0_left.png",
	"frozen/plugins/loadImage!script/bco-client/image/player3_0_right.png"
], function (
	declare,
	
	Tank,
	
	player1_0_up,
	player1_0_down,
	player1_0_left,
	player1_0_right,
	
	player2_0_up,
	player2_0_down,
	player2_0_left,
	player2_0_right,

	player3_0_up,
	player3_0_down,
	player3_0_left,
	player3_0_right) {

	return declare([Tank], {
		color: null,

		_playerImages: {
			"yellow": {
				"up": player1_0_up,
				"down": player1_0_down,
				"left": player1_0_left,
				"right": player1_0_right,
			},
			"green": {
				"up": player2_0_up,
				"down": player2_0_down,
				"left": player2_0_left,
				"right": player2_0_right,
			},
			"magenta": {
				"up": player3_0_up,
				"down": player3_0_down,
				"left": player3_0_left,
				"right": player3_0_right,
			}
		},

		postscript: function () {
			this.inherited(arguments);

			this.images = this._playerImages[this.color];
		}
	});
});