module.exports = (temp, obj) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, obj.productName);
  output = output.replace(/{%PRICE%}/g, obj.price);
  output = output.replace(/{%QUANTITY%}/g, obj.quantity);
  output = output.replace(/{%IMAGE%}/g, obj.image);
  output = output.replace(/{%VITAMINS%}/g, obj.nutrients);
  output = output.replace(/{%FROM%}/g, obj.from);
  output = output.replace(/{%ID%}/g, obj.id);
  if (!obj.organic) output = output.replace(/{%NO_ORGANIC%}/g, "not-organic");
  output = output.replace(/{%DESCRIPTION%}/g, obj.description);
  return output;
};
