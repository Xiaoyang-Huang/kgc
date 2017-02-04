var Item = cc.Sprite.extend({
	ctor: function(){
		var random = Math.random() * 5;
		switch(Math.floor(random)){
			case 0:
				this._super(r.item.one.normal);
				break;
			case 1:
				this._super(r.item.twoStraight.normal);
				break;
			case 2:
				this._super(r.item.twoBent.normal);
				break;
			case 3:
				this._super(r.item.three.normal);
				break;
			case 4:
				this._super(r.item.four.normal);
				break;
		}
		
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			onTouchBegan: this.onClick
		}, this)
	},
	containsTouchLocation: function(touch){
		var point = this.convertTouchToNodeSpace(touch);
		var rect = cc.rect(0, 0, this.width, this.height);
		return cc.rectContainsPoint(rect, point);
	},
	onClick: function(touch, event){
		var self = event.getCurrentTarget();
		if(self.containsTouchLocation(touch)){
			var rotateAction = cc.rotateBy(0.1, 90);
			var callback = new cc.CallFunc(self.onRotated, self, null);
			var sequence = new cc.Sequence(rotateAction, callback);
			self.runAction(sequence);
		}
	},
	onRotate: function(){

	}
})