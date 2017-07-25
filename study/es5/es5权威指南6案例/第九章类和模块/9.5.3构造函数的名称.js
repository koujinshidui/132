(function(w){

function type(o){
var t,c,n; //type, class,name
//处理null值的特殊情形
if(o===null) return 'null';
// 另一种特殊情形，NaN和它自身也不相等
if(o!==o) return "nan";
//如果typeof的值不是object,则使用这个值；
//这可以识别出原始值的类型和函数
if((t= typeof o)!=="object") return t;
// 返回对象的类名。除非值为"object"
// 这种方式可以识别出大多数的内置对象
if((c==classof(o))!=="Object") return c;

//如果对象构造函数的名字存在的话，则返回它，
if(o.constructor && typeof o.constructor==="function" && (n= o.constructor.getName() )) return n;

//其他类型都无法识别，一律返回"Object"
return "Object";

}

// 这种使用构造函数类识别对象的类的做法和使用constructor属性一样有一个为题：并不是所有所有的对象都具有constructor属姓，并不是所有的函数都有名字。
// 如果使用不带名字的函数定义表达式定义一个构造函数，getName方法则会返回空字符串：
// 这个函数没有名字
 var Complex=function(x,y)}{ this.r=x;this.i=y}
// 这个函数没有名字
 var Range=function(f,t)}{ this.from=f;this.to=t}
//返回对象的类
 function  classof (o) {
 	return Object.prototype.toString.call(o).slice(8,-1);
 }
//返回函数的名字(可能是空字符串),不是函数的话就返回null
Function.prototype.getName=function(){
	if("name" in this) return this.name;
	return this.name=this.toString().match(/function\s*([^(]*)\(/)[1];
};
w.type = type,w.classof=classof;

}(window))