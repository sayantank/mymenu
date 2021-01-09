import { format } from "date-fns";

const formatDate = (date) => {
  return format(date, "MM-dd-yyyy");
};

export default formatDate;
