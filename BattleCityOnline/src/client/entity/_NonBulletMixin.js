define([
	"dojo/_base/declare"
], function (
	declare) {

	return declare([], {
		beginContact: function (other) {
			console.log(other);
		},
		
		onHit: function () {

		}
	});
});