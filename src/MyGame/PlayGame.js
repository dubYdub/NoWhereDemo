/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function PlayGame() {    
    // The camera to view the scene
    this.logo1 = "assets/logo1.png"
    this.kBg = "assets/bg.png";
    this.kBgNormal = "assets/bg_normal.png";
    this.mCamera = null;
    this.msquare1 = null;
    this.msquare2 = null;
    this.msquare3 = null;
    this.msquare4 = null;
    this.msquare5 = null;
    this.msquare6 = null;
    this.msquare7 = null;
    this.msquare8 = null;
    this.msquare9 = null;
    this.mHero = null;
    this.mItem1 = null; //加速道具
    this.mItem2 = null; //减速道具
    this.mItem3 = null; //放大灯道具
    this.mItem4 = null;
    this.mItem5 = null; //瞬移
    
    this.BboxSet = null;
    
    this.mItem1BBox = null;
    this.mItem2BBox = null;
    this.mItem3BBox = null;
    this.mItem4BBox = null;
    this.mItem5BBox = null;
    
    //光
    this.heroLight = null;
    this.heroCamera = null;
    this.mGlobalLightSet = null;
    this.mBg = null;
    
    this.kDelta = 0.3;
    this.deltaV = 0.1;
    this.mMsg = null;
}
gEngine.Core.inheritPrototype(PlayGame, Scene);


PlayGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.logo1);
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.kBgNormal);
};

PlayGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.logo1);
    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.kBgNormal);

};

PlayGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 50), // position of the camera
        100,                     // width of camera
        [0, 0, 630, 630]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([1,0.98,0.85,1]);   
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    var r1 = new Renderable();
    r1.setColor([0, 0, 0, 1]);
    this.msquare1 = new GameObject(r1);
    this.msquare1.getXform().setPosition(55, 15);
    this.msquare1.getXform().setSize(90, 30); 
    
    var r2 = new Renderable();
    r2.setColor([0, 0, 0, 1]);
    this.msquare2 = new GameObject(r2);
    this.msquare2.getXform().setPosition(10, 70);
    this.msquare2.getXform().setSize(20, 60);
    
    var r3 = new Renderable();
    r3.setColor([0, 0, 0, 1]);
    this.msquare3 = new GameObject(r3);
    this.msquare3.getXform().setPosition(35, 95);
    this.msquare3.getXform().setSize(30, 10);
    
    var r4 = new Renderable();
    r4.setColor([0, 0, 0, 1]);
    this.msquare4 = new GameObject(r4);
    this.msquare4.getXform().setPosition(70, 95);
    this.msquare4.getXform().setSize(20, 10);

    var r5 = new Renderable();
    r5.setColor([0, 0, 0, 1]);
    this.msquare5 = new GameObject(r5);
    this.msquare5.getXform().setPosition(40, 60);
    this.msquare5.getXform().setSize(20, 40);
 
    var r6 = new Renderable();
    r6.setColor([0, 0, 0, 1]);
    this.msquare6 = new GameObject(r6);
    this.msquare6.getXform().setPosition(55, 75);
    this.msquare6.getXform().setSize(10, 10);
    
    var r7 = new Renderable();
    r7.setColor([0, 0, 0, 1]);
    this.msquare7 = new GameObject(r7);
    this.msquare7.getXform().setPosition(70, 60);
    this.msquare7.getXform().setSize(20, 40);
    
    var r8 = new Renderable();
    r8.setColor([0, 0, 0, 1]);
    this.msquare8 = new GameObject(r8);
    this.msquare8.getXform().setPosition(95, 70);
    this.msquare8.getXform().setSize(10, 60);
    
    this.msquare9 = new Renderable();
    this.msquare9.getXform().setPosition(5, 95);
    this.msquare9.getXform().setSize(10, 10);
    this.msquare9.setColor([1, 0, 0, 1]);

    this.mHero = new Hero(this.logo1);
    
    //道具1
    this.mItem1 = new Item(this.logo1);
    this.mItem1.getXform().setXPos(35);
    this.mItem1.getXform().setYPos(35);
    
    this.mItem2 = new Item(this.logo1);
    this.mItem2.getXform().setXPos(45);
    this.mItem2.getXform().setYPos(35);
    
    this.mItem3 = new Item(this.logo1);
    this.mItem3.getXform().setXPos(55);
    this.mItem3.getXform().setYPos(35);
    
    this.mItem4 = new Item(this.logo1);
    this.mItem4.getXform().setXPos(65);
    this.mItem4.getXform().setYPos(35);
    
    this.mItem5 = new Item(this.logo1);
    this.mItem5.getXform().setXPos(75);
    this.mItem5.getXform().setYPos(35);
    
    var sq1Bbox = this.msquare1.getBBox();
    var sq2Bbox = this.msquare2.getBBox();
    var sq3Bbox = this.msquare3.getBBox();
    var sq4Bbox = this.msquare4.getBBox();
    var sq5Bbox = this.msquare5.getBBox();
    var sq6Bbox = this.msquare6.getBBox();
    var sq7Bbox = this.msquare7.getBBox();
    var sq8Bbox = this.msquare8.getBBox();
    
    this.BboxSet = new GameObjectSet();
    this.BboxSet.addToSet(sq1Bbox);
    this.BboxSet.addToSet(sq2Bbox);
    this.BboxSet.addToSet(sq3Bbox);
    this.BboxSet.addToSet(sq4Bbox);
    this.BboxSet.addToSet(sq5Bbox);   
    this.BboxSet.addToSet(sq6Bbox);
    this.BboxSet.addToSet(sq7Bbox);
    this.BboxSet.addToSet(sq8Bbox);
    
    this.mMsg = new FontRenderable("Status Message");
    this.mMsg.setColor([1, 0, 0, 1]);
    this.mMsg.getXform().setPosition(5, 5);
    this.mMsg.setTextHeight(3);
     
    // 光效
    this._initializeLights(this.mHero.getXform().getPosition());
 
    var bgR = new IllumRenderable(this.kBg, this.kBgNormal);
    bgR.setElementPixelPositions(0, 1024, 0, 1024);
    bgR.getXform().setSize(100, 100);
    bgR.getXform().setPosition(50, 50);
    //bgR.getMaterial().setSpecular([1, 0, 0, 1]);
    var i;
    for (i = 0; i < 1; i++) {
        bgR.addLight(this.mGlobalLightSet.getLightAt(i));   // all the lights
    }
    this.mBg = new GameObject(bgR);  
    
