import gql from 'graphql-tag';

export const query = function(dataSetId: string, collectionId: string) {
    const queryString = `
query emlo2($uri: String!) {
  dataSets {
    ${dataSetId} {
      ${collectionId}(uri: $uri) {
        title {
          ...value
        }
        em_preferredName {
          ...value
        }
        em_alternateNameList {
          items {
            ...value
          }
        }
        em_where {
          em_when {
            ... on ue85b462c027ef2b282bf87b44e9670ebb085715d__emlo_oppole20180627_em_Time_period {
              em_timespan {
                ... on ue85b462c027ef2b282bf87b44e9670ebb085715d__emlo_oppole20180627_em_Time_span {
                  em_latestStart_ {
                    ...value
                  }
                  em_earliestEnd_ {
                    ...value
                  }
                }
              }
            }
          }
          em_location {
            wgs84_pos_lat {
              ...value
            }
            wgs84_pos_long {
              ...value
            }
          }
        }
        em_canonicalURI {
          uri
        }
        em_hasAnnotationList {
          items {
            oa_hasBody {
              ... on ue85b462c027ef2b282bf87b44e9670ebb085715d__emlo_oppole20180627_em_Place_name {
                rdf_type {
                  uri
                }
                em_name {
                  ...value
                }
                em_language {
                  em_tag {
                    ...value
                  }
                }
              }
              ... on ue85b462c027ef2b282bf87b44e9670ebb085715d__emlo_oppole20180627_em_Calendar {
                rdf_type {
                  uri
                }
                rdfs_label {
                  ...value
                }
              }
              ... on ue85b462c027ef2b282bf87b44e9670ebb085715d__emlo_oppole20180627_em_MapResource {
                rdf_type {
                  uri
                }
                title {
                  ...value
                }
              }
            }
            em_sourceList {
              items {
                rdfs_label {
                  ...value
                }
              }
            }
            em_when {
              rdfs_label {
                ...value
              }
              title {
                ...value
              }
              em_timespan {
                ... on ue85b462c027ef2b282bf87b44e9670ebb085715d__emlo_oppole20180627_em_Time_span {
                  em_latestStart_ {
                    ...value
                  }
                  em_earliestEnd_ {
                    ...value
                  }
                }
              }
            }
          }
        }
        em_hasRelationList {
          items {
            ...recursiveRelations
          }
        }
        rdfs_seeAlsoList {
          items {
            title {
              ...value
            }
            em_start {
              ...value
            }
          }
        }
        em_coreDataRef {
          title {
            ...value
          }
        }
        em_editorialNote {
          ...value
        }
        em_reference {
          ... on ue85b462c027ef2b282bf87b44e9670ebb085715d__emlo_oppole20180627_em_Bib_entry {
            dcterms_title {
              ...value
            }
            dcterms_source {
              ...value
            }
          }
        }
      }
    }
  }
}

fragment recursiveRelations on ue85b462c027ef2b282bf87b44e9670ebb085715d__emlo_oppole20180627_em_Qualified_relation {
  ...relationFields
  em_relationTo {
    ...relatedPlace
    ... on ue85b462c027ef2b282bf87b44e9670ebb085715d__emlo_oppole20180627_em_Place {
      em_hasRelationList {
        items {
          ...relationFields
          em_relationTo {
            ...relatedPlace
            ... on ue85b462c027ef2b282bf87b44e9670ebb085715d__emlo_oppole20180627_em_Place {
              em_hasRelationList {
                items {
                  ...relationFields
                  em_relationTo {
                    ...relatedPlace
                    ... on ue85b462c027ef2b282bf87b44e9670ebb085715d__emlo_oppole20180627_em_Place {
                      em_hasRelationList {
                        items {
                          ...relationFields
                          em_relationTo {
                            ...relatedPlace
                            ... on ue85b462c027ef2b282bf87b44e9670ebb085715d__emlo_oppole20180627_em_Place {
                              em_hasRelationList {
                                items {
                                  ...relationFields
                                  em_relationTo {
                                    ...relatedPlace
                                    ... on ue85b462c027ef2b282bf87b44e9670ebb085715d__emlo_oppole20180627_em_Place {
                                      em_hasRelationList {
                                        items {
                                          ...relationFields
                                          em_relationTo {
                                            ...relatedPlace
                                            ... on ue85b462c027ef2b282bf87b44e9670ebb085715d__emlo_oppole20180627_em_Place {
                                              em_hasRelationList {
                                                items {
                                                  ...relationFields
                                                  em_relationTo {
                                                    ...relatedPlace
                                                    ... on ue85b462c027ef2b282bf87b44e9670ebb085715d__emlo_oppole20180627_em_Place {
                                                      em_hasRelationList {
                                                        items {
                                                          ...relationFields
                                                          em_relationTo {
                                                            ...relatedPlace
                                                            ... on ue85b462c027ef2b282bf87b44e9670ebb085715d__emlo_oppole20180627_em_Place {
                                                              em_hasRelationList {
                                                                items {
                                                                  ...relationFields
                                                                  em_relationTo {
                                                                    ...relatedPlace
                                                                    ... on ue85b462c027ef2b282bf87b44e9670ebb085715d__emlo_oppole20180627_em_Place {
                                                                      em_hasRelationList {
                                                                        items {
                                                                          ...relationFields
                                                                          em_relationTo {
                                                                            ...relatedPlace
                                                                            ... on ue85b462c027ef2b282bf87b44e9670ebb085715d__emlo_oppole20180627_em_Place {
                                                                              em_hasRelationList {
                                                                                items {
                                                                                  ...relationFields
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

fragment value on Value {
  value
  type 
}

fragment relationFields on ue85b462c027ef2b282bf87b44e9670ebb085715d__emlo_oppole20180627_em_Qualified_relation {
  em_relationType {
    title {
      ...value
    }
  }
  em_when {
    rdfs_label {
      ...value
    }
    em_timespan {
      ... on ue85b462c027ef2b282bf87b44e9670ebb085715d__emlo_oppole20180627_em_Time_span {
        em_latestStart_ {
          ...value
        }
        em_earliestEnd_ {
          ...value
        }
      }
    }
  }
}

fragment relatedPlace on ue85b462c027ef2b282bf87b44e9670ebb085715d__emlo_oppole20180627_em_Place {
  title {
    ...value
  }
  em_preferredName {
    ...value
  }
  em_placeCategory {
    ... on ue85b462c027ef2b282bf87b44e9670ebb085715d__emlo_oppole20180627_skos_Concept {
      rdfs_label {
        ...value
      }
    }
  }
}
`;

    return gql`
        ${queryString}
    `;
};
