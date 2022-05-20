/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

export function isEmpty(obj){
  if (obj === "") return true; //检验空字符串
  if (obj === "null") return true; //检验字符串类型的null
  if (obj === "undefined") return true; //检验字符串类型的 undefined
  if (!obj && obj !== 0 && obj !=="") return true; //检验 undefined 和 null
  if (Array.prototype.isPrototypeOf(obj) && obj.length === 0 ) return true; //检验空数组
  if (Object.prototype.isPrototypeOf(obj) && Object.keys(obj).length === 0 ) return true;  //检验空对象
  return false;
}
