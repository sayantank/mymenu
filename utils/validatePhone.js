const validatePhone = (value) => {
  if (isNaN(value) || value.trim().length !== 10) {
    return false;
  }
  return true;
};

export default validatePhone;
