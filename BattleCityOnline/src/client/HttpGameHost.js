define([
	"dojo/_base/declare",

	"dojo/Deferred",
	"dojo/json",
	"dojo/request",
	"dojo/when",

	"bco-common/_Object",
	"bco-client/_GameHost"
], function (
	declare,

	Deferred,
	json,
	request,
	when,

	_Object,
	_GameHost) {

	return declare([_Object, _GameHost], {
		clientId: null,
		waiting: false,

		sendCommands: function (commands) {
			var dfd = new Deferred();

			this.waiting = true;

			when(request("/gamehost/", {
				method: "POST",
				handleAs: "json",
				headers: { "Content-Type": "application/json" },
				data: json.stringify({
					clientId: this.clientId,
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