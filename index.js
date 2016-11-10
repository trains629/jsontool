"use strict";

/**
 * 一个json数据操作函数库，提供按路径删除指定节点等函数
 */
let _ = require("lodash");
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
      case ".","[","]":
        push(oo,index);
        oo = index+1;
        break;
      default:
    }
  }
  push(oo,index);
  console.log(paths,keys);
  return keys;
}

function deleteByPath(obj,keyPath) {
  if(typeof obj != "object")return;
  /**
   * 按keyPath的路径去删除目标内的数据
     将分成两部分
   */
  if(!get(obj,keyPath))return;
  let keys = splitPath(keyPath);
  if(!Array.isArray(keys) || keys.length <= 0)return;
  let bb = obj;
  let ww = (o,key,level) =>{
    if(typeof o[key] == "undefined")return;
  }

  ww(obj,keys[0],0);
}

splitPath("key1[0][2].bb");

let t1 = {"c1":{"c2":[2,3,{"c3":1121}]}}
