define([
    "dojo/_base/declare",
	"dojo/keys",
	
	"dijit/_WidgetBase",
	"dijit/_TemplatedMixin",
	
	"frozen/box2d/BoxGame",
	"frozen/box2d/RectangleEntity",
	"frozen/box2d/PolygonEntity",
	"frozen/box2d/CircleEntity",
	
	"dojo/text!./template/DemoGame.html",
	
	"frozen/plugins/loadImage!./image/background.png",
	"frozen/plugins/loadImage!./image/nyan.png",
	"frozen/plugins/loadImage!./image/yarn.png"
], function(
	declare,
	keys, 
	
	_WidgetBase,
	_TemplatedMixin,
	
	BoxGame, 
	Rectangle, 
	Polygon, 
	Circle, 
	
	template,
	
	backImg, 
	nyanImg, 
	yarnImg) {
	
	return declare([_WidgetBase, TemplatedMixin], {
		templateString: template,
		
		postCreate: function () {
			this.inherited(arguments);
			
			var speed = 8;

			//objects in box2d need an id
			var geomId = 1;

			//shapes in the box2 world, locations are their centers
			var nyan, moon, pyramid, ground, ceiling, leftWall, rightWall, yarn;

			//setup a GameCore instance
			var game = new BoxGame({
				canvasId: "gameCanvas",
				initInput: function(im){
					//tells the input manager to listen for key events
					im.addKeyAction(keys.LEFT_ARROW);
					im.addKeyAction(keys.RIGHT_ARROW);
					im.addKeyAction(keys.UP_ARROW);

					im.addKeyAction("A");
					im.addKeyAction("D");

					//the extra param says to only detect inital press
					im.addKeyAction(keys.SPACE, true);
				},
		    
				handleInput: function(im){
					if (im.keyActions[keys.LEFT_ARROW].isPressed()) {
						this.box.applyImpulseDegrees(nyan.id, 270, speed);
					}

					if (im.keyActions[keys.RIGHT_ARROW].isPressed()) {
						this.box.applyImpulseDegrees(nyan.id, 90, speed);
					}

					if (im.keyActions[keys.UP_ARROW].isPressed()) {
						this.box.applyImpulseDegrees(nyan.id, 0, speed);
					}

					if (im.keyActions["A"].isPressed()) {
						this.box.applyTorque(yarn.id, -speed);
					}

					if (im.keyActions["D"].isPressed()) {
						this.box.applyTorque(yarn.id, speed);
					}

				},
		    
				draw: function(context) {
					context.drawImage(backImg, 0, 0, this.width, this.height);
					nyan.draw(context);
					yarn.draw(context);
				}
			});

			//create each of the shapes in the world
			ground = new Rectangle({
				id: geomId,
				x: 385,
				y: 480,
				halfWidth: 1000,
				halfHeight: 40,
				staticBody: true
			});
			
			game.box.addBody(ground); //add the shape to the box
			game.entities[geomId] = ground; //keep a reference to the shape for fast lookup

			geomId++;
			celing = new Rectangle({
				id: geomId,
				x: 385,
				y: -200,
				halfWidth: 1000,
				halfHeight: 40,
				staticBody: true
			});
			game.box.addBody(celing);
			game.entities[geomId] = celing;

			geomId++;
			leftWall = new Rectangle({
				id: geomId,
				x: -80,
				y: 240,
				halfWidth: 40,
				halfHeight: 1000,
				staticBody: true
			});
			
			game.box.addBody(leftWall);
			game.entities[geomId] = leftWall;

			geomId++;
			rightWall = new Rectangle({
				id: geomId,
				x: 850,
				y: 240,
				halfWidth: 40,
				halfHeight: 1000,
				staticBody: true
			});
		  
			game.box.addBody(rightWall);
			game.entities[geomId] = rightWall;

			geomId++;
			moon = new Circle({
				id: geomId,
				x: 626,
				y: 120,
				radius: 63,
				staticBody: true
			});
		  
			game.box.addBody(moon);
			game.entities[geomId] = moon;

			geomId++;
			pyramid = new Polygon({
				id: geomId,
				points: [{x: 320, y: 440}, {x: 446, y: 290}, {x: 565, y: 440}],
				staticBody: true
			});
			game.box.addBody(pyramid);
			game.entities[geomId] = pyramid;

			geomId++;
			nyan = new Rectangle({
				id: "nyan",
				x: 116,
				y: 360,
				halfWidth: 40,
				halfHeight: 28,
				staticBody: false,
				draw: function(ctx){ // we want to render the nyan cat with an image
					ctx.save();
					ctx.translate(this.x * this.scale, this.y * this.scale);
					ctx.rotate(this.angle); // this angle was given to us by box2d"s calculations
					ctx.translate(-(this.x) * this.scale, -(this.y) * this.scale);
					ctx.fillStyle = this.color;
					ctx.drawImage(
						nyanImg,
						(this.x-this.halfWidth) * this.scale - 10, //lets offset it a little to the left
						(this.y-this.halfHeight) * this.scale);
		      
					ctx.restore();
				}
			});
		  
			game.box.addBody(nyan);
			game.entities[nyan.id] = nyan;

			geomId++;
			yarn = new Circle({
				id: "yarn",
				x: 600,
				y: 390,
				radius: 30,
				staticBody: false,
				density: 0.5,  // al little lighter
				restitution: 0.8, // a little bouncier
				draw: function(ctx){  //we also want to render the yarn with an image
					ctx.save();
					ctx.translate(this.x * this.scale, this.y * this.scale);
					ctx.rotate(this.angle);
					ctx.translate(-(this.x) * this.scale, -(this.y) * this.scale);
					ctx.fillStyle = this.color;
					ctx.drawImage(
						yarnImg,
						(this.x-this.radius) * this.scale,
						(this.y-this.radius) * this.scale
					);
					ctx.restore();
				}
			});
		  
			game.box.addBody(yarn);
			game.entities[yarn.id] = yarn;
		 
			//launch the game!
			game.run();
		}
	});

});