//    var herolight = new Light();
//    herolight.setLightType(Light.eLightType.ePointLight);
//    herolight.setColor([1, 1, 0, 1]);
//    herolight.setXPos(this.mHero.getXform().getXPos());
//    herolight.setYPos(this.mHero.getXform().getYPos());      
//    herolight.setZPos(5);
//    herolight.setDirection([0, 0, -1]);
//    herolight.setNear(8);
//    herolight.setFar(20);
//    herolight.setInner(0.1);
//    herolight.setOuter(0.2);
//    herolight.setIntensity(5); 
     this.mItem1BBox = this.mItem1.getBBox();
     this.mItem2BBox = this.mItem2.getBBox();
     this.mItem3BBox = this.mItem3.getBBox();
     this.mItem4BBox = this.mItem4.getBBox();
     this.mItem5BBox = this.mItem5.getBBox();
};

PlayGame.prototype._createALight = function (type, pos, dir, color, n, f, inner, outer, intensity, dropOff) {
    var light = new Light();
    light.setLightType(type);
    light.setColor(color);
    light.setXPos(this.mHero.getXform().getXPos());
    light.setYPos(this.mHero.getXform().getYPos());      
    light.setZPos(pos[2]);
    light.setDirection(dir);
    light.setNear(n);
    light.setFar(f);
    light.setInner(inner);
    light.setOuter(outer);
    light.setIntensity(intensity);
    light.setDropOff(dropOff);
    return light;
};

