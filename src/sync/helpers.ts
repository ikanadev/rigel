interface Item {
  id: string
  [key: string]: any
}
export const getToDeleteIds = (localItems: Item[], serverItems: Item[]): string[] => {
  return localItems
    .filter(localItem => serverItems.find(serverItem => serverItem.id === localItem.id) === undefined)
    .map(localItem => localItem.id);
};

export const getToUpdateItems = <K extends Item>(localItems: K[], serverItems: K[]): K[] => {
  return serverItems.filter(serverItem => {
    const found = localItems.find(localItem => localItem.id === serverItem.id);
    if (found === undefined) return true;
    let needUpdate = false;
    Object.keys(serverItem).forEach(key => {
      if (serverItem[key] !== found[key]) {
        needUpdate = true;
      }
    });
    return needUpdate;
  });
};
