const baseLocations = {
  DutchCaribbean: "http://dutch-caribbean.huygens.knaw.nl/",
  WomenWriters: "http://resources.huygens.knaw.nl/womenwriters",
  cwno: "http://resources.huygens.knaw.nl/womenwriters",
  cwrs: "http://resources.huygens.knaw.nl/womenwriters",
  ckcc: "http://ckcc.huygens.knaw.nl/",
};

const entityLocations = {
  DutchCaribbean: (collectionName, id) =>
    collectionName === "dcararchives"
      ? `http://database.dutch-caribbean.huygens.knaw.nl/archive/${id}`
      : collectionName === "dcararchivers"
      ? `http://database.dutch-caribbean.huygens.knaw.nl/creator/${id}`
      : collectionName === "dcarlegislations"
      ? `http://database.dutch-caribbean.huygens.knaw.nl/legislation/${id}`
      : baseLocations.DutchCaribbean,
  WomenWriters: (collectionName, id) =>
    collectionName === "wwpersons"
      ? `http://resources.huygens.knaw.nl/womenwriters/vre/persons/${id}`
      : collectionName === "wwdocuments"
      ? `http://resources.huygens.knaw.nl/womenwriters/vre/documents/${id}`
      : baseLocations.WomenWriters,
  cwno: (collectionName, id) =>
    collectionName === "cwnopersons"
      ? `http://resources.huygens.knaw.nl/womenwriters/vre/persons/${id}`
      : collectionName === "cwnodocuments"
      ? `http://resources.huygens.knaw.nl/womenwriters/vre/documents/${id}`
      : baseLocations.cwno,
  cwrs: (collectionName, id) =>
    collectionName === "cwrspersons"
      ? `http://resources.huygens.knaw.nl/womenwriters/vre/persons/${id}`
      : collectionName === "cwrsdocuments"
      ? `http://resources.huygens.knaw.nl/womenwriters/vre/documents/${id}`
      : baseLocations.cwrs,
  ckcc: (collectionName, id) => baseLocations.ckcc
};

const getBaseLocation = (dataset) => baseLocations[dataset] || null;

const getEntityLocation = (dataset, collectionName, id) => entityLocations[dataset]
  ? entityLocations[dataset](collectionName, id) : null;

export { getBaseLocation, getEntityLocation };