PlayGame.prototype._initializeLights = function (posHero) {
    this.mGlobalLightSet = new LightSet();

    var l = this._createALight(Light.eLightType.ePointLight,
            [posHero[0], posHero[1], 5],         // position
            [0, 0, -1],          // Direction 
            [1, 0, 0, 1],  // some color
            8, 10,               // near and far distances
            0.1, 0.2,            // inner and outer cones
            5,                   // intensity
            0.1                 // drop off
            );
    this.mGlobalLightSet.addToSet(l);

//    l = this._createALight(Light.eLightType.eDirectionalLight,
//            [posHero[0], posHero[1], 4],           // position (not used by directional)
//            [-0.2, -0.2, -1],      // Pointing direction upwards
//            [0.7, 0.7, 0.0, 1],    // color
//            500, 500,              // near anf far distances: essentially switch this off
//            0.1, 0.2,              // inner and outer cones
//            2,                     // intensity
//            1.0                    // drop off
//            );
//    this.mGlobalLightSet.addToSet(l);

//    l = this._createALight(Light.eLightType.eSpotLight,
//            [posHero[0], posHero[1], 10],            // Right minion position
//            [-0.07,  0, -1],     // direction
//            [0.5, 0.5, 0.5, 1],     // color
//            100, 100,                  // near and far distances
//            1.65, 1.7,               // inner outter angles (in radius)
//            5,                     // intensity
//            1.2                     // drop off
//            );
//    this.mGlobalLightSet.addToSet(l);
//
//    l = this._createALight(Light.eLightType.eSpotLight,
//            [posHero[0], posHero[1], 10],            // Center of camera 
//            [0.0, 0.03, -1],
//            [0.8, 0.8, 0.2, 1],      //  color
//            100, 100,                   // near and far distances
//            1.9, 2.0,                // inner and outer cones
//            2,                       // intensity
//            1                      // drop off
//            );
//    this.mGlobalLightSet.addToSet(l);
};


PlayGame.prototype._modify = function (xpos, ypos){
    this.mGlobalLightSet[0].setXPos(xpos);
    this.mGlobalLightSet[0].setYPos(ypos);
};


PlayGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    
    this.mCamera.setupViewProjection();
    this.mBg.draw(this.mCamera);
    this.msquare1.draw(this.mCamera);
    this.msquare2.draw(this.mCamera);
    this.msquare3.draw(this.mCamera);
    this.msquare4.draw(this.mCamera);
    this.msquare5.draw(this.mCamera);
    this.msquare6.draw(this.mCamera);
    this.msquare7.draw(this.mCamera);
    this.msquare8.draw(this.mCamera);
    
    this.mHero.draw(this.mCamera);
    this.mItem1.draw(this.mCamera);
    this.mItem2.draw(this.mCamera); 
    this.mItem3.draw(this.mCamera);
    this.mItem4.draw(this.mCamera);
    this.mItem5.draw(this.mCamera);
    
    this.mMsg.draw(this.mCamera);
};

