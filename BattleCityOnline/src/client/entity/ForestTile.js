define([
	"dojo/_base/declare",

	"bco-client/entity/Tile",

	"frozen/plugins/loadImage!script/bco-client/image/forest.png"
], function (
	declare,
	
	Tile,

	forestTileImage) {

	return declare([Tile], {
		layerMask: 4,
		tileImage: forestTileImage
	});
});