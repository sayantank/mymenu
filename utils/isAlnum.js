const { parseWithOptions } = require("date-fns/fp");

const isAlnum = (value) => {
  const patt = new RegExp(/^[a-z0-9]+$/i);
  return patt.test(value);
};

export default isAlnum;
