const baseLocations = {
  DutchCaribbean: "http://dutch-caribbean.huygens.knaw.nl/",
  WomenWriters: "http://resources.huygens.knaw.nl/womenwriters",
  cwno: "http://resources.huygens.knaw.nl/womenwriters",
  cwrs: "http://resources.huygens.knaw.nl/womenwriters",
  ckcc: "http://ckcc.huygens.knaw.nl/",
};

const getBaseLocation = (dataset) => baseLocations[dataset] || null;
export { getBaseLocation };