export const typeDefs = ["# Scalars\nscalar Uri\nscalar Url\nscalar Key #FIXME: ID?\nscalar Email\nscalar Markdown\n\nschema {\n  query: QueryType\n  mutation: RootMutation\n}\n\ntype RootMutation {\n    setViewComponents(input: ViewComponentsInput): Boolean\n    setFacets(input: FacetsInput): Boolean\n}\n\n# -------- Components (mutation inputs)\n\ninput ViewComponentsInput {\n    components: [ComponentInput]\n    query: \t\t\tString! #graphql syntax like string\n}\n\ninput ComponentInput {\n    type: \tComponentType # depending on this type, you can expect an x amount of fields => this can be traced back in the GUI, which is in charge of the view configuration\n    value: \tComponentValueInput\n    key:\t\tComponentValueInput\n    title: \tComponentValueInput\n    url: \t\tComponentValueInput\n    alt: \t\tComponentValueInput\n    values: [ ComponentInput ]\n}\n\ninput ComponentValueInput {\n    field: String # Can hold either a field or a fields object. Inputs do not get along with unions, that's why this is not more typesafe\n    fields: String\n}\n\ntype QueryType {\n  #the datasets that are supposed to get extra attention\n  promotedDataSets: [DataSetMetadata!]!\n  dataSets: DataSets\n  #all mimetypes that you can use when downloading data from a dataSet\n  availableExportMimetypes: [MimeType!]!\n\n  #information about the logged in user, or null of no user is logged in\n  aboutMe: AboutMe\n}\n\ntype DataSets {\n  jauco_leaders: Jauco_Leaders\n}\n\ntype MimeType {\n  value: String! @examples(values: [\"application/json\", \"application/ld+json\", \"application/xml\", \"text/csv\"])\n  en: MimeTypeDescription\n}\n\ntype MimeTypeDescription {\n  name: String! @examples(values: [\"json\", \"JSON-LD\", \"Gephi\", \"CSV\"])\n  description: String! @fake(type: lorem)\n}\n\ntype AboutMe {\n  #datasets that this user has some specific permissions on\n  dataSets: [DataSetMetadata!]!\n\n  #The unique identifier of this user\n  id: ID! @examples(values: [\"1234\"])\n\n  #a human readable name (or empty string if not available)\n  name: String! @fake(type: fullName)\n\n  #a url to a page with personal information on this user\n  personalInfo: Url! @fake(type: url)\n\n  #This user may create a new dataset on this timbuctoo instance\n  canCreateDataSet: Boolean!\n}\n\ntype DataSetMetadata {\n  dataSetId: ID! \t@examples(values: [\"jauco_leaders\"])\n  title: String!\t\t\t\t\t@fake(type:county)\n  description: String\t\t\t@fake(type:lorem)\n  imageUrl: Url\t\t\t\t\t\t@fake(type:imageUrl options: {imageCategory: cats, randomizeImageUrl: true})\n  owner: ContactInfo!\n  contact: ContactInfo!\n  provenanceInfo: ProvenanceInfo!\n  contributors: [RoleWithMembers!]!\n\n  licence: Licence!\n  roles: [DataSetPermission!]!\n\n  collections(count: Int = 20, cursor: ID = \"\"): CollectionMetadataList\n}\n\ntype Licence {\n  uri: Url @fake(type: url)\n}\n\ntype CollectionMetadataList {\n  prevCursor: ID\n  nextCursor: ID\n  items: [CollectionMetadata!]!\n}\n\ntype CollectionMetadata {\n  collectionId: ID!\t\t\t\t\t\t@examples(values:[\"Leaders\"])\n  collectionListId: ID!\t\t\t\t@examples(values:[\"LeadersList\"])\n  uri: Uri! \t\t\t\t\t\t\t\t\t@fake(type: url)\n  title: String! \t\t\t\t\t\t\t@fake(type: productName)\n  summaryProperties: SummaryProperties!\n  components(count: Int = 20, cursor: ID = \"\"): ComponentList!\n  #facetconfig?\n  properties(count: Int = 20, cursor: ID = \"\"): PropertyList!\n  archeType: String\n  #estimatedTotal: String!\n}\n\ntype SummaryProperties {\n  title: String! @examples(values:[\"schema_org_name\"])\n  description: String @examples(values:[\"schema_org_description\"])\n  image: String @examples(values:[\"schema_org_imageUrl\"])\n}\n\ntype RoleWithMembers {\n  name: String\n  members: [MemberInfo!]!\n}\n\ntype ComponentList {\n  prevCursor: ID\n  nextCursor: ID\n  items: [Component!]!\n}\n\ntype PropertyList {\n  prevCursor: ID\n  nextCursor: ID\n  items: [Property!]!\n}\n\ntype Property {\n  name: String\t\t\t\t\t\t@fake(type: colorName)\n  density: Int\t\t\t\t\t\t@fake(type: money, options: {minMoney:0, maxMoney: 100})\n  referenceTypes(count: Int = 20, cursor: ID = \"\"): TypeList\n  valueTypes(count: Int = 20, cursor: ID = \"\"): TypeList\n}\n\ntype TypeList {\n  prevCursor: ID \t@fake(type:uuid)\n  nextCursor: ID\t@fake(type:uuid)\n  items: [Uri!]!\t@fake(type:url)\n}\n\ntype Jauco_Leaders {\n  metadata: DataSetMetadata\n  LeadersList(count: Int = 20, query: String, cursor: ID = \"\"): Jauco_Leaders_LeaderCollection\n  Leaders(uri: String): Jauco_Leaders_Leader\n}\n\ntype Jauco_Leaders_LeaderCollection {\n  prevCursor: ID!,\t\t\t@fake(type:uuid)\n  nextCursor: ID!,\t\t\t@fake(type:uuid)\n  facets: [Facet!]!,\n  size: Int,\n  items: [Jauco_Leaders_Leader!]!\n}\n\ntype Jauco_Leaders_Leader {\n  uri: Uri! \t\t\t\t\t\t@fake(type:url)\n  schema_org_name: ValueObject # Added ValueObject to show that these need a {value}\n  schema_org_description: DescriptionObject\n  schema_org_birthPlace: ValueObject\n  schema_org_imageUrl: UrlObject\n  schema_org_url: ValueObject\n}\n\ntype DescriptionObject {\n  value: String  @fake(type: lorem)\n}\n\ntype UrlObject {\n  value: Url @fake(type:imageUrl, options:{ imageCategory: cats, randomizeImageUrl: true })\n}\n\ntype ValueObject {\n  value:String @fake(type:productName)\n}\n\n# -------- Facets (mutation inputs)\n\ninput FacetsInput {\n    facets: [FacetInput]\n}\n\ninput FacetInput {\n    caption: String!\n    options: [OptionInput!]!\n}\n\ninput OptionInput {\n    name: String!\n}\n\n# -------- Facets (Query)\n\ntype Facet {\n    caption: String!\t@fake(type: productCategory)\n    options: [Option!]!\n}\n\ntype Option {\n    name: String!\t@fake(type: productName)\n    count: Int! @fake(type:money)\n}\n\n# -------- Components (Query)\n\ntype Component {\n    type: \tComponentType! # depending on this type, you can expect an x amount of fields => this can be traced back in the GUI, which is in charge of the view configuration\n    value: \tComponentValue\n    key:\t\tComponentValue\n    title: \tComponentValue\n    url: \t\tComponentValue\n    alt: \t\tComponentValue\n    tree:\t\tString @examples(values: [\"{'a':{'b':'1','c':{'d':'2','e':'3'}},'f':'4'}\"]) # a stringified object to ensure we do not have to know how many levels deep we need to go\n    values: [ Component ]\n}\n\ntype ComponentValue {\n    field: \tString @examples(values: [\"Hardcoded example string\"])\n    fields: [ String ] @examples(values:[[\"level one\", \"level two\", \"level three\", \"level four\"]])\n}\n\nenum ComponentType {\n    TITLE\n    VALUE\n    IMAGE\n    LINK\n    DIVIDER\n    KEYVALUE\n    TREE\n}\n\n\n# Different kinds of values supported by the different Elements\n\ntype ContactInfo {\n  name: String! \t\t\t\t\t@fake(type:fullName)\n  email: Email \t\t\t\t\t\t@fake(type:email)\n}\n\ntype MemberInfo {\n  name: String! \t\t\t\t\t@fake(type:fullName)\n  url: Url \t\t\t\t\t\t\t\t@fake(type:url)\n}\n\ntype ProvenanceInfo {\n  title: String!\t\t\t\t\t@fake(type:state)\n  body: Markdown!\t\t\t\t\t@fake(type:lorem) #FIXME: limit size\n}\n\nenum DataSetPermission {\n  SEARCH_AND_VIEW\t\t\t\t#Is allowed to search the dataset and query it using graphql\n  DOWNLOAD_DUMP\t\t\t\t\t#Is allowed to download raw rdf files with the data and query for recent changes\n  FORK\t\t\t\t\t\t\t\t\t#Is allowed to fork the dataset (into a new dataset)\n  PUBLISH\t\t\t\t\t\t\t\t#Is allowed to change this dataset into a publicly visible one\n  EDIT_ENTRIES\t\t\t\t\t#Is allowed to edit entries using the REST endpoint\n  EDIT_DATASET\t\t\t\t\t#Is allowed to upload rdf data/change dataset metadata/upload files etc.\n  EDIT_ROLES\t\t\t\t\t\t#Is allowed to assign roles to users\n}"];
/* tslint:disable */

