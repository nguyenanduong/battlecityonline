define({
    express: {
        module: "dojo/node!express"
    },
    
    application: {
        create: {
            module: "bco-server/Application",
            args: {
                port: 8283,                
                express: { $ref: "express" },
                clientModules: [
                    { name: "dojo", path: "amd_modules/dojo" },
                    { name: "dijit", path: "amd_modules/dijit" },

                    { name: "box2d-html5", path: "amd_modules/box2d-html5" },
                    { name: "dcl", path: "amd_modules/dcl" },
                    { name: "frozen", path: "amd_modules/frozen" },

                    { name: "meld", path: "amd_modules/meld" },
                    { name: "when", path: "amd_modulesib/when" },
                    { name: "wire", path: "amd_modules/wire" },
                    
                    { name: "bco-common", path: "src/common" },
                    { name: "bco-client", path: "src/client" }
                ]
            }
        }
    }    
});