/* tslint:disable */

export interface Query {
  promotedDataSets: Array<DataSetMetadata>;
  allDataSets: Array<DataSetMetadata>;
  dataSetMetadata: DataSetMetadata;
  aboutMe: AboutMe;
  availableExportMimetypes: Array<MimeType>;
}

export interface DataSetMetadataQueryArgs {
  dataSetId?: string;
}

export interface DataSetMetadata {
  uri: string;
  dataSetId: string;
  title?: Value;
  description?: Value;
  imageUrl?: Value;
  owner?: ContactInfo;
  contact?: ContactInfo;
  provenanceInfo?: ProvenanceInfo;
  license?: License;
  collection?: CollectionMetadata;
  collectionList?: CollectionMetadataList;
  archetypes: Archetypes;
  contributors: Array<RoleWithMembers>;
  roles: Array<DataSetPermission>;
}

export interface CollectionDataSetMetadataArgs {
  collectionId: string;
}

export interface CollectionListDataSetMetadataArgs {
  count?: number;
  cursor?: string;
}

export interface Value {
  value: string;
  type: string;
}

export interface ContactInfo {
  name?: Value;
  email?: Value;
}

export interface ProvenanceInfo {
  title?: Value;
  body?: Value;
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
  title?: Value;
  archeType?: Entity;
  indexerConfig?: IndexerConfig;
  summaryProperties: SummaryProperties;
  components: ComponentList;
}

export interface PropertiesCollectionMetadataArgs {
  count?: number;
  cursor?: string;
}

export interface ComponentsCollectionMetadataArgs {
  count?: number;
  cursor?: string;
}

export interface PropertyList {
  prevCursor?: string;
  nextCursor?: string;
  items: Array<Property>;
}

export interface Property {
  name?: string;
  density?: number;
  isList?: boolean;
  referencedCollections?: CollectionIdList;
  isValueType?: boolean;
}

export interface ReferencedCollectionsPropertyArgs {
  count?: number;
  cursor?: string;
}

export interface CollectionIdList {
  prevCursor?: string;
  nextCursor?: string;
  items: Array<string>;
}

export interface Entity {
  uri: string;
}

export interface IndexerConfig {
  path?: Value;
  typ?: Value;
  fullTextSearch?: Value;
  next?: IndexerConfig;
}

export interface SummaryProperties {
  title?: Value;
  description?: Value;
  image?: Value;
}

export interface ComponentList {
  prevCursor?: string;
  nextCursor?: string;
  query?: string;
  items: Array<Component>;
}

export interface Component {
  type: ComponentType;
  value?: ComponentValue;
  key?: ComponentValue;
  title?: ComponentValue;
  url?: ComponentValue;
  alt?: ComponentValue;
  tree?: string;
  values?: Array<Component>;
}

export type ComponentType = "TITLE" | "VALUE" | "IMAGE" | "LINK" | "DIVIDER" | "KEYVALUE" | "TREE";

export interface ComponentValue {
  field?: string;
  fields?: Array<ComponentValueField>;
}

export interface ComponentValueField {
    value: string;
    reference?: string;
    isList?: boolean;
}

export interface CollectionMetadataList {
  prevCursor?: string;
  nextCursor?: string;
  facets: Facet[];
  items: Array<CollectionMetadata>;
}

export interface Facet {
  caption: string;
  options: FacetOption[];
}

export interface FacetOption {
  name: string;
  count: number;
}

export interface Archetypes {
  persons?: PersonArchetypeList;
}

export interface PersonArchetypeList {
  prevCursor?: string;
  nextCursor?: string;
  items: Array<PersonArchetype>;
}

export interface PersonArchetype {
  names?: Value;
}

export interface RoleWithMembers {
  name?: string;
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
  value?: ComponentValueInput;
  key?: ComponentValueInput;
  title?: ComponentValueInput;
  url?: ComponentValueInput;
  alt?: ComponentValueInput;
  values?: Array<ComponentInput>;
}

export interface ComponentValueInput {
  field?: string;
  fields?: Array<ComponentValueFieldInput>;
}

export interface ComponentValueFieldInput {
  value?: string;
  referenceType?: string;
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
  facets?: Array<FacetInput>;
}

export interface RootMutation {
  setViewComponents?: boolean;
  setFacets?: boolean;
}

export interface SetViewComponentsRootMutationArgs {
  input?: ViewComponentsInput;
}

export interface SetFacetsRootMutationArgs {
  input?: FacetsInput;
}

export interface ViewComponentsInput {
  components?: Array<ComponentInput>;
  dataSetId: string;
  collectionId: string;
  query: string;
}