export interface QueryType {
  promotedDataSets: Array<DataSetMetadata>;
  dataSets: DataSets | null;
  availableExportMimetypes: Array<MimeType>;
  aboutMe: AboutMe | null;
}

export interface DataSetMetadata {
  dataSetId: string;
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
  fields: Array<string> | null;
}

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
  caption: string;
  options: Array<Option>;
}

export interface Option {
  name: string;
  count: number;
}

export interface Jauco_Leaders_Leader {
  uri: Uri;
  schema_org_name: ValueObject | null;
  schema_org_description: DescriptionObject | null;
  schema_org_birthPlace: ValueObject | null;
  schema_org_imageUrl: UrlObject | null;
  schema_org_url: ValueObject | null;
}

export interface ValueObject {
  value: string | null;
}

export interface DescriptionObject {
  value: string | null;
}

export interface UrlObject {
  value: Url | null;
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
  query: string;
}

export interface ComponentInput {
  type: ComponentType | null;
  value: ComponentValueInput | null;
  key: ComponentValueInput | null;
  title: ComponentValueInput | null;
  url: ComponentValueInput | null;
  alt: ComponentValueInput | null;
  values: Array<ComponentInput> | null;
}

export interface ComponentValueInput {
  field: string | null;
  fields: string | null;
}

export interface FacetsInput {
  facets: Array<FacetInput> | null;
}

export interface FacetInput {
  caption: string;
  options: Array<OptionInput>;
}

export interface OptionInput {
  name: string;
}

export type Key = any;
