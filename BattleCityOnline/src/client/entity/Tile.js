define([
	"dojo/_base/declare",

	"frozen/box2d/RectangleEntity"
], function (
	declare,
	
	RectangleEntity) {

	return declare([RectangleEntity], {
		halfWidth: 4,
		halfHeight: 4,
		restitution: 0,
		friction: 0,
		staticBody: true,

		draw: function (ctx) {
			
		}
	});
});