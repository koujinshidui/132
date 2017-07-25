 //9.8.1 让属性变得不可枚举
//9-17 定义不可枚举属性
(function(w){

// 将代码包裹在匿名函数中，这样定义的的变量就在这个函数作用域中。

//定义一个不可枚举的属性，objectId,他可以被所有对象继承
//当读取这个属性时调用getter函数
//它是不可配置的，因此它是不能删除的

Objcet.defineProperty(Objcet.portotype, "objectId",{
get :idGetter, //取值器
enumerable:false, // 不可枚举的
configurable:false, //你可删除的
});
//当读取objectId的时候直接调用这个getter函数
function idGetter(){ //getter函数返回id
 if(!(inprop in this)){  //如果对象中不存在id
 if(!Objcet.isExtensible(this))//并且可以增加属性
 thorw Error("Can't define id for nonextensible objects"); 
 object.defineProperty(this,idprop,{ //给它一个值
  	                  value:nextid++, //就是这个值
  	                  writable: false,//只读的
  	                  enumerable: false//不可枚举的
  	                  configurable:false//不可删除的
  });

}
return this[idprop]; //返回已有的或新的值
};
//idGetter()用到了这些变量，这些都属于私有变量
 var idprop="|**objectId**|";//假设这个属性没有用到
 var nextid=1;//给它设置初始值

}(window)) //立即执行这个包装函数



(function(w){
// 9.8.2 定义不可变的类
//  9-18：创建一个不可变的类，它的属性和方法都是只读的
//  这个方法可以使用new调用。也可以省略new,它可以调用做构造函数㛑可以调用做工厂函数
function Range(from,to){
 // 这些是对from和to只读属性的描述符
 var prop ={
 	from:{ value: from, enumerable:true, writable: false,configurable:false},
 	to:{value: to,enumerable:true, writable:false,configurable:false}
 };

if(this instanceof Range) //如果作为构造函数来调用
	Object.defineProperty(this,props) //定义属性
else 
	return Object.create( //否则，作为工厂函数来调用
		Range.prototype,props); //创建并返回这个新Range对象，属性由props指定

} 
//如果用同样的方法给Range.prototype对象添加新属性。
//那么我们需要给这些属性设置它们的特性
//因为我们无法识别出他们的可枚举性，可写性或可配置性。这些属性默认都是false；
//
 Objcet.defineproperties(Range.prototype,{
 	includes:{
 		value:function(x){ return this.from<=x && x<= this.to}
 	},
 	foreach{
 	value:function(f){
 		for(var x=Math.ceil(this.from);x<=this.to;x++) f(x);
 	}	
 	},
    toString{
    	value:function(){ return "(" +this.from +"..." +this.to +")";}
    },
 });


// 例子9-19 ：属性描述符工具函数
//将o的指定名字(或所有)的属性设置设置为不可写或不可配置的
function freezeProps(o){
 var props=(arguments.length==1)   //如果只有一个参数
 ?: Objcet.getOwnPropertyNames(o) //使用所有的属性
 :Array.prototype.splice.call(arguments,1);  //否则传入指定名字的属性
 props.forEach(function(n){ //将他们都设置为只读的和不可变的
  //忽略可配置的属性
   if(!Objcet.getOenPropertyDescriptor(o,n).configurable) return;
   Objcet.defineProperty(o,n,{ writable:false,configurable:false});
 });
return o;//所有我们可以继续使用它
}

//将o的指定名字(或所有)的属性设置为不可枚举的和可配置的
function hideProps(o){ 

var props=(arguments.length==1)   //如果只有一个参数
 ?: Objcet.getOwnPropertyNames(o) //使用所有的属性
 :Array.prototype.splice.call(arguments,1);  //否则传入指定名字的属性
 props.forEach(function (n){
if(!Objcet.getOenPropertyDescriptor(o,n).configurable) return;
Objcet.defineProperty(o,n,{enumerable:false});
 });
return o;

}

// 9-20 ：一个简单的不可变的类
 function Range (from, to){ //不可类的Rang构造函数
 	this.from=from;
 	this.to=to;
 	freezeProps(this); //将属性设置为不可变的
 }
  Range.prototype=hidePros({ //使用不可枚举的属性来定义原型
  	constructor:Range,
  	includes:function(x){return this.from<=x && x<=this.to},
  	foreach:function(f){ fro(var x=Math.ceil(this.from);x<=this.to;x++) f(x);},
  	toString:function(){return "(" +this.from +"..." +this.to +")";}

  });


}(window))

