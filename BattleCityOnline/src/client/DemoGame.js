define([
    "dojo/_base/declare",
	
	"dijit/_WidgetBase",
	"dijit/_TemplatedMixin",
	
	"bco-client/BattleCityGame",
	"bco-client/map/stage1",

	"dojo/text!./template/DemoGame.html"
], function(
	declare,
	
	_WidgetBase,
	_TemplatedMixin,
	
	BattleCityGame, 
	stage1,
	
	template) {
	
	return declare([_WidgetBase, _TemplatedMixin], {
		templateString: template,
		
		postCreate: function () {
			this.inherited(arguments);

			var game = new BattleCityGame({
				canvas: this._canvas,
				stageSpec: stage1
			});

			game.run();
		}
	});

});