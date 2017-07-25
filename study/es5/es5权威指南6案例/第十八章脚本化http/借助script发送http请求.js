(function (w){
// 例子: 18-14 使用script元素发送http请求
//然后解析得到的响应数据传递回调函数
//在url中添加一个名字jsonp的查询参数，用于指定该回调函数的名称
function getJSONP(url,callback){
//为本次创建一个唯一的回调函数
 var cbnum="cb" +getJSONP.counter++ //每次自增计数器
 var cbname ="getJSONP."+cbnum ;// 作为JSONP函数的属性
 //将回调函数名称以表单编码的形式添加到url的查询部分中
 //使用jsonp作为参数，比如callback
 if(url.indexOf("?"===-1))
 //url 没有查询部分
 url +="?jsonp="+cbname //作为查询部分添加参数
 else //否则
 	url +="&jsonp="+ cbname;// 作为新的参数添加它
 //创建script元素用于发送请求
 var script =document.createElement("script")；
 //定义将被脚本执行的回电函数
 getJSONP[cbnum] =function (response){
  try{
      callback(response) //处理响应数据
  }finally{// 即使回调函数或响应抛出错误
    delete getJSONP[cbnum];
    script.parentNode.removeChild(script);//移除script元素    
  }
 }
//立即出发http请求
script.url=url; //设置脚本的url;
document.body.appendChild(script);// 把它添加到文档中
}
getJSONP.counter=0;//用于创建唯一的回调函数名称的计数器







}(window))