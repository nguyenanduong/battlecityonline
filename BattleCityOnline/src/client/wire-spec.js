define({
	box2D: {
		module: "box2dweb"
	},
	
	demoGameWidget: {
		module: "bco-client/DemoGame"
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
                        		widget: { $ref: "demoGameWidget" }
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