PlayGame.prototype.update = function () {
    this.mCamera.update();
    this.mHero.update();
    //this.mBg.update();
    this.mMsg.setText(this.kDelta);

    var v = this.mGlobalLightSet.getLightAt(0).getColor();
    
       
    
    var xform = this.mHero.getXform();
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W) && this.mHero.getXform().getYPos() <= 98) {
        xform.incYPosBy(this.kDelta);
        var hBbox = this.mHero.getBBox();
        var sq1Bbox = this.msquare1.getBBox();
        var sq2Bbox = this.msquare2.getBBox();
        var sq3Bbox = this.msquare3.getBBox();
        var sq4Bbox = this.msquare4.getBBox();
        var sq5Bbox = this.msquare5.getBBox();
        var sq6Bbox = this.msquare6.getBBox();
        var sq7Bbox = this.msquare7.getBBox();
        var sq8Bbox = this.msquare8.getBBox();
        if(hBbox.intersectsBound(sq1Bbox) ||
                hBbox.intersectsBound(sq2Bbox) ||
                hBbox.intersectsBound(sq3Bbox) ||
                hBbox.intersectsBound(sq4Bbox) ||
                hBbox.intersectsBound(sq5Bbox) ||
                hBbox.intersectsBound(sq6Bbox) ||
                hBbox.intersectsBound(sq7Bbox) ||
                hBbox.intersectsBound(sq8Bbox) 
                ){
            xform.incYPosBy(-this.kDelta);      
        }
        this.mGlobalLightSet.getLightAt(0).setXPos(this.mHero.getXform().getXPos());
        this.mGlobalLightSet.getLightAt(0).setYPos(this.mHero.getXform().getYPos());
            
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S) && this.mHero.getXform().getYPos() >= 2) {
        xform.incYPosBy(-this.kDelta);
//        var hBbox = this.mHero.getBBox();
//        var sq1Bbox = this.msquare1.getBBox();
//        if(hBbox.intersectsBound(sq1Bbox)){
//            xform.incYPosBy(this.kDelta);
//        }
        var hBbox = this.mHero.getBBox();
        var sq1Bbox = this.msquare1.getBBox();
        var sq2Bbox = this.msquare2.getBBox();
        var sq3Bbox = this.msquare3.getBBox();
        var sq4Bbox = this.msquare4.getBBox();
        var sq5Bbox = this.msquare5.getBBox();
        var sq6Bbox = this.msquare6.getBBox();
        var sq7Bbox = this.msquare7.getBBox();
        var sq8Bbox = this.msquare8.getBBox();
        if(hBbox.intersectsBound(sq1Bbox) ||
                hBbox.intersectsBound(sq2Bbox) ||
                hBbox.intersectsBound(sq3Bbox) ||
                hBbox.intersectsBound(sq4Bbox) ||
                hBbox.intersectsBound(sq5Bbox) ||
                hBbox.intersectsBound(sq6Bbox) ||
                hBbox.intersectsBound(sq7Bbox) ||
                hBbox.intersectsBound(sq8Bbox) 
                ){
            xform.incYPosBy(this.kDelta);     
        }
        this.mGlobalLightSet.getLightAt(0).setXPos(this.mHero.getXform().getXPos());
        this.mGlobalLightSet.getLightAt(0).setYPos(this.mHero.getXform().getYPos());

    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A) && this.mHero.getXform().getXPos() >= 2) {
        xform.incXPosBy(-this.kDelta);
//        var hBbox = this.mHero.getBBox();
//        var sq1Bbox = this.msquare1.getBBox();
//        if(hBbox.intersectsBound(sq1Bbox)){
//            xform.incXPosBy(this.kDelta);
//        }
        var hBbox = this.mHero.getBBox();
        var sq1Bbox = this.msquare1.getBBox();
        var sq2Bbox = this.msquare2.getBBox();
        var sq3Bbox = this.msquare3.getBBox();
        var sq4Bbox = this.msquare4.getBBox();
        var sq5Bbox = this.msquare5.getBBox();
        var sq6Bbox = this.msquare6.getBBox();
        var sq7Bbox = this.msquare7.getBBox();
        var sq8Bbox = this.msquare8.getBBox();
        if(hBbox.intersectsBound(sq1Bbox) ||
                hBbox.intersectsBound(sq2Bbox) ||
                hBbox.intersectsBound(sq3Bbox) ||
                hBbox.intersectsBound(sq4Bbox) ||
                hBbox.intersectsBound(sq5Bbox) ||
                hBbox.intersectsBound(sq6Bbox) ||
                hBbox.intersectsBound(sq7Bbox) ||
                hBbox.intersectsBound(sq8Bbox) 
                ){
            xform.incXPosBy(this.kDelta);     
        }
        this.mGlobalLightSet.getLightAt(0).setXPos(this.mHero.getXform().getXPos());
        this.mGlobalLightSet.getLightAt(0).setYPos(this.mHero.getXform().getYPos());
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D) && this.mHero.getXform().getXPos() <= 98) {
        xform.incXPosBy(this.kDelta);
//        var hBbox = this.mHero.getBBox();
//        var sq1Bbox = this.msquare1.getBBox();
//        if(hBbox.intersectsBound(sq1Bbox)){
//            xform.incXPosBy(-this.kDelta);
//        }
        var hBbox = this.mHero.getBBox();
        var sq1Bbox = this.msquare1.getBBox();
        var sq2Bbox = this.msquare2.getBBox();
        var sq3Bbox = this.msquare3.getBBox();
        var sq4Bbox = this.msquare4.getBBox();
        var sq5Bbox = this.msquare5.getBBox();
        var sq6Bbox = this.msquare6.getBBox();
        var sq7Bbox = this.msquare7.getBBox();
        var sq8Bbox = this.msquare8.getBBox();
        if(hBbox.intersectsBound(sq1Bbox) ||
                hBbox.intersectsBound(sq2Bbox) ||
                hBbox.intersectsBound(sq3Bbox) ||
                hBbox.intersectsBound(sq4Bbox) ||
                hBbox.intersectsBound(sq5Bbox) ||
                hBbox.intersectsBound(sq6Bbox) ||
                hBbox.intersectsBound(sq7Bbox) ||
                hBbox.intersectsBound(sq8Bbox) 
                ){
            xform.incXPosBy(-this.kDelta);     
        }
        this.mGlobalLightSet.getLightAt(0).setXPos(this.mHero.getXform().getXPos());
        this.mGlobalLightSet.getLightAt(0).setYPos(this.mHero.getXform().getYPos());
    }
    
    
    
    // 道具一：加速
    var hBbox = this.mHero.getBBox();
    if(hBbox.intersectsBound(this.mItem1BBox) || gEngine.Input.isKeyPressed(gEngine.Input.keys.U)){
        this.kDelta = 0.5;
        this.mItem1.getXform().setXPos(-1);
        this.mItem1.getXform().setYPos(-1);
        this.mItem1BBox = this.mItem1.getBBox();
    }
    //道具二：减速
    if(hBbox.intersectsBound(this.mItem2BBox) || gEngine.Input.isKeyPressed(gEngine.Input.keys.I)){
        this.kDelta = 0.1;
        this.mItem2.getXform().setXPos(-1);
        this.mItem2.getXform().setYPos(-1);
        this.mItem2BBox = this.mItem2.getBBox();
    }
    
    if(hBbox.intersectsBound(this.mItem3BBox) || gEngine.Input.isKeyPressed(gEngine.Input.keys.O)){
        this.mGlobalLightSet.getLightAt(0).setIntensity(7);
        this.mGlobalLightSet.getLightAt(0).setFar(15);
        this.mItem3.getXform().setXPos(-1);
        this.mItem3.getXform().setYPos(-1);
        this.mItem3BBox = this.mItem3.getBBox();
    }
    
    if(hBbox.intersectsBound(this.mItem4BBox) || gEngine.Input.isKeyPressed(gEngine.Input.keys.P)){
        this.mGlobalLightSet.getLightAt(0).setIntensity(3);
        this.mGlobalLightSet.getLightAt(0).setNear(3)
        this.mGlobalLightSet.getLightAt(0).setFar(8);
        this.mItem4.getXform().setXPos(-1);
        this.mItem4.getXform().setYPos(-1);
        this.mItem4BBox = this.mItem4.getBBox();
    }
    
    if(hBbox.intersectsBound(this.mItem5BBox) || gEngine.Input.isKeyPressed(gEngine.Input.keys.L)){
        
        var random = Math.random();
        if(random < 0.33){
            this.mHero.getXform().setXPos(52);
            this.mHero.getXform().setYPos(55);
        }else if(random < 0.667 && random > 0.33){
            this.mHero.getXform().setXPos(25);
            this.mHero.getXform().setYPos(85);
        }else{
            this.mHero.getXform().setXPos(85);
            this.mHero.getXform().setYPos(85);
        }
        
        this.mItem5.getXform().setXPos(-1);
        this.mItem5.getXform().setYPos(-1);
        this.mItem5BBox = this.mItem5.getBBox();
    }
};
