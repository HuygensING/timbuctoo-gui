schema {
    query: QueryType
}

type QueryType {
    #all mimetypes that you can use when downloading data from a dataSet
    availableExportMimetypes(cursor: String, count: Int): [String!] @examples(values: ["application/json", "application/ld+json", "application/xml", "text/csv"])
    
    #available datasets
    dataSets: DataSets!
    
    #information about the logged in user, or null of no user is logged in
    aboutMe: AboutMe
}

type DataSets {
    #the datasets that are supposed to get extra attention
    promoted: [DataSet!]!

    #everything
    all: [DataSet!]!
}

type AboutMe {
    #datasets that this user has a specific permission on
    dataSets: [DataSet!]
    
    #The unique identifier of this user
    id: ID! @fake(type: uuid)
    
    #a human readable name (or empty string if not available)
    name: String! @fake(type: fullName)
    
    #a url to a page with personal information on this user
    personalInfo: String! @fake(type: url)
    
    #This user may create a new dataset on this timbuctoo instance
    canCreateDataSet: Boolean!
}

type Cursor {
  	type: String! @fake(type: zipCode)
  	value: String! @fake(type: county)
}

type Item {
  	tim_deathDate: String! @fake(type: county)
}

type DataSet {
  
  	prevCursor: String! @fake(type: uuid)
  	nextCursor: String! @fake(type: uuid)
  
  	items: [Item!]
    
    #The (human and computer readable) datasetname
    caption: String! @fake(type: productName)

    #A human readable description of the dataset
    description: String! @fake(type: lorem)

    #The url of the image that is iconic to this dataset
    imageUrl: String! @fake(type: imageUrl options: {imageCategory: city})
    
    #The url where you can get data out of this dataset
    graphqlUrl: String! @fake(type: url)

    #Whether this dataset is promoted
    promoted: Boolean!

    #What permissions the current user has on this dataset, or an empty list if no user is logged in (check if a user is loggen in using {aboutMe})
    permissions: [DataSetPermission]
}

enum DataSetPermission {
    #Is allowed to search the dataset and query it using graphql
    SEARCH_AND_VIEW

    #Is allowed to download raw rdf files with the data and query for recent changes
    DOWNLOAD_DUMP

    #Is allowed to fork the dataset (into a new dataset)
    FORK

    #Is allowed to change this dataset into a publicly visible one
    PUBLISH

    #Is allowed to edit entries using the REST endpoint
    EDIT_ENTRIES

    #Is allowed to upload rdf data/change dataset metadata/upload files etc.
    EDIT_DATASET

    #Is allowed to assign roles to users
    EDIT_ROLES
}