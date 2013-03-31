define({
	box2D: {
		module: "box2dweb"
	},
	
	gamePlayView: {
		module: "bco-client/GamePlayView"
	},
	
    viewContainer: {
        create: {
            module: "bco-client/ViewContainer",
            args: [
                {
                    defaultView: "home",
                    views: {
                        home: {
                        	center: { 
                        		widget: { $ref: "gamePlayView" }
                        	}
                        }
                    }
                },
                
                { $ref: "dom!root" }
            ]
        }
    },    
    
    application: {
        create: {
            module: "bco-client/Application",
            args: {
                viewContainer: { $ref: "viewContainer" }
            }
        }
    },
    
    plugins: [ { module: "wire/dom" } ]
});