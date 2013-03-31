define([
	"dojo/_base/declare",

	"bco-client/entity/_Obstacle",
	"bco-client/entity/Tile",

	"frozen/plugins/loadImage!script/bco-client/image/concrete.png"	
], function (
	declare,
	
	_Obstacle,
	Tile,

	concreteTileImage) {

	return declare([Tile, _Obstacle], {
		layerMask: 3,
		tileImage: concreteTileImage,
		resistance: 1
	});
});