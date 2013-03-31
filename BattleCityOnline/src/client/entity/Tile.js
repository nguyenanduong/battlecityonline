define([
	"dojo/_base/declare",

	"bco-client/entity/_Entity"
], function (
	declare,
	
	_Entity) {

	return declare([_Entity], {
		halfWidth: 8,
		halfHeight: 8,
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