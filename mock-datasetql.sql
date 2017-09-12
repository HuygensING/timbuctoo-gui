# Scalars
scalar Uri
scalar Url
scalar ID
scalar Key
scalar Email
scalar TimeStamp

schema {
    query: QueryType
}

type QueryType {
  collections(uri: Uri, first:Int = 0, offset:Int = 10): [Collection]
  #rawData: [RawData]				# Out of scope for now
  details: DataSetDetails
  licence: Licence
  roles: [DataSetPermission]
}

type Licence {
  uri: Uri
}

type DataSetDetails {
  hero: Header
  publisher: Publisher
  about: GenericContent
  contributors: [User]
}

type Publisher {
  owner: User
  contact: User
}

type Collection {
  uri: Uri! 									@examples(values:["one", "two"])
  name: String! 							@fake(type: productName)
  details: CollectionDetails
  nextCursor: String! 				@fake(type: url)
  entries(uri: Uri): [Entry]
  search(query: String): SearchQuery
  views: [View]
}

type SearchQuery {
  hits: Hits
  facets: [Facet]
}

type Hits {
  total: Int
  entries: [Entry]
}

type Facet {
  caption: String
  options: [Option]
}

type Option {
  name: String
  count: Int
}

type View {
  id: ID
  type: Value
}

type CollectionDetails {
  archeType: ArcheType
  properties: [Property]
  total: Int
  #records: CollectionRecords  # out of scope for now
}

type Property {
  name: String						@fake(type: colorName)
  density: Int						# 0-1 or percentages?
  referenceTypes: [Uri]
  valueTypes: [Uri]
}

type Entry {
  uri: Url 								@fake(type:uuid)
  data: [Value]
}

# Different types for entryData
union Value = ValueString | DataTable | DataKeyValue | Header

type DataKeyValue {
  key: Key! 							@fake(type: productName)
  values: [Value]
}

type DataTable {
  hasHeading: Boolean!
  tableColumns: [TableColumn]
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

# generic types
type User {
  name: String 						@fake(type:fullName)
  email: Email 						@fake(type:email)
  url: Url 								@fake(type:url)
  roles: [DataSetPermission]
  lastContribution: TimeStamp @fake(type: recentDate) # Out of scope
}

type GenericContent {
  title: String!					@fake(type:state)
  body: [String]					@fake(type:lorem)
}

type Header {
  title: String!					@fake(type:county)
  description: String			@fake(type:lorem)
  imageUrl: Url						@fake(type:imageUrl options: {imageCategory: cats})
}

type TableColumn {
  columnName: String 			@fake(type:productCategory)
  cells: [Value]
}

type ArcheType {
	title: String
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