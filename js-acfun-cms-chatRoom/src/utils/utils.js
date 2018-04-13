 export function parseTime(time, cFormat) {
   if (arguments.length === 0) {
     return null
   }
   const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
   let date
   if (typeof time === 'object') {
     date = time
   } else {
     if (('' + time).length === 10) time = parseInt(time) * 1000
     date = new Date(time)
   }
   const formatObj = {
     y: date.getFullYear(),
     m: date.getMonth() + 1,
     d: date.getDate(),
     h: date.getHours(),
     i: date.getMinutes(),
     s: date.getSeconds(),
     a: date.getDay()
   }
   const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
     let value = formatObj[key]
     if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
     if (result.length > 0 && value < 10) {
       value = '0' + value
     }
     return value || 0
   })
   return time_str
 }

 export function formatTime(time, option) {
   time = +time * 1000
   const d = new Date(time)
   const now = Date.now()

   const diff = (now - d) / 1000

   if (diff < 30) {
     return '刚刚'
   } else if (diff < 3600) { // less 1 hour
     return Math.ceil(diff / 60) + '分钟前'
   } else if (diff < 3600 * 24) {
     return Math.ceil(diff / 3600) + '小时前'
   } else if (diff < 3600 * 24 * 2) {
     return '1天前'
   }
   if (option) {
     return parseTime(time, option)
   } else {
     return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
   }
 }

 export function getUTCtimestamp(time) {
   let localStr, timestamp
   // localStr  = new Date(time).toString()
   timestamp = Date.parse(new Date(time))
   return timestamp
 }

 export function convertObjToArr(obj) {
   let tmpArr = []
   for (let i in obj) {
     tmpArr.push({
       name: obj[i],
       value: i
     })
   }
   return tmpArr
 }

 export function clone(myObj){
   //传入参数必须对对象才能实现clone出新对象
   if(typeof(myObj) != 'object' || myObj == null) return myObj;
   var newObj = new Object();
   for(var i in myObj){
     newObj[i] = clone(myObj[i]);//对于对象中含有对象情况使用递归调用,复制对象中的对象。
   }
   return newObj;
 }

  export function testInput(inputval, strLen) {
   //去除首尾空格
    inputval = inputval.replace(/^\s*|\s*$/g, "");
   //零长字串不作处理
   if ( inputval.length == 0 )
   {
     return;
   }
   //只能匹配数字,字母或汉字
   //var _match = inputval.match(/^[A-Za-z0-9\u4e00-\u9fa5\-]+$/g);
   //匹配数字或字母(包括大小写)
   var codematch = inputval.match(/[A-Za-z0-9\-]/g);
   //匹配汉字
   var charmatch = inputval.match(/[\u4e00-\u9fa5]/g);
   //字符串总长度
   var sumStrLen = inputval.length;
   //数字或字母个数
   var codenum = codematch ? codematch.length : 0;
   //汉字个数
   var charnum = charmatch ? charmatch.length : 0;
   //其他字符字数个数
   var othernum = sumStrLen - codenum - charnum;
   //成功
   if ( codenum + 2*charnum <= strLen )
   {
     return true;
   }
   //失败
   return false
 }
