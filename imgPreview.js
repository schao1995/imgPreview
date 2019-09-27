
// 添加link标签，引入css
createDom([{
	ele:"link", 
	attr: {"href" : "imgPreview.css", "rel" : "stylesheet", "type": "text/css"}, 
	children: []
}], "head");

// 创建类
class ImgPreview {
	constructor (parentName, i) {
		this.parentName = parentName;
		this.i = i;
	}
	show (index) {

		// 1.获取要显示的图片
		var parentEle = null;
		if (this.parentName.indexOf(".") != -1) {
			var el = this.parentName.split(".").join("");
			parentEle = document.getElementsByClassName(el)[this.i];
		} else if (this.parentName.indexOf("#") != -1) {
			var el = this.parentName.split("#").join("");
			parentEle = document.getElementById(el)[this.i];
		} else {
			parentEle = document.getElementsByTagName(this.parentName)[this.i];
		}
		var imgs = parentEle.parentNode.childNodes;
		console.log(imgs);
		var imgArr = [];

		// 2.创建dom
		// 轮播图dom
		var contentBox = [];
		// 跳转图片
		var navImgs =[];
		for (var i = 0; i < imgs.length; i++) {
			if(imgs[i].nodeName === "IMG"){
				var boxImg = {
					ele:"div", 
					attr: {"class" : "imgPreview-content-box"},
					children: [{
						ele:"img", 
						attr: {
							"src" : imgs[i].getAttribute("src"),
							"class" : "imgPreview-content-img"
						}, 
						children: []
					}]
				}
				contentBox.push(boxImg);
			}
		}
		var children = [
			{ele:"div", attr: {"class" : "imgPreview-content"}, children: contentBox},
			{ele:"div", attr: {"class" : "imgPreview-nav"}, children: []},
			{ele:"div", attr: {"class" : "imgPreview-button"}, children: []},
			{ele:"div", attr: {"class" : "imgPreview-delete", }, children: [{
				ele:"span", 
				attr: {"class" : "imgPreview-delete-close"}, 
				children: []
			}]}
		];
		createDom([{
			ele:"div", 
			attr: {"class" : "imgPreview-parent"}, 
			children: children
		}], "body");
		document.getElementsByClassName("imgPreview-delete")[0].onclick =  function () {
			var deleteEle = document.getElementsByClassName("imgPreview-parent")[0];
			document.getElementsByTagName("body")[0].removeChild(deleteEle);
		};
		// console.log(document.getElementsByClassName("imgPreview-delete")[0])
		// document.getElementsByClassName("imgPreview-delete")[0].onclick =  function (){console.log(12312)};

	}
	// delete (elements) {
	// 	var deleteEle = document.getElementsByClassName(elements)[0];
	// 	document.getElementsByTagName("body")[0].removeChild(deleteEle);
	// }
}

// 将属性混合到目标对象中。
function extend (to, _from) {
	for (var key in _from) {
		to[key] = _from[key];
	}
	return to
}


// 创建dom

function createDom (arr, parentEle) {
	for (var i = 0; i < arr.length; i++) {
		// console.log(arr);
		var createEle = document.createElement(arr[i].ele);
		extend(createEle, arr[i].attr);
		extend(createEle.style, arr[i].style);
		for (var key in arr[i].attr){
			createEle.setAttribute(key, arr[i].attr[key]);
		}
		if (typeof parentEle == "object") {
			parentEle.appendChild(createEle);
		}else if (parentEle.indexOf(".") != -1) {
			var el = parentEle.split(".").join("");
			document.getElementsByClassName(el)[0].appendChild(createEle);
		} else if (parentEle.indexOf("#") != -1) {
			var el = parentEle.split("#").join("");
			document.getElementById(el)[0].appendChild(createEle);
		} else {
			document.getElementsByTagName(parentEle)[0].appendChild(createEle);
		}
		if (arr[i].children.length > 0) {
			createDom(arr[i].children, createEle);
		}
	}
}


// (function (global, factory) {
// 	typeof exports === 'object' 
// 	&& (typeof module !== 'undefined' 
// 		? module.exports = factory() 
// 		: typeof define === 'function') 
// 	&& (define.amd 
// 		? define(factory) 
// 		: (global = global || self, global.ImgPreview = factory()));
// }(this, function () {
// 	console.log(134);
// }))