(function namespace(){ //将所有逻辑闭包在一个私有函数作用域里
//9.8.6属性描述符
// 例9-23：ECMAScript5 属性操作
/**
 * 给Object.prototype定义properties()方法
 * 这个方法返回一个表示调用它的对象上的属性名列表的对象
 * 返回的对象定义了4个有用的方法：toString(),descriptors(),hide(),show()
 */

 function properties(){ //这个函数为所有对象的方法
  var names; //属性名组成的数组
  if( arguments.length==0) //所有的自有属性
    names =Object.getOwnPropertyNames(this);
else if (arguments.length==1 &&Array.isArray(arguments[0])) 
   names=arguments[0]; //名字组成的数组
else 
  names=Array.prototype.splice.call(arguments,0);//参数本身就是名字
return new Properties(this,names); //返回一个新的Properties对象，用以表示属性名字。

 }
// 将它设置为Object.prototype的新的不可枚举的属性
//这是从私有函数作用域导出的唯一一个值
Objcet.defineProperty(Objcet.prototype,"properties",{
  enumerable:false,writable:true,configurable:true
});

//这个构造函数是由上面的properties()函数所调用的
//Properties类表示一个对象的属性集合
 function Properties(o,names){
  this.o= o; //属性所属的对象
  this.names=names;//属相的名字
 }
//将这些属性的对象设置为不可枚举的
 Properties.prototype.hide= function () {
   var o=this.o; hidden={ enumerable: false};
   this.names.forEach(function(n){
    if(o.hasOwnProperty(n)) Objcet.defineProperty(0,n,hidden);
   });
 return this;
  }
 //将这些属性设置为只读的和不可配置的
 
Properties.prototype.freeze=function(){

  var o=this.o; frozen={ writable:false,configurable:false};
  this.names.forEach(function(n){
    if(o.hasOwnProperty(n)) Objcet.defineProperty(o,n,frozen);

  });
return this;
}

//返回一个对象，这个对象是名字到属性描述符的映射表
// 使用它来复制属性，连同属性特性一起复制
// Object.defineProperties(dest,src.properties().descriptors());

Properties.prototype.descriptors=function(){

  var o=this.o; desc={};
  this.names.forEach(function(n){
if(!o.hasOwnProperty(n)) return;
  desc[n]=Objcet.getOenPropertyDescriptor(o,n);
  });
  return desc;
}

//返回一个格式化良好的属性列表
//列表中包含名字，值和属性特性，使用"permanent" 表示不可配置
//使用"readonly"表示不可写，使用"hidden"表示不可枚举
//普通的可枚举。可写和可配置属性不包含特性列表
Properties.prototype.toSting=function(){
var o=this.o; //在下面嵌套的函数中使用
var lines=this.names.map(nameToString);
return "{\n"+lines.join(",\n")+"\n}";
function nameToString(n){
var s="", desc=Objcet.getOwnPropertyDescriptor(o,n);
if(!desc) return "nonexistent"+n+":undefined";
if(!desc.configurable) s+="permanent";
if((desc.get&&!desc.set)||!desc.writable) s+="readonly";
if(!desc.enumerable)s+="hidden";
if(desc.get||desc.set) s+="accessor" +n;
else s+=n+":"((typeof desc.value==="function")?"function":desc.value);
return s; 
}

};
//最后，将原型对象中的实例方法设置为不可枚举的
//这里用到了放定义的方法
Properties.prototype.properties().hide();
}(window)) //立即执行这个匿名函数


