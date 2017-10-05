/* tslint:disable */

export interface Query {
  promotedDataSets: Array<DataSetMetadata>;
  allDataSets: Array<DataSetMetadata>;
  dataSetMetadata: DataSetMetadata | null;
  aboutMe: AboutMe | null;
  availableExportMimetypes: Array<MimeType>;
}

export interface DataSetMetadataQueryArgs {
  dataSetId: string | null;
}

export interface DataSetMetadata {
  uri: string;
  dataSetId: string;
  title: Value | null;
  description: Value | null;
  imageUrl: Value | null;
  owner: ContactInfo | null;
  contact: ContactInfo | null;
  provenanceInfo: ProvenanceInfo | null;
  license: License | null;
  collection: CollectionMetadata | null;
  collectionList: CollectionMetadataList | null;
  archetypes: Archetypes;
  contributors: Array<RoleWithMembers>;
  roles: Array<DataSetPermission>;
}

export interface CollectionDataSetMetadataArgs {
  collectionId: string;
}

export interface CollectionListDataSetMetadataArgs {
  count: number | null;
  cursor: string | null;
}

export interface Value {
  value: string;
  type: string;
}

export interface ContactInfo {
  name: Value | null;
  email: Value | null;
}

export interface ProvenanceInfo {
  title: Value | null;
  body: Value | null;
}

export interface License {
  uri: string;
}

export interface CollectionMetadata {
  uri: string;
  collectionId: string;
  collectionListId: string;
  properties: PropertyList;
  total: number;
  title: Value | null;
  archeType: Entity | null;
  indexerConfig: IndexerConfig | null;
  summaryProperties: SummaryProperties;
  components: ComponentList;
}

export interface PropertiesCollectionMetadataArgs {
  count: number | null;
  cursor: string | null;
}

export interface ComponentsCollectionMetadataArgs {
  count: number | null;
  cursor: string | null;
}

export interface PropertyList {
  prevCursor: string | null;
  nextCursor: string | null;
  items: Array<Property>;
}

export interface Property {
  name: string | null;
  density: number | null;
  isList: boolean | null;
  referencedCollections: CollectionIdList | null;
  isValueType: boolean | null;
}

export interface ReferencedCollectionsPropertyArgs {
  count: number | null;
  cursor: string | null;
}

export interface CollectionIdList {
  prevCursor: string | null;
  nextCursor: string | null;
  items: Array<string>;
}

export interface Entity {
  uri: string;
}

export interface IndexerConfig {
  path: Value | null;
  type: Value | null;
  fullTextSearch: Value | null;
  next: IndexerConfig | null;
}

export interface SummaryProperties {
  title: Value | null;
  description: Value | null;
  image: Value | null;
}

export interface ComponentList {
  prevCursor: string | null;
  nextCursor: string | null;
  query: string | null;
  items: Array<Component>;
}

export interface Component {
  type: ComponentType;
  value: ComponentValue | null;
  key: ComponentValue | null;
  title: ComponentValue | null;
  url: ComponentValue | null;
  alt: ComponentValue | null;
  tree: string | null;
  values: Array<Component> | null;
}

export type ComponentType = "TITLE" | "VALUE" | "IMAGE" | "LINK" | "DIVIDER" | "KEYVALUE" | "TREE";

export interface ComponentValue {
  field: string | null;
  fields: Array<ComponentValueField> | null;
}

export interface ComponentValueField {
    value: string;
    reference: string;
    isList?: boolean | null;
}

export interface CollectionMetadataList {
  prevCursor: string | null;
  nextCursor: string | null;
  items: Array<CollectionMetadata>;
}

export interface Archetypes {
  persons: PersonArchetypeList | null;
}

export interface PersonArchetypeList {
  prevCursor: string | null;
  nextCursor: string | null;
  items: Array<PersonArchetype>;
}

export interface PersonArchetype {
  names: Value | null;
}

export interface RoleWithMembers {
  name: string | null;
}

export type DataSetPermission = "SEARCH_AND_VIEW" | "DOWNLOAD_DUMP" | "FORK" | "PUBLISH" | "EDIT_ENTRIES" | "EDIT_DATASET" | "EDIT_ROLES";

export interface AboutMe {
  dataSets: Array<DataSetMetadata>;
  id: string;
  name: string;
  personalInfo: string;
  canCreateDataSet: boolean;
}

export interface MimeType {
  name: string;
}

export interface ComponentInput {
  type: ComponentType;
  value: ComponentValueInput | null;
  key: ComponentValueInput | null;
  title: ComponentValueInput | null;
  url: ComponentValueInput | null;
  alt: ComponentValueInput | null;
  values: Array<ComponentInput> | null;
}

export interface ComponentValueInput {
  field: string | null;
  fields: Array<ComponentValueFieldInput> | null;
}

export interface ComponentValueFieldInput {
  value: string | null;
  referenceType: string | null;
}

export interface Facet {
  caption: string;
  options: Array<Option>;
}

export interface Option {
  name: string;
  count: number;
}

export interface FacetInput {
  caption: string;
  options: Array<OptionInput>;
}

export interface OptionInput {
  name: string;
  value: string;
}

export interface FacetsInput {
  facets: Array<FacetInput> | null;
}

export interface RootMutation {
  setViewComponents: boolean | null;
  setFacets: boolean | null;
}

export interface SetViewComponentsRootMutationArgs {
  input: ViewComponentsInput | null;
}

export interface SetFacetsRootMutationArgs {
  input: FacetsInput | null;
}

export interface ViewComponentsInput {
  components: Array<ComponentInput> | null;
  dataSetId: string;
  collectionId: string;
  query: string;
}
