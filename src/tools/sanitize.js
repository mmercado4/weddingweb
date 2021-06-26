const sanitizeString = (str) => {
  let sanitizeRegex = /[*+^<>=${}()|[\]\\]/g;
  return str.replace(sanitizeRegex, "");
};

module.exports = {
  sanitizeString: sanitizeString,
};
