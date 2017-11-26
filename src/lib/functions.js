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