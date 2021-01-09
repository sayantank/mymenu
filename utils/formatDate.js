import { format } from "date-fns";

const formatDate = (date) => {
  return format(date, "yyyy-MM-dd");
};

export default formatDate;
