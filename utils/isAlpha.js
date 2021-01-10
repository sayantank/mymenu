const isAlpha = (value) => {
  var patt = new RegExp(/^[A-Za-z]+$/);
  return patt.test(value);
};

export default isAlpha;
