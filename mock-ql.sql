# Scalars
scalar Uri
scalar Url
scalar Key #FIXME: ID?
scalar Email
scalar Markdown

schema {
    query: QueryType
}

# - [x] check alle lists of ze gewrapped moeten worden
# - [x] check alle scalars of ze goed staan
# - [x] check alle fakes
# - [x] Loop van boven naar beneden of alle properties en hun types kloppen

type QueryType {
	#the datasets that are supposed to get extra attention
  promotedDataSets: [DataSetMetadata!]!
  dataSets: DataSets
  #all mimetypes that you can use when downloading data from a dataSet
  availableExportMimetypes: [MimeType!]!
  
  #information about the logged in user, or null of no user is logged in
  aboutMe: AboutMe
}

type DataSets {
  jauco_leaders: Jauco_Leaders
}

type MimeType {
  value: String! @examples(values: ["application/json", "application/ld+json", "application/xml", "text/csv"])
  en: MimeTypeDescription
}

type MimeTypeDescription {
  name: String! @examples(values: ["json", "JSON-LD", "Gephi", "CSV"])
  description: String! @fake(type: lorem)
}

type AboutMe {
  #datasets that this user has some specific permissions on
  dataSets: [DataSetMetadata!]!
  
  #The unique identifier of this user
  id: ID! @fake(type: uuid)
  
  #a human readable name (or empty string if not available)
  name: String! @fake(type: fullName)
  
  #a url to a page with personal information on this user
  personalInfo: Url! @fake(type: url)
  
  #This user may create a new dataset on this timbuctoo instance
  canCreateDataSet: Boolean!
}

type DataSetMetadata {
  datasetId: ID!
  title: String!					@fake(type:county)
  description: String			@fake(type:lorem)
  imageUrl: Url						@fake(type:imageUrl options: {imageCategory: cats, randomizeImageUrl: true})
  owner: ContactInfo!
  contact: ContactInfo!
  provenanceInfo: ProvenanceInfo!
  contributors: [RoleWithMembers!]!

  licence: Licence!
  roles: [DataSetPermission!]!
  
  collections(count: Int = 20, cursor: ID = ""): CollectionMetadataList
}

type Licence {
  uri: Url @fake(type: url)
}

type CollectionMetadataList {
  prevCursor: ID
  nextCursor: ID
  items: [CollectionMetadata!]!
}

type CollectionMetadata {
  collectionId: ID!
  uri: Uri! 									@fake(type: url)
  name: String! 							@fake(type: productName)
  views(count: Int = 20, cursor: ID = ""): ViewList! #FIXME: wat is een view
  #facetconfig?
  properties(count: Int = 20, cursor: ID = ""): PropertyList!
  archeType: String
  #estimatedTotal: String!
}

type RoleWithMembers {
  name: String
  members: [MemberInfo!]!
}

type ViewList {
  prevCursor: ID
  nextCursor: ID
  items: [View!]!
}

type PropertyList {
  prevCursor: ID
  nextCursor: ID
  items: [Property!]!
}

type Property {
  name: String						@fake(type: colorName)
  density: Int						@fake(type: money, options: {minMoney:0, maxMoney: 100})
  referenceTypes(count: Int = 20, cursor: ID = ""): TypeList
  valueTypes(count: Int = 20, cursor: ID = ""): TypeList
}

type TypeList {
  prevCursor: ID @fake(type:uuid)
  nextCursor: ID	@fake(type:uuid)
  items: [Uri!]!	@fake(type:url)
}

type Jauco_Leaders {
  metadata: DataSetMetadata
  Leaders(count: Int = 20, query: String, cursor: ID = ""): Jauco_Leaders_LeaderCollection
}

type Jauco_Leaders_LeaderCollection {
  prevCursor: ID!,			@fake(type:uuid)
  nextCursor: ID!,			@fake(type:uuid)
  facets: [Facet!]!,
  size: Int,
  items: [Jauco_Leaders_Leader!]!
}

type Jauco_Leaders_Leader {
  schema_org_name: String					@fake(type:fullName)
  schema_org_birthPlace: String		@fake(type:city)
}

type Facet {
  caption: String
  options: [Option!]!
}

type Option {
  name: String
  count: Int
}

type View {
  id: ID			@fake(type:uuid)
  type: Value
}

# Different types for entryData
union Value = ValueString | DataTable | DataKeyValue #| Header FIXME I removed header as hero. Do I need to add it heare?

type DataKeyValue {
  key: Key! 							@fake(type: productName)
  values: [Value!]!
}

type DataTable {
  hasHeading: Boolean!
  tableColumns: [TableColumn!]!
}

type TableColumn {
  columnName: String 			@fake(type:productCategory)
  cells: [Value!]! 				
}

type DataDivider {
  title: String						@fake(type:words)
}

# Different kinds of values supported by the different Elements
type ValueString {
	type: ValueTypes! 				
	value: String! 					@fake(type:productCategory)
	url: Url								@fake(type:url)
}

type ContactInfo {
  name: String! 					@fake(type:fullName)
  email: Email 						@fake(type:email)
}

type MemberInfo {
  name: String! 					@fake(type:fullName)
  url: Url 								@fake(type:url)
}

type ProvenanceInfo {
  title: String!					@fake(type:state)
  body: Markdown!					@fake(type:lorem) #FIXME: limit size
}

enum DataSetPermission {
    SEARCH_AND_VIEW				#Is allowed to search the dataset and query it using graphql
    DOWNLOAD_DUMP					#Is allowed to download raw rdf files with the data and query for recent changes
    FORK									#Is allowed to fork the dataset (into a new dataset)
    PUBLISH								#Is allowed to change this dataset into a publicly visible one
    EDIT_ENTRIES					#Is allowed to edit entries using the REST endpoint
		EDIT_DATASET					#Is allowed to upload rdf data/change dataset metadata/upload files etc.
    EDIT_ROLES						#Is allowed to assign roles to users
}  

enum ValueTypes {
  STRING
  LINK
}