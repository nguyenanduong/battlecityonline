define([
	"dojo/_base/declare",

	"frozen/box2d/RectangleEntity",

	"bco-client/entity/_ContactAwareMixin",
	"bco-client/entity/_NonBulletMixin",
], function (
	declare,
	
	RectangleEntity,

	_ContactAwareMixin,
	_NonBulletMixin) {

	return declare([RectangleEntity, _ContactAwareMixin, _NonBulletMixin], {
		halfWidth: 8,
		halfHeight: 8,
		
		restitution: 0,
		friction: 0,
		isSensor: true,
		
		staticBody: true,

		tileImage: null,

		draw: function (ctx) {
			ctx.save();
			
			ctx.drawImage(
				this.tileImage,
				(this.x-this.halfWidth) * this.scale,
				(this.y-this.halfHeight) * this.scale
			);
      
			ctx.restore();
		}
	});
});