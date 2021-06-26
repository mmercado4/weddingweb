const sanitizeString = (str) => {
  let sanitizeRegex = /[*+^<>=${}()|[\]\\]/g;
  return str.replace(sanitizeRegex, "");
};

const sanitizeObject = (obj) => {
  let sanitizeRegex = /[*+^<>=${}()|[\]\\]/g;
  let sanitizeObj = {};
  for (item in obj) {
    sanitizeObj[item] = obj[item].replace(sanitizeRegex, "");
  }

  return sanitizeObj;
};

module.exports = {
  sanitizeString: sanitizeString,
  sanitizeObject: sanitizeObject,
};
