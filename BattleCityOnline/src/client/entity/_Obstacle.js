define([
	"dojo/_base/declare",

	"bco-client/entity/Tile"
], function (
	declare,
	
	Tile) {

	return declare([Tile], {
		onBeginContact: function (contactor) {
			contactor.stepBack();
			return false;
		}	
	});
});