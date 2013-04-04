define([
    "dojo/_base/declare",
	
	"dijit/_WidgetBase",
	"dijit/_TemplatedMixin",
	
	"bco-client/BattleCityGame",

	"bco-client/HttpGameHost",
	"bco-client/LocalGameHost",
	"bco-client/map/stageX",

	"dojo/text!./template/DemoGame.html"
], function(
	declare,
	
	_WidgetBase,
	_TemplatedMixin,
	
	BattleCityGame, 

	HttpGameHost,
	LocalGameHost,
	stage1,
	
	template) {
	
	return declare([_WidgetBase, _TemplatedMixin], {
		templateString: template,

		game: null,
		color: null,
		
		postCreate: function () {
			this.inherited(arguments);

			var game = new BattleCityGame({
				canvas: this._canvas,
				
				gameId: this.game,
				playerId: this.color,

				gameHost: new HttpGameHost()
			});

			game.start();
		}
	});

});