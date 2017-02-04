var GameScene = cc.Scene.extend({
    ctor: function(){
        this._super();

        var _bg = new cc.LayerColor();
        _bg.setColor(cc.color(0, 123, 0));
        this.addChild(_bg);

        var _layer = new GameLayer();
        _layer.setPosition(this.height / 2, this.width / 2);
        this.addChild(_layer);
    }
})