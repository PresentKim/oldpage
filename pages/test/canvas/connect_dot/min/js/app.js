var $jscomp={scope:{}};$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(c.get||c.set)throw new TypeError("ES3 does not support getters and setters.");a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.polyfill=function(a,b,c,d){if(b){c=$jscomp.global;a=a.split(".");for(d=0;d<a.length-1;d++){var e=a[d];e in c||(c[e]={});c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&$jscomp.defineProperty(c,a,{configurable:!0,writable:!0,value:b})}};$jscomp.polyfill("Number.MAX_SAFE_INTEGER",function(){return 9007199254740991},"es6-impl","es3");
$jscomp.polyfill("Array.prototype.fill",function(a){return a?a:function(a,c,d){var b=this.length||0;0>c&&(c=Math.max(0,b+c));if(null==d||d>b)d=b;d=Number(d);0>d&&(d=Math.max(0,b+d));for(c=Number(c||0);c<d;c++)this[c]=a;return this}},"es6-impl","es3");var canvas=document.getElementById("connect_dot"),context=canvas.getContext("2d"),handle=null,dots=[];
function generate(){canvas.width=window.innerWidth;canvas.height=window.innerHeight;context.clearRect(0,0,canvas.width,canvas.height);for(dots=[];50>dots.length;){var a=rand(0,canvas.width),b=rand(0,canvas.height),c=rand(1,3,7)*(rand(0,1)?1:-1),d=rand(1,3,7)*(rand(0,1)?1:-1),e=new ColorHSLA(rand(0,360));dots.push(new Dot(a,b,1,c,d,e))}dots.push(new Dot(Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER,3,0,0,new ColorHSLA(0)));render()}
function move(){var a=dots[dots.length-1];for(i in dots)dots[i]!=a&&(dots[i].x+=dots[i].velocityX,dots[i].y+=dots[i].velocityY,0>dots[i].x||dots[i].x>canvas.width||0>dots[i].y||dots[i].y>canvas.height)&&(dots[i].x=rand(0,canvas.width),dots[i].y=rand(0,canvas.height),dots[i].velocityX=rand(1,3,7)*(rand(0,1)?1:-1),dots[i].velocityY=rand(1,3,7)*(rand(0,1)?1:-1));a.color.h=++a.color.h%361}
function render(){canvas.width=window.innerWidth;canvas.height=window.innerHeight;context.clearRect(0,0,canvas.width,canvas.height);for(i in dots){var a=dots.concat();a.splice(i,1);a.sort(function(a,b){return distance(dots[i],a)-distance(dots[i],b)});context.beginPath();for(var b=0;3>b;b++)b<i&&1E3>distance(dots[i],dots[b])&&(context.moveTo(dots[i].x,dots[i].y),context.lineTo(a[b].x,a[b].y),context.stroke());context.closePath()}for(i in dots)context.beginPath(),context.fillStyle=dots[i].color.toString(),
context.arc(dots[i].x,dots[i].y,dots[i].relativeSize,0,2*Math.PI,!0),context.fill(),context.closePath()}function onUpdate(){move();render();handle=requestAnimationFrame(onUpdate)}function toggle(){handle?handle=cancelAnimationFrame(handle):onUpdate()}generate();toggle();document.body.addEventListener("mousemove",function(a){var b=canvas.getBoundingClientRect();dots[dots.length-1].x=a.clientX-b.left;dots[dots.length-1].y=a.clientY-b.top},!1);
