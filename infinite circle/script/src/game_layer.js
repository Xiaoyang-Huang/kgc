var STAGE_PADDING = 20;
var ITEM_SIZE = 128;

var GameLayer = cc.Sprite.extend({
    ctor: function(){
        this._super();

        var _width_count = 10;
        var _height_count = 10;

        var _stage_size = cc.director.getWinSize();
        var _max_width = _stage_size.width - STAGE_PADDING * 2;
        var _max_height = _stage_size.height - STAGE_PADDING * 2;

        var _width_scale = 1;
        var _height_scale = 1;
        var _item_scale = 1;
        console.log(_max_width, _max_height);
        if(_width_count * ITEM_SIZE > _max_width){
            _width_scale = (_max_width / (_width_count * ITEM_SIZE));
        }
        if(_height_count * ITEM_SIZE > _max_height){
            _height_scale = (_max_height / (_height_count * ITEM_SIZE));
        }
        _item_scale = Math.min(_width_scale, _height_scale);


        for(var x=0; x<_width_count; x++){
            for(var y=0; y<_height_count; y++){
                var _item = new Item();
                _item.attr({
                    x: (ITEM_SIZE * _item_scale) * x + (ITEM_SIZE * _item_scale) / 2 + STAGE_PADDING,
                    y: (ITEM_SIZE * _item_scale) * y,
                    scale: _item_scale
                })
                this.addChild(_item);
            }
        }

        this.width = _max_width;
        this.height = _max_height;
    }
})