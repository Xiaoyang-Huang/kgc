cc.game.onStart = function(){

    cc.view.setDesignResolutionSize(window.innerWidth, window.innerHeight, cc.ResolutionPolicy.NO_BORDER);

    //load resources
    cc.loader.resPath = "/resources";
    cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new GameScene());
    }, this);
};
cc.game.run();
