export function checkTypes<T, U extends T>(): U | null {
    return null;
}

export interface Query {
    promotedDataSets: Array<DataSetMetadata>;
    allDataSets: Array<DataSetMetadata>;
    dataSetMetadata?: DataSetMetadata;
    aboutMe?: AboutMe;
    availableExportMimetypes: Array<MimeType>;
    dataSets: DataSets;
}

export interface DataSets {
    [key: string]: DataSet | undefined;
}

export interface DataSet {
    metadata: DataSetMetadata;
    [key: string]: DataSetMetadata | Entity | EntityList | undefined;
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
    collectionList: CollectionMetadataList;
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
    itemType: string;
    properties: PropertyList;
    total: number;
    title?: Value;
    archeType?: Entity;
    indexConfig: IndexConfig;
    summaryProperties: SummaryProperties;
    viewConfig: Array<ComponentConfig>;
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
    name: string;
    uri: string;
    shortenedUri: string;
    density: number;
    isList: boolean;
    isInverse: boolean;
    referencedCollections: CollectionIdList;
    isValueType: boolean;
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
    __typename: string;
    rdf_type?: Entity;
    [key: string]: Entity | Value | Entity[] | Value[] | null | undefined | string; // string is just for the uri prop
}

export interface Value {
    value: string;
    type: string;
}

export interface EntityList {
    items: Array<Entity>;
    prevCursor?: string;
    nextCursor?: string;
    facets: Array<Facet>;
}

export interface IndexConfig {
    path?: Value;
    typ?: Value;
    fullTextSearch?: Value;
    next?: IndexConfig;
}

export interface SummaryProperties {
    title?: Value;
    description?: Value;
    image?: Value;
}

export interface IndexConfig {
    path?: Value;
    typ?: Value;
    fullTextSearch?: Value;
    next?: IndexConfig;
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

export type ComponentType = 'TITLE' | 'VALUE' | 'IMAGE' | 'LINK' | 'DIVIDER' | 'KEYVALUE' | 'TREE';

export interface ComponentValue {
    field?: string;
    fields?: Array<ComponentValueField>;
}

export interface ComponentValueField {
    value: string;
    reference?: string;
    isList?: boolean;
}

export type ComponentConfig =
  ImageComponentConfig |
  LinkComponentConfig |
  KeyvalueComponentConfig |
  TitleComponentConfig |
  DividerComponentConfig |
  LeafComponentConfig;

export type LeafComponentConfig =
  LiteralComponentConfig |
  PathComponentConfig;

export type FormatterName = 'STRING' | 'PERSON_NAMES';

export type FormatterConfig = Array<{type: string, name: FormatterName }>;
// This is the type that is serialized to graphql
export interface GraphQlComponentConfig {
    type: string;
    value?: string;
    formatter: FormatterConfig;
    subComponents?: ComponentConfig[];
}

// These are more specific types, they extend the above type which is the "real" serialized value
export interface LiteralComponentConfig extends GraphQlComponentConfig {
    type: 'LITERAL';
    value?: string;
    subComponents?: ComponentConfig[];
}

export interface PathComponentConfig extends GraphQlComponentConfig {
    type: 'PATH';
    value?: string;
    formatter: FormatterConfig;
    subComponents?: ComponentConfig[];
}
  
export interface TitleComponentConfig extends GraphQlComponentConfig {
    type: 'TITLE';
    subComponents?: [LeafComponentConfig];
}

export interface DividerComponentConfig extends GraphQlComponentConfig {
    type: 'DIVIDER';
    subComponents?: [LeafComponentConfig];
}

export interface ImageComponentConfig extends GraphQlComponentConfig {
    type: 'IMAGE';
    subComponents?: [LeafComponentConfig, LeafComponentConfig];
}

export interface LinkComponentConfig extends GraphQlComponentConfig {
    type: 'LINK';
    subComponents?: [LeafComponentConfig, LeafComponentConfig];
}

export interface KeyvalueComponentConfig extends GraphQlComponentConfig {
    type: 'KEYVALUE';
    value?: string;
    subComponents?: Array<ComponentConfig>;
}

export interface CollectionMetadataList {
    prevCursor?: string;
    nextCursor?: string;
    facets: Facet[];
    indexConfig: IndexConfig;
    items: Array<CollectionMetadata>;
}

export interface IndexConfig {
    facet: FacetConfig[];
    fullText: FullTextConfig[];
}

export interface FacetConfig {
    paths: string[];
    type: string;
    caption: string;
}

export interface FullTextConfig {
    caption: string;
    fields: TextConfigField[];
}

export interface TextConfigField {
    path: string;
    boost: number;
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

export type DataSetPermission =
    'SEARCH_AND_VIEW'
    | 'DOWNLOAD_DUMP'
    | 'FORK'
    | 'PUBLISH'
    | 'EDIT_ENTRIES'
    | 'EDIT_DATASET'
    | 'EDIT_ROLES';

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
    subComponents?: Component[];
    value?: string;
    path?: string;
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
