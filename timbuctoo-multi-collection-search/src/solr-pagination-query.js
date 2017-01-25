const rangeFacetToQueryFilter = (field) => {
  const filters = field.value || [];
  if (filters.length < 2) {
    return null;
  }

  return encodeURIComponent(`${field.field}:[${filters[0]} TO ${filters[1]}]`);
};

const listFacetFieldToQueryFilter = (field) => {
  const filters = field.value || [];
  if (filters.length === 0) {
    return null;
  }

  const filterQ = filters.map((f) => `"${f}"`).join(" OR ");
  return encodeURIComponent(`${field.field}:(${filterQ})`);
};

const textFieldToQueryFilter = (field) => {
  if(!field.value || field.value.length === 0) {
    return null;
  }

  return encodeURIComponent(field.field === "*" ? field.value : `${field.field}:${field.value}`);
};

const fieldToQueryFilter = (field) => {
  if (field.type === "text") {
    return textFieldToQueryFilter(field);
  } else if (field.type === "list-facet") {
    return listFacetFieldToQueryFilter(field);
  } else if (field.type.indexOf("range") > -1) {
    return rangeFacetToQueryFilter(field);
  }
  return null;
};

const buildQuery = (fields) => fields
  .map(fieldToQueryFilter)
  .filter((queryFilter) => queryFilter !== null)
  .map((queryFilter) => `fq=${queryFilter}`)
  .join("&");

const buildSort = (sortFields) => sortFields
  .filter((sortField) => sortField.value)
  .map((sortField) => encodeURIComponent(`${sortField.field} ${sortField.value}`))
  .join(",");

const buildPaginationQuery = (query, idFields = ["id", "dataset_s"]) => {
  const {
    searchFields,
    sortFields
  } = query;

  const filters = (query.filters || []).map((filter) => ({...filter, type: filter.type || "text"}));
  const queryParams = buildQuery(searchFields.concat(filters));
  const sortParam = buildSort(sortFields);

  return `q=*:*&${queryParams.length > 0 ? queryParams : ""}` +
    `${sortParam.length > 0 ? `&sort=${sortParam}` : ""}` +
    `&rows=1000000` +
    `&fl=${idFields.join(",")}` +
    "&wt=json";
};

export default buildPaginationQuery;
