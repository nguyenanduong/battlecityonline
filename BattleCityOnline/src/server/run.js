require({
	packages: [
        // Dojo
		{ name: "dojo", location: "." },
		
		// Wire et al.
		{ name: "meld", location: "../../amd_modules/meld", main: "meld" },
		{ name: "when", location: "../../amd_modules/when", main: "when" },
		{ name: "wire", location: "../../amd_modules/wire", main: "wire" },
		
        // bco common
        { name: "bco-common", location: "../../src/common" },

        // bco server
        { name: "bco-server", location: "../../src/server" }
	]
}, ["wire!bco-server/wire-spec"], function (wireSpec) {
    
	var app = wireSpec.application;
	app.run();
});