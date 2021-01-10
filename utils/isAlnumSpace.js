const { parseWithOptions } = require("date-fns/fp");

const isAlnumSpace = (value) => {
  const patt = new RegExp(/^[\w\-,:./\s]+$/);
  return patt.test(value);
};

export default isAlnumSpace;
