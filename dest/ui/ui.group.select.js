define(["UILayer",getAppUITemplatePath("ui.group.select"),"UISelect"],function(a,b,c){return _.inherit(a,{propertys:function($super){$super(),this.template=b,this.datamodel={title:"scrollLayer",tips:"tips",btns:[{name:"cancel",className:"cui-btns-cancel"},{name:"ok",className:"cui-btns-ok"}]},this.data=[],this.indexArr=[0,0,0],this.idArr=[],this.scrollArr=[],this.changedArr=[function(a){0},function(a){0},function(a){0}],this.onOkAction=function(a){0,0},this.onCancelAction=function(a){0,0},this.displayNum=3,this.events={"click .cui-btns-ok":"okAction","click .cui-btns-cancel":"cancelAction"}},okAction:function(){var a=[];for(i=0,len=this.scrollArr.length;len>i;i++)a.push(this.scrollArr[i].getSelected());this.onOkAction.call(this,a)},cancelAction:function(){var a=[];for(i=0,len=this.scrollArr.length;len>i;i++)a.push(this.scrollArr[i].getSelected());this.onCancelAction.call(this,a)},initElement:function(){this.scrollWrapper=this.$(".cui-roller")},_initScroll:function(){this._destroyScroll();var a,b,d;for(a=0,b=this.data.length;b>a;a++)d=this.data[a],this.scrollArr[a]=new c({datamodel:{data:d,index:this.indexArr[a],id:this.idArr[a]},displayNum:this.displayNum,changed:$.proxy(this.changedArr[a],this),wrapper:this.scrollWrapper}),this.scrollArr[a].show()},_destroyScroll:function(){var a,b;for(a=0,b=this.data.length;b>a;a++)this.scrollArr[a]&&(this.scrollArr[a].hide(),this.scrollArr[a]=null)},initialize:function($super,a){$super(a)},addEvent:function($super){$super(),this.on("onShow",function(){this._initScroll()},1),this.on("onHide",function(){this._destroyScroll()},1)}})});