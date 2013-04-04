define([
	"dojo/_base/declare",

	"bco-client/entity/Tile",

	"frozen/plugins/loadImage!script/bco-client/image/ice.png"	
], function (
	declare,
	
	Tile,

	iceTileImage) {

	return declare([Tile], {
		layerMask: 1,

		tileImage: iceTileImage,

		onEndContact: function(contactor) {
			contactor.slipperize(false);
		},

		onBeginContact: function (contactor) {
			contactor.slipperize(true);
			return false;
		}
	});
});