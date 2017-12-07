export function getMenusFromData(data) {
  return data.reduce((total, item, index, arr) => {
    !total && (total = []);
    return total.concat(item.subMenus.map((sub) => {
      let {id, name} = item;
      sub.cateInfo = {id, name};
      return sub;
    }));
  }, []);
}
/**
*
* @param index
* @param indexs
* @param menus
* @returns {Array}
*/
export function getCurrentMenu(index, indexs, menus) {
  let ret = [], fArr = [].concat(menus), sArr = fArr.reduce((res, item) => {
    res = res.concat(item.subMenus || []);
    return res;
  }, []), arr = [fArr, sArr];

  ret = indexs.map((item, index) => {
    let searchArr = arr[index],
      i = searchArr.findIndex((res) => {
        return res.id == item;
      });
    return searchArr[i];
  })
  return ret;
}

/**
 *
 * @param arr
 * @param fun
 * @returns {boolean}
 */
export function findInArray(arr, fun) {
  let index = arr.findIndex(fun);
  return index >= 0 ? arr[index] : false;
}
