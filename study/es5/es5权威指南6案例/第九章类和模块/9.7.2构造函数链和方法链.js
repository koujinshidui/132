

(function(w){

//例子：9-13 在子类中调用父类的构造函数和方法

// NonNullSet 是Set的子类，它的成员不能是null 和undeifned 

function NonNullSet(){
 //仅连接到父类
 //作为普通函数调用父类的构造函数来初始化通过该构造函数调用创建的对象
Set.apply(this,arguments);
}

//将NonNullSet设置为Set的子类
NonNullSet.protoytpe=inherit(Set.protoytpe);
NonNullSet.prototype.constructor=NonNullSet;

//为了将null和undefined排除在外，值须重写add()方法
NonNullSet.protoytpe.add=function(){

//参数不是null和undedined
for(var i=0;i<arguments.length;i++){
	if(arguments[i]==null)
		throw  new Error('Can't add null or undefined to a NonNullSet);
	//调用父类的add方法以实际插入操作
	return Set.prototype.add.apply(this,arguments);
}
}


// 例子 9-14 类工厂和方法链

//这个函数返回具体Set类的子类
// 并重写该类的add方法用以重写对添加的元素做特殊的处理
// 
function filteredSetSubclass(superclass,filter){
var constructor =function(){ //子类构造函数 s
superclass.apply(this,arguments); //调用父类构造函数

};

var proto=constructor.prototypw=inherit(superclass.prototype);
prototype.constructor=constructor;
proto.add=function(){
// 在添加任何成员之前首先使用过滤器将所有参数进行过滤。
for(var i=0;i<arguments.length;i++){
var i=arguments[i];
if(!filter(v)) throw ("value"+v+"rejected by filter");
}
//调用父类的add方法
 superclass.prototype.add.apply(this,arguments);
};
return constructor;
}

// 比如。可以使用包装函数和例9-11的Function.prototype.extend()方法来重写NonNullSet;
var NonNullSet =(function(){
var superclass=Set;
return superclass.extend(function(){ superclass.apply(this,arguments);} //构造函数
         { //方法
           add:function(){
             //检查参数是否是null或是undefined 
             for(var i=0;i<arguments.length;i++){
				if(arguments[i]==null)
					throw new Error("Can't add null or undefined");
				//调用父类的add方式以执行插入操作。
				return superclass.prototypw.add.apply(this,arguments);
             }
           }

         }
	)
}())


}(window))