define([
	"dojo/_base/declare",

	"bco-client/entity/_Obstacle",
	"bco-client/entity/Tile",

	"frozen/plugins/loadImage!script/bco-client/image/wall.png"
], function (
	declare,
	
	_Obstacle,
	Tile,

	wallTileImage) {

	return declare([Tile, _Obstacle], {
		layerMask: 3,
		tileImage: wallTileImage,
		resistance: 10
	});
});