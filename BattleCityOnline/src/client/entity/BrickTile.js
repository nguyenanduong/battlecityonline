define([
	"dojo/_base/declare",

	"bco-client/entity/Tile",

	"frozen/plugins/loadImage!script/bco-client/image/brick.png"	
], function (
	declare,
	
	Tile,

	brickTileImage) {

	return declare([Tile], {
		tileImage: brickTileImage
	});
});