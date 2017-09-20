export const typeDefs = ["# Scalars\nscalar Uri\nscalar Url\nscalar Key #FIXME: ID?\nscalar Email\nscalar Markdown\n\nschema {\n    query: QueryType\n}\n\n# - [x] check alle lists of ze gewrapped moeten worden\n# - [x] check alle scalars of ze goed staan\n# - [x] check alle fakes\n# - [x] Loop van boven naar beneden of alle properties en hun types kloppen\n\ntype QueryType {\n\t#the datasets that are supposed to get extra attention\n  promotedDataSets: [DataSetMetadata!]!\n  dataSets: DataSets\n  #all mimetypes that you can use when downloading data from a dataSet\n  availableExportMimetypes: [MimeType!]!\n  \n  #information about the logged in user, or null of no user is logged in\n  aboutMe: AboutMe\n}\n\ntype DataSets {\n  jauco_leaders: Jauco_Leaders\n}\n\ntype MimeType {\n  value: String! @examples(values: [\"application/json\", \"application/ld+json\", \"application/xml\", \"text/csv\"])\n  en: MimeTypeDescription\n}\n\ntype MimeTypeDescription {\n  name: String! @examples(values: [\"json\", \"JSON-LD\", \"Gephi\", \"CSV\"])\n  description: String! @fake(type: lorem)\n}\n\ntype AboutMe {\n  #datasets that this user has some specific permissions on\n  dataSets: [DataSetMetadata!]!\n  \n  #The unique identifier of this user\n  id: ID! @examples(values: [\"1234\"])\n  \n  #a human readable name (or empty string if not available)\n  name: String! @fake(type: fullName)\n  \n  #a url to a page with personal information on this user\n  personalInfo: Url! @fake(type: url)\n  \n  #This user may create a new dataset on this timbuctoo instance\n  canCreateDataSet: Boolean!\n}\n\ntype DataSetMetadata {\n  datasetId: ID! \t@examples(values: [\"jauco_leaders\"]) \n  title: String!\t\t\t\t\t@fake(type:county)\n  description: String\t\t\t@fake(type:lorem)\n  imageUrl: Url\t\t\t\t\t\t@fake(type:imageUrl options: {imageCategory: cats, randomizeImageUrl: true})\n  owner: ContactInfo!\n  contact: ContactInfo!\n  provenanceInfo: ProvenanceInfo!\n  contributors: [RoleWithMembers!]!\n\n  licence: Licence!\n  roles: [DataSetPermission!]!\n  \n  collections(count: Int = 20, cursor: ID = \"\"): CollectionMetadataList\n}\n\ntype Licence {\n  uri: Url @fake(type: url)\n}\n\ntype CollectionMetadataList {\n  prevCursor: ID\n  nextCursor: ID\n  items: [CollectionMetadata!]!\n}\n\ntype CollectionMetadata {\n  collectionId: ID!\t\t\t\t\t\t@examples(values:[\"Leaders\"])\n  collectionListId: ID!\t\t\t\t@examples(values:[\"LeadersList\"])\n  uri: Uri! \t\t\t\t\t\t\t\t\t@fake(type: url)\n  title: String! \t\t\t\t\t\t\t@fake(type: productName)\n  summaryProperties: SummaryProperties!\n  components(count: Int = 20, cursor: ID = \"\"): ComponentList!\n  #facetconfig?\n  properties(count: Int = 20, cursor: ID = \"\"): PropertyList!\n  archeType: String\n  #estimatedTotal: String!\n}\n\ntype SummaryProperties {\n  title: String! @examples(values:[\"schema_org_name\"])\n  description: String @examples(values:[\"schema_org_description\"])\n  image: String @examples(values:[\"schema_org_imageUrl\"])\n}\n\ntype RoleWithMembers {\n  name: String\n  members: [MemberInfo!]!\n}\n\ntype ComponentList {\n  prevCursor: ID\n  nextCursor: ID\n  items: [Component!]!\n}\n\ntype PropertyList {\n  prevCursor: ID\n  nextCursor: ID\n  items: [Property!]!\n}\n\ntype Property {\n  name: String\t\t\t\t\t\t@fake(type: colorName)\n  density: Int\t\t\t\t\t\t@fake(type: money, options: {minMoney:0, maxMoney: 100})\n  referenceTypes(count: Int = 20, cursor: ID = \"\"): TypeList\n  valueTypes(count: Int = 20, cursor: ID = \"\"): TypeList\n}\n\ntype TypeList {\n  prevCursor: ID \t@fake(type:uuid)\n  nextCursor: ID\t@fake(type:uuid)\n  items: [Uri!]!\t@fake(type:url)\n}\n\ntype Jauco_Leaders {\n  metadata: DataSetMetadata\n  LeadersList(count: Int = 20, query: String, cursor: ID = \"\"): Jauco_Leaders_LeaderCollection\n  Leaders(uri: String): Jauco_Leaders_Leader\n}\n\ntype Jauco_Leaders_LeaderCollection {\n  prevCursor: ID!,\t\t\t@fake(type:uuid)\n  nextCursor: ID!,\t\t\t@fake(type:uuid)\n  facets: [Facet!]!,\n  size: Int,\n  items: [Jauco_Leaders_Leader!]!\n}\n\ntype Jauco_Leaders_Leader {\n  schema_org_name: ValueObject # Added ValueObject to show that these need a {value}\n  schema_org_description: ValueObject\n  schema_org_birthPlace: ValueObject\n  schema_org_imageUrl: ValueObject\n  schema_org_url: ValueObject\n}\n\ntype ValueObject {\n  value:String @fake(type:productName)\n}\n\ntype Facet {\n  caption: String\n  options: [Option!]!\n}\n\ntype Option {\n  name: String\n  count: Int\n}\n\n# Different types for entryData\nunion Component = ValueString | DataTable | DataKeyValue #| Header FIXME I removed header as hero. Do I need to add it heare?\n\ntype DataKeyValue {\n  key: Key! \t\t\t\t\t\t\t@fake(type: productName)\n  values: [Component!]!\n}\n\ntype DataTable {\n  hasHeading: Boolean!\n  tableColumns: [TableColumn!]!\n}\n\ntype TableColumn {\n  columnName: String \t\t\t@fake(type:productCategory)\n  cells: [Component!]! \t\t\t\t\n}\n\ntype DataDivider {\n  title: String\t\t\t\t\t\t@fake(type:words)\n}\n\n# Different kinds of values supported by the different Elements\ntype ValueString {\n\ttype: ValueTypes! \t\t\t\t\n\tvalueKey: String! \t\t\t\t \t@examples(values:[\"schema_org_name\", \"schema_org_birthPlace\"])\n\turlKey: Url\t\t\t\t\t\t\t\t@examples(values:[\"schema_org_url\", \"schema_org_imageUrl\"])\n}\n\ntype ContactInfo {\n  name: String! \t\t\t\t\t@fake(type:fullName)\n  email: Email \t\t\t\t\t\t@fake(type:email)\n}\n\ntype MemberInfo {\n  name: String! \t\t\t\t\t@fake(type:fullName)\n  url: Url \t\t\t\t\t\t\t\t@fake(type:url)\n}\n\ntype ProvenanceInfo {\n  title: String!\t\t\t\t\t@fake(type:state)\n  body: Markdown!\t\t\t\t\t@fake(type:lorem) #FIXME: limit size\n}\n\nenum DataSetPermission {\n    SEARCH_AND_VIEW\t\t\t\t#Is allowed to search the dataset and query it using graphql\n    DOWNLOAD_DUMP\t\t\t\t\t#Is allowed to download raw rdf files with the data and query for recent changes\n    FORK\t\t\t\t\t\t\t\t\t#Is allowed to fork the dataset (into a new dataset)\n    PUBLISH\t\t\t\t\t\t\t\t#Is allowed to change this dataset into a publicly visible one\n    EDIT_ENTRIES\t\t\t\t\t#Is allowed to edit entries using the REST endpoint\n\t\tEDIT_DATASET\t\t\t\t\t#Is allowed to upload rdf data/change dataset metadata/upload files etc.\n    EDIT_ROLES\t\t\t\t\t\t#Is allowed to assign roles to users\n}  \n\nenum ValueTypes {\n  STRING\n  LINK\n  IMAGE\n}"];
/* tslint:disable */

