define([
	"dojo/_base/declare",

	"bco-client/entity/_Obstacle",
	"bco-client/entity/Tile",

	"frozen/plugins/loadImage!script/bco-client/image/water.png"
], function (
	declare,
	
	_Obstacle,
	Tile,

	waterTileImage) {

	return declare([Tile, _Obstacle], {
		layerMask: 1,

		contactAction: 16, // BIT: 0: Slipperize, 1: None, 2: None, 3: None, 4: Stop, 5: Explode, 6: Super Explode, 7: None

		tileImage: waterTileImage
	});
});