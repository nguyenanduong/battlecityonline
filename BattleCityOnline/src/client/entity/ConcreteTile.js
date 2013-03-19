define([
	"dojo/_base/declare",

	"bco-client/entity/Tile",

	"frozen/plugins/loadImage!script/bco-client/image/concrete.png"	
], function (
	declare,
	
	Tile,

	concreteTileImage) {

	return declare([Tile], {
		tileImage: concreteTileImage
	});
});