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
	"frozen/plugins/loadImage!script/bco-client/image/player2_0_right.png"
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
	player2_0_right) {

	return declare([Tank], {
		color: null,

		postscript: function () {
			this.inherited(arguments);

			this.images = {
				"up": this.color === "green" ? player2_0_up : player1_0_up,
				"down": this.color === "green" ? player2_0_down : player1_0_down,
				"left": this.color === "green" ? player2_0_left : player1_0_left,
				"right": this.color === "green" ? player2_0_right : player1_0_right
			}
		}
	});
});