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

                    { name: "box2dweb", path: "amd_modules/box2dweb" },
                    { name: "dcl", path: "amd_modules/dcl" },
                    { name: "frozen", path: "amd_modules/frozen/src" },

                    { name: "domReady", path: "amd_modules/domReady" },
                    { name: "meld", path: "amd_modules/meld" },
                    { name: "when", path: "amd_modules/when" },
                    { name: "wire", path: "amd_modules/wire" },
                    
                    { name: "bco-common", path: "src/common" },
                    { name: "bco-client", path: "src/client" }
                ]
            }
        }
    }    
});