
console.log("devmain.js");
var dothis = function(ret){
    console.log(ret.responseText);
}
var println = function(txt){
    console.log(txt);
}
load.file("./Data/test.txt",dothis)
load.html("demo","./Data/test.txt",)
