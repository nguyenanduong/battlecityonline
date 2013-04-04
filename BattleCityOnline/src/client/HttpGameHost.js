define([
	"dojo/_base/declare",

	"dojo/Deferred",
	"dojo/json",
	"dojo/request",
	"dojo/when",
	"dojo/promise/all",

	"bco-client/_GameHost"
], function (
	declare,

	Deferred,
	json,
	request,
	when,
	all,

	_GameHost) {

	return declare([_GameHost], {
		waiting: false,

		create: function (playerId, settings) {
			var stageLoad = new Deferred();
			require(["bco-client/map/" + settings.stage], function (stageSpec) {
				stageLoad.resolve(stageSpec);
			});

			return when(all([stageLoad, request("/gamehost/create", {
				method: "POST",
				handleAs: "json",
				headers: { "Content-Type": "application/json" },
				data: json.stringify({
					playerId: playerId,
					settings: settings
				})
			})]), function (result) {
				var stageSpec = result[0], game = result[1];
				console.log(game.gameId);
				return {
					gameId: game.gameId,
					stageSpec: stageSpec
				}
			}.bind(this));
		},

		join: function (gameId, playerId) {
			return when(request("/gamehost/" + gameId + "/join", {
				method: "POST",
				handleAs: "json",
				headers: { "Content-Type": "application/json" },
				data: json.stringify({
					playerId: playerId
				})
			}), function (game) {
				console.log(game);
				var stageLoad = new Deferred();

				require(["bco-client/map/" + game.stage], function (stageSpec) {
					stageLoad.resolve({
						gameId: gameId,
						stageSpec: stageSpec
					});
				});				

				return stageLoad.promise;
			}.bind(this));
		},

		sendCommands: function (gameId, playerId, commands) {
			var dfd = new Deferred();

			this.waiting = true;

			when(request("/gamehost/" + gameId + "/command", {
				method: "POST",
				handleAs: "json",
				headers: { "Content-Type": "application/json" },
				data: json.stringify({
					playerId: playerId,
					commands: commands
				})
			}), function (synthCommands) {
				dfd.resolve(synthCommands);
				this.waiting = false;
			}.bind(this));

			return dfd.promise;
		}
	});	
});