const capitalize = (str) => {
  let arr = str.split(" ");

  let capitalized = arr.map((word) => {
    return word[0].toUpperCase() + word.slice(1);
  });

  return capitalized.join(" ");
};

module.exports = {
  capitalize: capitalize,
};