export interface QueryType {
  promotedDataSets: Array<DataSetMetadata>;
  dataSets: DataSets | null;
  availableExportMimetypes: Array<MimeType>;
  aboutMe: AboutMe | null;
}

export interface DataSetMetadata {
  datasetId: string;
  title: string;
  description: string | null;
  imageUrl: Url | null;
  owner: ContactInfo;
  contact: ContactInfo;
  provenanceInfo: ProvenanceInfo;
  contributors: Array<RoleWithMembers>;
  licence: Licence;
  roles: Array<DataSetPermission>;
  collections: CollectionMetadataList | null;
}

export interface CollectionsDataSetMetadataArgs {
  count: number | null;
  cursor: string | null;
}

export type Url = any;

export interface ContactInfo {
  name: string;
  email: Email | null;
}

export type Email = any;

export interface ProvenanceInfo {
  title: string;
  body: Markdown;
}

export type Markdown = any;

export interface RoleWithMembers {
  name: string | null;
  members: Array<MemberInfo>;
}

export interface MemberInfo {
  name: string;
  url: Url | null;
}

export interface Licence {
  uri: Url | null;
}

export type DataSetPermission = "SEARCH_AND_VIEW" | "DOWNLOAD_DUMP" | "FORK" | "PUBLISH" | "EDIT_ENTRIES" | "EDIT_DATASET" | "EDIT_ROLES";

