define(["UIView",getAppUITemplatePath("ui.select"),"UIScroll"],function(a,b,c){return _.inherit(a,{propertys:function($super){$super(),this.template=b,this.datamodel={curClass:"current",data:[],id:null,index:4},this.animatTime=100,this.itemNum=this.datamodel.data.length,this.displayNum=5,this.scrollOffset=0,this.scroll=null,this.changed=function(a){0}},resetPropery:function(){this._resetNum(),this._resetIndex()},_resetIndex:function(){if(this.datamodel.id)for(var a=0,b=this.datamodel.data.length;b>a;a++)if(this.datamodel.id==this.datamodel.data[a].id){this.datamodel.index=a;break}},_resetNum:function(){this.displayNum=this.displayNum%2==0?this.displayNum+1:this.displayNum,this.itemNum=this.datamodel.data.length},checkData:function(){return!0},initElement:function(){this.swrapper=this.$el,this.scroller=this.$(".ul-list")},initSize:function(){this.sheight=this.scroller.height(),this.itemHeight=parseInt(this.sheight/this.itemNum),0==this.itemHeight&&(this.itemHeight=parseInt(window.getComputedStyle&&getComputedStyle(this.scroller.find("li").eq(0)[0]).height),this.scroller.height(this.itemHeight*this.itemNum)),this.swrapper.height(this.itemHeight*this.displayNum),this.scrollOffset=(this.displayNum-1)/2*this.itemHeight},adjustPosition:function(a){if(this.scroll){var b,c=this.datamodel.index,d=0;b=this.itemHeight*c*-1+this.scrollOffset,a&&(d=this.animatTime),this.scroll.scrollTo(0,b,d)}},_initScroll:function(){return this.scroll?void this.scroll.refresh():(this.scroll=new c({scrollbars:!1,scrollOffset:this.scrollOffset,step:this.itemHeight,wrapper:this.swrapper,bounceTime:200,scroller:this.scroller}),this.scroll.on("scrollEnd",$.proxy(function(){this.setIndex(this.getIndexByPosition(),!0)},this)),void this.scroll.on("beforeScrollStart",$.proxy(function(){this.setIndex(this.getIndexByPosition(),!0)},this)))},reload:function(a){this.datamodel.index=0,_.extend(this.datamodel,a),this.refresh()},checkDisable:function(a){a=a||"down";var b=this.datamodel.index;this.datamodel.data[b]&&"undefined"!=typeof this.datamodel.data[b].disabled&&1==this.datamodel.data[b].disabled&&("up"==a?(this.datamodel.index=this._checkSelectedDown(b),"number"!=typeof this.datamodel.index&&(this.datamodel.index=this._checkSelectedUp(b))):(this.datamodel.index=this._checkSelectedUp(b),"number"!=typeof this.datamodel.index&&(this.datamodel.index=this._checkSelectedDown(b)))),"number"!=typeof this.datamodel.index&&(this.datamodel.index=b)},_checkSelectedUp:function(a){for(var b=!1,c=a;-1!=c;c--)if(this.datamodel.data[c]&&("undefined"==typeof this.datamodel.data[c].disabled||0==this.datamodel.data[c].disabled)){a=c,b=!0;break}return b?a:null},_checkSelectedDown:function(a){for(var b=!1,c=a,d=this.datamodel.data.length;d>c;c++)if(this.datamodel.data[c]&&("undefined"==typeof this.datamodel.data[c].disabled||0==this.datamodel.data[c].disabled)){a=c,b=!0;break}return b?a:null},setIndex:function(a,b,c){"undefined"==typeof b&&a==this.datamodel.index&&(b=!0);var d,e=a,f=this.datamodel.index!=a,g=a>this.datamodel.index?"up":"down";a=parseInt(a),0>a||a>=this.itemNum||(d=this.datamodel.index,this.datamodel.index=a,this.checkDisable(g),f=d!=this.datamodel.index?!0:!1,e!=this.datamodel.index&&(b=!1),b||this.adjustPosition(!0),this.resetCss(),c!==!0&&f&&this.changed&&this.changed.call(this,this.getSelected()))},resetCss:function(){this.$("li").removeClass("current"),this.$('li[data-index="'+this.datamodel.index+'"]').addClass("current")},resetIndex:function(){this.setIndex(this.datamodel.index,!0,!0)},getIndex:function(){return this.datamodel.index},setId:function(a){if(a){var b,c,d=-1;for(b=0,c=this.datamodel.data.length;c>b;b++)if(this.datamodel.data[b].id==a){d=b;break}-1!=d&&(this.datamodel.index=d,this.setIndex(d,!1))}},getId:function(){return this.getSelected().id},getSelected:function(){return this.datamodel.data[this.datamodel.index]},getIndexByPosition:function(){var a=this.scroll.y-this.scrollOffset,b=Math.abs(a)/this.itemHeight;return b},initialize:function($super,a){$super(a)},addEvent:function($super){$super(),this.on("onCreate",function(){this.$el.addClass("cui-roller-bd"),this.$el.addClass("cui-roller")}),this.on("onShow",function(){this.checkData()&&(this.initSize(),this._initScroll(),this.adjustPosition(),this.resetCss(),this.resetIndex())},1),this.on("onHide",function(){this.scroll&&(this.scroll.destroy(),this.scroll=null)})}})});