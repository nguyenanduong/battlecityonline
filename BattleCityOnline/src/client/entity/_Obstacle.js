define([
	"dojo/_base/declare",

	"bco-client/entity/Tile"
], function (
	declare,
	
	Tile) {

	return declare([Tile], {
		onBeginContact: function (contactor) {
			return contactor.stepBack(this);
		}
	});
});