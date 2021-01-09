const names = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
const getDayName = (date) => {
  return names[date.getDay()];
};

export default getDayName;
