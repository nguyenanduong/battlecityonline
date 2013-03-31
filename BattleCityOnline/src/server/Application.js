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

                app.post("/gamehost/", this._handleGameHost.bind(this));

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

        _handleGameHost: function (req, res) {
            var post = req.body;
            var commands = post.commands || [],
                clientId = post.clientId;

            if (!this._clients.some(function (client) {
                return client === clientId;
            })) {
                this._clients.push(clientId);
            }

            if (commands.some(function (command) {
                return command.name === "START";
            })) {
                this._started = true;
            }

            this._received++;

            this._commands = this._commands.concat(commands);

            if (!this._dispatcherDfd) {
                this._dispatcherDfd = new Deferred();
            }

            when(this._dispatcherDfd, function (synthCommands) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(json.stringify(synthCommands));
            }.bind(this));

            if (this._received === this._clients.length) {
                this._received = 0;
                this._dispatcherDfd.resolve(this._started ? this._commands.filter(function (command) { return !!command.target; }) : []);
                this._dispatcherDfd = null;
                this._commands = [];
            }
        }
    });
});