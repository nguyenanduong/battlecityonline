define([
    "dojo/_base/declare",
    "dojo/Deferred",
    "dojo/json",
    "dojo/when",
    
    "bco-common/_Object"
], function (
    declare,
    Deferred,
    json,
    when,
    
    _Object) {
    
    return declare([_Object], {
        express: null,
        uuid: null,
        port: null,
        
        clientModules: null,
        
        postscript: function () {
            this.inherited(arguments);
        },
        
        run: function () {
            var app = this.express();
            
            app.configure((function () {
                app.use(this.express.bodyParser());

                this.clientModules.forEach(function(module) {
                    app.use("/script/" + module.name, this.express.static(module.path));                       
                }, this);

                // TODO: Too many concerns
                app.post("/gamehost/create", this._createGame.bind(this));
                app.post("/gamehost/:gameId/join", this._joinGame.bind(this));
                app.post("/gamehost/:gameId/command", this._handleCommand.bind(this));

                app.use(this.express.static("public_html"));

                app.use(this._handleServerError);
            }).bind(this));
            
            var port = this.port || 80;
            app.listen(port);
            console.log("Listening on " + port);
        },
        
        _handleServerError: function (err, req, res, next) {
            console.error(err.stack);
            res.send(500, err);
        },

        // Simple commands syntherizer and dispatcher
        _started: false,
        _clients: [],
        _received: 0,
        _commands: [],
        _dispatcherDfd: null,

        _games: [],
        _gameCount: 0,

        _createGame: function (req, res) {
            var post = req.body;

            var game = {
                gameId: "Game_" + (++this._gameCount), //uuid.v1(),
                stage: post.settings.stage,
                masterPlayer: post.playerId
            };

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(json.stringify(game));

            game._players = [post.playerId];
            game._started = false;
            game._commands = [];
            game._dispatcherDfd = new Deferred();
            game._interval = setInterval(function () {
                // process commands
                // TODO: turn history
                var commands = game._started ? game._commands.filter(function (command) { return !!command.target; }) : []
                game._dispatcherDfd.resolve(commands);

                game._dispatcherDfd = new Deferred();
                game.commands = [];
            }.bind(this), 40);

            this._games[game.gameId] = game;
        },

        _joinGame: function (req, res) {
            var post = req.body;

            var gameId = req.params["gameId"],
                game = this._games[gameId];

            if (game._players.some(function (player) {
                return player === post.playerId;
            })) {
                res.send(500, "Slot not availabe!");
                return;
            };

            game._players.push(post.playerId);

            //TODO: Return all turns from beginning
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(json.stringify({
                gameId: game.gameId,
                stage: game.stage,
                masterPlayer: game.masterPlayer
            }));
        },

        _handleCommand: function (req, res) {
            var post = req.body;
            var commands = post.commands || [],
                playerId = post.playerId;

            var gameId = req.params["gameId"],
                game = this._games[gameId];

            //console.log(gameId);

            if (commands.some(function (command) {
                return command.name === "START";
            }) && playerId == game.masterPlayer) {
                game._started = true;
            }

            game._commands = this._commands.concat(commands);

            when(game._dispatcherDfd, function (synthCommands) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(json.stringify(synthCommands));
            }.bind(this));
        }
    });
});