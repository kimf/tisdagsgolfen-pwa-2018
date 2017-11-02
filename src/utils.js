export const setCache = async (key, val) => {
  try {
    const item = JSON.stringify(val);
    const value = await window.localStorage.setItem(key, item);
    if (value === null) {
      return false;
    }
    return value;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('caught error in setCache', e);
    return false;
  }
};

export const getCache = async key => {
  try {
    const value = await window.localStorage.getItem(key);
    return JSON.parse(value);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('caught error in getCache', e);
    return null;
  }
};

export const removeCache = async key => {
  try {
    await window.localStorage.removeItem(key);
    return null;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('caught error in getCache', e);
    return null;
  }
};

export const cacheable = fn => {
  /* May store args and result on fn like this:
   * fn.lastArgs = ...
   * fn.lastResult = ...
   */
  let lastArgs = [];
  let lastResult = null;

  const eq = (args1, args2) => {
    if (!args1 || !args2 || args1.length !== args2.length) return false;
    return args1.every((arg, index) => arg === args2[index]);
  };

  return (...args) => {
    if (eq(args, lastArgs)) {
      // eslint-disable-next-line no-console
      console.log(`> from cache - ${fn.name}`);
      return lastResult;
    }

    const result = fn(...args);
    lastArgs = args;
    lastResult = result;
    return result;
  };
};

export const calculateExtraStrokes = (holeIndex, playerStrokes, holesCount) => {
  let extra = 0;
  if (holeIndex <= playerStrokes) {
    extra = 1;
    if (playerStrokes > holesCount) {
      if (holeIndex <= playerStrokes - holesCount) {
        extra = 2;
      }
    }
  }
  return extra;
};
