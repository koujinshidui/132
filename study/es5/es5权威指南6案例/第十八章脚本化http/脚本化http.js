
 (function (w){

 //在ie5和ie6中有一个ActiveX对象。IE7版本之前不支持标准的XMLHttpRequest()构造函数,但它能像如下模拟
 // 在ie5和ie6中模拟XMLHttpRequest()构造函数
 if(window.XMLHttpRequest===undefined){
   window.XMLHttpRequest=function(){
      try{
      	//如果可用，则使用Active对象的最新版本
      	return new ActiveXObject("Msxml2.XMLHTTP.6.0");
      }
         catch(e){
         	try{
           //否则回退到教旧的版本
         	return new ActiveXObject("Msxml2.XMLHTTP.3.0");
         	}catch(e1){
                    //否则，报错
              throw  new Error("XMLHttpRequest is not supported");
         	}
         }
   }
 }

 // ajax同步响应
 // ajax 支持异步和同步的请求，当同步请求时，在open()方法的第三个参数传入false，那么send()方法将阻塞知道请求完成。
 // 在这种情况下，不要使用事件处理程序，一旦send()返回。仅需要检查XMLHttpRequest对象的status和responseText属性。
 // 一下是同步代码. 同步请求时吸引人的。但应该避免使用它们，客户端javascript是单线程的，当send()方法阻塞时，它通常会导致整个浏览器ui冻结。如果连接的服务器响应慢。那么用户的浏览器将冻结。将影响用户体验。

 function getTextSync(url){
var request = new XMLHttpRequest();
request.open("GET",url,false);//传递false实现同步
request.send(null); //立即发送请求.
//如果请求不是200ok ，就报错
if(request.status!==200) throw  new Error(request.statusText);
var type = request.getResponseHeaders("Content-type");
if(!type.match(/^text/)) 
throw new Error("Expected textual response;got: "+type);
return request.responseText;
 }

// 18-4 : 用于http请求的编码对象
/**
 * 异步响应
 * 编码对象的属性
 * 如果他们来自html表单的名/值对，使用application/x-www-form-urlencoded格式
 *  工具函数  把对象数据 转化为以&为分割，名=值形式的字符串
 */
function encodeFormData(data){
if(!data) return ""; //一直返回字符串
var pairs=[]; ///为了保存名=值对
for(var name in data){ //为每个名字
	if(!data.hasOwnProperty(name))continue;//跳出继承的属性
	if(typeof data[name]==="function")continue;//跳出方法
	var value =data[name].toString(); //把值转换成字符串
	name = encodeURLComponent(name.replace("%20","+")) //编码名字
	value =encodeURLComponent(value.replace("%20","+"));//编码值
    pairs.push(name+"="+value); //记住名=值对   
}

return pairs.join("&"); //返回使用“&”连接的名/值对
}


// 例子 18-5; postData()函数不能处理服务器的响应，当响应完成.它传递整个XMLHttpRequest对象给指定的函数 异步响应
//  使用表单数据发送一个HTTP POST请求

function postData(url,data,callback){
var request = new XMLHttpRequest();
request.open("POST",url); //对指定url发生POST请求
request.onreadystatechange=function(){ 
	if(request.readyState===4&&callback)
		callback(request); //调用回调函数，并把整个ajax对象传入处理
}
request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
request.send(encodeFormData(data)); //把传入对象的转为一&分割，名值对(=)字符串;
}


//例子 18-6; 使用表单数据发送GET请求

function getData(url,data,callback){
var request=new XMLHttpRequest();
request.open("GET",url+"?"+encodeFormData(data));//通过添加编码数据获取指定的url  url后加 ？字符串以&分割以=分割名值是一种编程约定。url问号后面的部分可作为发送给web服务器的数据信息
request.onreadystatechange=function(){
	if(request.readyState===4&&callback) callback(request); // 通过传入的回调函数简单处理程序
}
request.send(null);//发送请求。 GET没有发送的主体，所以传递null或者省略这个参数。POST请求有主体；
}

//例子 18-7 使用JSON编码主体来发送HTTP POST请求
function postJSON(url,data,callback){
var request= new XMLHttpRequest();
request.open("POST",url); //对指定url发送POST请求
request.onreadystatechange=function  () {
  if(request.readyState===4 && callback) //响应完成时
  	callback(request) //调用回调函数

};
request.setRequestHeader("Content-Type","application/json"); //设置请求头
request.send(JSON.stringify(data)); //发送主体数据;
}




 }(window))
}


