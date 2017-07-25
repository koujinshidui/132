
(function (w){

// 10.1 正则表达式的定义
// 10.1.1 直接量字符
// 10.1.2字符类
// 表10-2 正则表达式的字符类  这里所说的字符类就是：将直接量字符单独放到方括号内就组成了字符类。一个字符类可以匹配它所包含的任意字符。 
// 字符 匹配 
// [ ...] 方括号的任意字符 
// [^...] 不在方括号的任意字符
// [\b]  退格直接量 特例

//10.1.3 重复  对应的就是量词
//
//10.1.4 选择，分组和引用
// 圆括号的作用    用于分组(?:)   用于在完整的模式中定义子模式    用于同一表达式的后部引用前面的子表达式。这是通过在字符"\"后加一位或多位数字来实现的。
// 这个数字指定了带圆括号的子表达式在正则表达式中的位置。( javascript 权威指南 258-page);
//10.1.5
//指定匹配位置 锚点
//10.1.6修饰符
// i,g,m修饰符
// 

// 10.3 RegExp =对象

var pattern = /Java+/g;
var text ="JavaScript is more fun than Java!";
var result,i=0;

console.log(text.match(pattern));
console.log(pattern.exec(text));

// while(result =pattern.exec(text)){
//  console.log(result);
//  console.log("Matched '"+result[0]+"'"+" at position "+ result.index+";next search begins at"+pattern.lastIndex);
// i++;
// if(i>4)break;
// }


var str="Is this all Is this there is?";

var patt1=/Is (this)/g;
console.log(patt1.exec(str));
console.log(str.match(patt1));


var str="1 plus 2 equal 3"
console.log(/\d+/g.exec(str));
console.log(str.match(/\d+/g));



// for(let k in {o:1,P:2}){
// console.log(Iterator());	
// }
// 


// function  range (min,max){ for( let i=Math.ceil(min);i<=max;i++) yield i;} 

//  for(let n in range(3,8))console.log(n)
//  
//  
//  
//  
// var a = [];
// for (var i = 0; i < 10; i++) {
//     a[i] = (function (i) {
//      return function () { console.log(i) }

// }(i));


// }

console.log(a[6]())
}(window))

