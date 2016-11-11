"use strict";

/**
 * 一个json数据操作函数库，提供按路径删除指定节点等函数
 */
//let _ = require("lodash");
//import {get} from "lodash";

function splitPath(paths) {
  let index = -1,length = paths.length,oo = 0;
  let keys = [];
  let push = (start,end)=>{
    if(start >= end)return;
    let path = paths.substring(start,end);
    path = /^[0-9]*$/.test(path)?parseInt(path):path;
    keys.push(path);
  }
  while (++index < length) {
    switch (paths[index]) {
      case ".":
        push(oo,index);
        oo = index+1;
        break;
	  case "[":
        push(oo,index);
        oo = index+1;
        break;
      case "]":
        push(oo,index);
        oo = index+1;
        break;		
      default:
    }
  }
  push(oo,index);
  return keys;
}

function deleteByPath(obj,keyPath) {
  if(typeof obj != "object")return;
  /**
   * 按keyPath的路径去删除目标内的数据
     将分成两部分
   */
  //if(!get(obj,keyPath))return;
  let keys = splitPath(keyPath);
  if(!Array.isArray(keys) || keys.length <= 0)return;
  let bb = obj;
  let ww = (o,keys,level,parent) =>{
	level = level || 0;
	let key = keys[level];
    if(typeof o[key] == "undefined")return;
	if(level<keys.length -1)return ww(o[key],keys,level+1,o);
	if(typeof o != "object")return;
	//let parentKey = level > 0 ? keys[level-1] :undefined;
	if(Array.isArray(o)){ // 为数组的时候
	  // 清除掉指定内容	
	  if(typeof key == "number" && key < o.length)o.splice(key,1);
	}else{
		delete o[key];
		let kks = o.keys();
		//if(kks.length<=0)delete o;
	}
  }
  ww(bb,keys,0);
  return bb;
}

splitPath("key1[0][2].bb");

let t1 = {"c1":{"c2":[2,3,{"c3":1121}]}}
console.log(t1);
let cc1 = deleteByPath(t1,"c1.c2[2]");
console.log(t1,cc1);