export interface CollectionMetadataList {
  prevCursor: string | null;
  nextCursor: string | null;
  items: Array<CollectionMetadata>;
}

export interface CollectionMetadata {
  collectionId: string;
  collectionListId: string;
  uri: Uri;
  title: string;
  summaryProperties: SummaryProperties;
  components: ComponentList;
  properties: PropertyList;
  archeType: string | null;
}

export interface ComponentsCollectionMetadataArgs {
  count: number | null;
  cursor: string | null;
}

export interface PropertiesCollectionMetadataArgs {
  count: number | null;
  cursor: string | null;
}

export type Uri = any;

export interface SummaryProperties {
  title: string;
  description: string | null;
  image: string | null;
}

export interface ComponentList {
  prevCursor: string | null;
  nextCursor: string | null;
  items: Array<Component>;
}

export type Component = ValueString | DataTable | DataKeyValue;

export interface ValueString {
  type: ValueTypes;
  valueKey: string;
  urlKey: Url | null;
}

export type ValueTypes = "STRING" | "LINK" | "IMAGE";

export interface DataTable {
  hasHeading: boolean;
  tableColumns: Array<TableColumn>;
}

export interface TableColumn {
  columnName: string | null;
  cells: Array<Component>;
}

export interface DataKeyValue {
  key: Key;
  values: Array<Component>;
}

export type Key = any;

export interface PropertyList {
  prevCursor: string | null;
  nextCursor: string | null;
  items: Array<Property>;
}

export interface Property {
  name: string | null;
  density: number | null;
  referenceTypes: TypeList | null;
  valueTypes: TypeList | null;
}

export interface ReferenceTypesPropertyArgs {
  count: number | null;
  cursor: string | null;
}

export interface ValueTypesPropertyArgs {
  count: number | null;
  cursor: string | null;
}

export interface TypeList {
  prevCursor: string | null;
  nextCursor: string | null;
  items: Array<Uri>;
}

export interface DataSets {
  jauco_leaders: Jauco_Leaders | null;
}

export interface Jauco_Leaders {
  metadata: DataSetMetadata | null;
  LeadersList: Jauco_Leaders_LeaderCollection | null;
  Leaders: Jauco_Leaders_Leader | null;
}

export interface LeadersListJauco_LeadersArgs {
  count: number | null;
  query: string | null;
  cursor: string | null;
}

export interface LeadersJauco_LeadersArgs {
  uri: string | null;
}

export interface Jauco_Leaders_LeaderCollection {
  prevCursor: string;
  nextCursor: string;
  facets: Array<Facet>;
  size: number | null;
  items: Array<Jauco_Leaders_Leader>;
}

export interface Facet {
  caption: string | null;
  options: Array<Option>;
}

export interface Option {
  name: string | null;
  count: number | null;
}

export interface Jauco_Leaders_Leader {
  schema_org_name: ValueObject | null;
  schema_org_description: ValueObject | null;
  schema_org_birthPlace: ValueObject | null;
  schema_org_imageUrl: ValueObject | null;
  schema_org_url: ValueObject | null;
}

export interface ValueObject {
  value: string | null;
}

export interface MimeType {
  value: string;
  en: MimeTypeDescription | null;
}

export interface MimeTypeDescription {
  name: string;
  description: string;
}

export interface AboutMe {
  dataSets: Array<DataSetMetadata>;
  id: string;
  name: string;
  personalInfo: Url;
  canCreateDataSet: boolean;
}

export interface DataDivider {
  title: string | null;
}
