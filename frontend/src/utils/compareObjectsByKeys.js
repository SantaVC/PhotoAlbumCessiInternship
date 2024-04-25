export const compareObjectsByKeys = (obj1, obj2, keys) => {
  for (let key of keys) {
    if (!(key in obj1) || !(key in obj2)) {
      return false;
    }

    console.log(obj1[key], obj2[key]);
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
};
