module.exports = {
  "wwpersons": [
    {
      "name": "tempChildren",
      "type": "text"
    },
    {
      "name": "tempMotherTongue",
      "type": "text"
    },
    {
      "name": "livedIn",
      "type": "text"
    },
    {
      "name": "tempMemberships",
      "type": "text"
    },
    {
      "name": "notes",
      "type": "text"
    },
    {
      "name": "gender",
      "type": "select",
      "options": [
        "UNKNOWN",
        "MALE",
        "FEMALE",
        "NOT_APPLICABLE"
      ]
    },
    {
      "name": "tempCollaborations",
      "type": "text"
    },
    {
      "name": "tempPsChildren",
      "type": "text"
    },
    {
      "name": "personalSituation",
      "type": "text"
    },
    {
      "name": "tempName",
      "type": "text"
    },
    {
      "name": "bibliography",
      "type": "text"
    },
    {
      "name": "children",
      "type": "select",
      "options": [
        "YES",
        "NO",
        "UNKNOWN"
      ]
    },
    {
      "name": "deathDate",
      "type": "datable"
    },
    {
      "name": "links",
      "type": "links"
    },
    {
      "name": "types",
      "type": "multiselect",
      "options": [
        "ARCHETYPE",
        "AUTHOR",
        "PSEUDONYM",
        "READER"
      ]
    },
    {
      "name": "tempOldId",
      "type": "text"
    },
    {
      "name": "tempFinancialSituation",
      "type": "text"
    },
    {
      "name": "tempSpouse",
      "type": "text"
    },
    {
      "name": "health",
      "type": "text"
    },
    {
      "name": "tempDeath",
      "type": "text"
    },
    {
      "name": "tempPlaceOfBirth",
      "type": "text"
    },
    {
      "name": "birthDate",
      "type": "datable"
    },
    {
      "name": "tempBirthPlace",
      "type": "text"
    },
    {
      "name": "names",
      "type": "names",
      "options": [
        "FORENAME",
        "SURNAME",
        "NAME_LINK",
        "ROLE_NAME",
        "GEN_NAME"
      ]
    },
    {
      "name": "nationality",
      "type": "text"
    },
    {
      "name": "tempPseudonyms",
      "type": "text"
    },
    {
      "name": "tempDeathPlace",
      "type": "text"
    },
    {
      "name": "hasBirthPlace",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwlocations\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "hasBirthPlace",
        "inName": "isBirthPlaceOf",
        "targetCollection": "wwlocations",
        "relationCollection": "wwrelations",
        "relationTypeId": "9c93ba01-e6af-4790-8eb8-8497be04b7ec"
      }
    },
    {
      "name": "hasDeathPlace",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwlocations\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "hasDeathPlace",
        "inName": "isDeathPlaceOf",
        "targetCollection": "wwlocations",
        "relationCollection": "wwrelations",
        "relationTypeId": "43a9e190-8cfe-4df3-b11d-23af4a738bc2"
      }
    },
    {
      "name": "hasResidenceLocation",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwlocations\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "hasResidenceLocation",
        "inName": "isResidenceLocationOf",
        "targetCollection": "wwlocations",
        "relationCollection": "wwrelations",
        "relationTypeId": "f0183eee-449e-40b3-af13-a642568cc78e"
      }
    },
    {
      "name": "hasPersonLanguage",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwlanguages\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "hasPersonLanguage",
        "inName": "isPersonLanguageOf",
        "targetCollection": "wwlanguages",
        "relationCollection": "wwrelations",
        "relationTypeId": "62914bb9-5aaa-47ad-8604-256fcb489493"
      }
    },
    {
      "name": "isCollaboratorOf",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwpersons\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "isCollaboratorOf",
        "inName": "isCollaboratorOf",
        "targetCollection": "wwpersons",
        "relationCollection": "wwrelations",
        "relationTypeId": "1519d559-1d1b-406b-bf71-5f8d7a7c3fec"
      }
    },
    {
      "name": "isMemberOf",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwcollectives\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "isMemberOf",
        "inName": "hasMember",
        "targetCollection": "wwcollectives",
        "relationCollection": "wwrelations",
        "relationTypeId": "b3efb5d5-7c7b-478f-9016-3960fa4bdb05"
      }
    },
    {
      "name": "isPseudonymOf",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwpersons\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "isPseudonymOf",
        "inName": "hasPseudonym",
        "targetCollection": "wwpersons",
        "relationCollection": "wwrelations",
        "relationTypeId": "29cb6dc7-b37d-4dba-acab-007ee12f0096"
      }
    },
    {
      "name": "isRelatedTo",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwpersons\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "isRelatedTo",
        "inName": "isRelatedTo",
        "targetCollection": "wwpersons",
        "relationCollection": "wwrelations",
        "relationTypeId": "b3f0512c-af46-4717-bcd6-716a50750dd9"
      }
    },
    {
      "name": "isParentOf",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwpersons\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "isParentOf",
        "inName": "isChildOf",
        "targetCollection": "wwpersons",
        "relationCollection": "wwrelations",
        "relationTypeId": "e5dbb792-44fb-4fef-876b-1400f260cac6"
      }
    },
    {
      "name": "isSpouseOf",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwpersons\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "isSpouseOf",
        "inName": "isSpouseOf",
        "targetCollection": "wwpersons",
        "relationCollection": "wwrelations",
        "relationTypeId": "22541b7f-8664-4459-a945-8e6278ae7991"
      }
    },
    {
      "name": "hasBiography",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwdocuments\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "hasBiography",
        "inName": "isBiographyOf",
        "targetCollection": "wwdocuments",
        "relationCollection": "wwrelations",
        "relationTypeId": "1f6782ea-5b0c-4fcd-8f93-bb2da4b000b0"
      }
    },
    {
      "name": "isPersonCommentedOnIn",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwdocuments\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "isPersonCommentedOnIn",
        "inName": "commentsOnPerson",
        "targetCollection": "wwdocuments",
        "relationCollection": "wwrelations",
        "relationTypeId": "e9af721e-16a6-4b0a-ac7f-82d4f8c49228"
      }
    },
    {
      "name": "isDedicatedPersonOf",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwdocuments\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "isDedicatedPersonOf",
        "inName": "isDedicatedTo",
        "targetCollection": "wwdocuments",
        "relationCollection": "wwrelations",
        "relationTypeId": "0cd5538a-6981-40af-9637-875552c75770"
      }
    },
    {
      "name": "isPersonAwarded",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwdocuments\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "isPersonAwarded",
        "inName": "isAwardForPerson",
        "targetCollection": "wwdocuments",
        "relationCollection": "wwrelations",
        "relationTypeId": "cb17f01e-7fd6-45b4-968f-f3211beeaf1b"
      }
    },
    {
      "name": "isPersonListedOn",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwdocuments\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "isPersonListedOn",
        "inName": "listsPerson",
        "targetCollection": "wwdocuments",
        "relationCollection": "wwrelations",
        "relationTypeId": "2af9a6a1-6f22-4f93-b80f-de1d514413b8"
      }
    },
    {
      "name": "isPersonMentionedIn",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwdocuments\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "isPersonMentionedIn",
        "inName": "mentionsPerson",
        "targetCollection": "wwdocuments",
        "relationCollection": "wwrelations",
        "relationTypeId": "ec26280a-0bc8-4f35-a786-dc4338ec8684"
      }
    },
    {
      "name": "hasObituary",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwdocuments\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "hasObituary",
        "inName": "isObituaryOf",
        "targetCollection": "wwdocuments",
        "relationCollection": "wwrelations",
        "relationTypeId": "5cb928ad-d5b3-469b-83ac-1c35c21f42d7"
      }
    },
    {
      "name": "isPersonQuotedIn",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwdocuments\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "isPersonQuotedIn",
        "inName": "quotesPerson",
        "targetCollection": "wwdocuments",
        "relationCollection": "wwrelations",
        "relationTypeId": "2586f43a-49ca-45b9-9c00-32008eecb9d5"
      }
    },
    {
      "name": "isPersonReferencedIn",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwdocuments\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "isPersonReferencedIn",
        "inName": "referencesPerson",
        "targetCollection": "wwdocuments",
        "relationCollection": "wwrelations",
        "relationTypeId": "52d5eee9-f607-4478-9183-66b0093217f7"
      }
    },
    {
      "name": "hasEducation",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwkeywords\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "hasEducation",
        "inName": "isEducationOf",
        "targetCollection": "wwkeywords",
        "relationCollection": "wwrelations",
        "relationTypeId": "0cebcf21-d54a-46b6-8e91-d53e4e6fc7a5"
      }
    },
    {
      "name": "hasFinancialSituation",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwkeywords\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "hasFinancialSituation",
        "inName": "isFinancialSituationOf",
        "targetCollection": "wwkeywords",
        "relationCollection": "wwrelations",
        "relationTypeId": "e77e216f-ce46-4861-823a-d5aa06665959"
      }
    },
    {
      "name": "hasMaritalStatus",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwkeywords\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "hasMaritalStatus",
        "inName": "isMaritalStatusOf",
        "targetCollection": "wwkeywords",
        "relationCollection": "wwrelations",
        "relationTypeId": "d3951eeb-d66f-41c5-8545-9b6498400fa7"
      }
    },
    {
      "name": "hasProfession",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwkeywords\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "hasProfession",
        "inName": "isProfessionOf",
        "targetCollection": "wwkeywords",
        "relationCollection": "wwrelations",
        "relationTypeId": "5f83410f-3b77-404a-ad53-3b2cb7607674"
      }
    },
    {
      "name": "hasReligion",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwkeywords\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "hasReligion",
        "inName": "isReligionOf",
        "targetCollection": "wwkeywords",
        "relationCollection": "wwrelations",
        "relationTypeId": "c1b503f9-5023-4cd2-9a3b-5a3869c4b19c"
      }
    },
    {
      "name": "hasSocialClass",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwkeywords\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "hasSocialClass",
        "inName": "isSocialClassOf",
        "targetCollection": "wwkeywords",
        "relationCollection": "wwrelations",
        "relationTypeId": "207c10f8-78c5-4e8e-b30e-3df625034478"
      }
    },
    {
      "name": "isSiblingOf",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwpersons\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "isSiblingOf",
        "inName": "isSiblingOf",
        "targetCollection": "wwpersons",
        "relationCollection": "wwrelations",
        "relationTypeId": "0d17f25c-9d73-4c78-bbff-b435f0be1326"
      }
    },
    {
      "name": "isGrandparentOf",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwpersons\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "isGrandparentOf",
        "inName": "isGrandchildOf",
        "targetCollection": "wwpersons",
        "relationCollection": "wwrelations",
        "relationTypeId": "9bdb7983-cae2-4e93-85c2-a525ec893bbe"
      }
    },
    {
      "name": "isCreatorOf",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwdocuments\/autocomplete",
      "relation": {
        "direction": "IN",
        "outName": "isCreatedBy",
        "inName": "isCreatorOf",
        "targetCollection": "wwdocuments",
        "relationCollection": "wwrelations",
        "relationTypeId": "6dd9b78d-046d-477a-acbb-1c18b2a7c7e9"
      }
    }
  ],
  "wwdocuments": [
    {
      "name": "date",
      "type": "datable"
    },
    {
      "name": "reference",
      "type": "text"
    },
    {
      "name": "tempCreator",
      "type": "text"
    },
    {
      "name": "tempLanguage",
      "type": "text"
    },
    {
      "name": "notes",
      "type": "text"
    },
    {
      "name": "tempOldId",
      "type": "text"
    },
    {
      "name": "documentType",
      "type": "select",
      "options": [
        "UNKNOWN",
        "ANTHOLOGY",
        "ARTICLE",
        "AWARD",
        "CATALOGUE",
        "COMPILATION",
        "DIARY",
        "LETTER",
        "LIST",
        "MONOGRAPH",
        "PERIODICAL",
        "PICTURE",
        "PUBLICITY",
        "SHEETMUSIC",
        "THEATERSCRIPT",
        "WORK"
      ]
    },
    {
      "name": "links",
      "type": "links"
    },
    {
      "name": "title",
      "type": "text"
    },
    {
      "name": "englishTitle",
      "type": "text"
    },
    {
      "name": "hasGenre",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwkeywords\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "hasGenre",
        "inName": "isGenreOf",
        "targetCollection": "wwkeywords",
        "relationCollection": "wwrelations",
        "relationTypeId": "941f29e3-09fc-4f62-b8cd-538c757e0951"
      }
    },
    {
      "name": "hasWorkLanguage",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwlanguages\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "hasWorkLanguage",
        "inName": "isWorkLanguageOf",
        "targetCollection": "wwlanguages",
        "relationCollection": "wwrelations",
        "relationTypeId": "41cca2df-c49e-4bd2-9b4f-1d480eecda3c"
      }
    },
    {
      "name": "hasPublishLocation",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwlocations\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "hasPublishLocation",
        "inName": "isPublishLocationOf",
        "targetCollection": "wwlocations",
        "relationCollection": "wwrelations",
        "relationTypeId": "93baca3b-64f2-422e-a018-f61c7230f556"
      }
    },
    {
      "name": "isCreatedBy",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwpersons\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "isCreatedBy",
        "inName": "isCreatorOf",
        "targetCollection": "wwpersons",
        "relationCollection": "wwrelations",
        "relationTypeId": "6dd9b78d-046d-477a-acbb-1c18b2a7c7e9"
      }
    },
    {
      "name": "isPublishedBy",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwcollectives\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "isPublishedBy",
        "inName": "isPublisherOf",
        "targetCollection": "wwcollectives",
        "relationCollection": "wwrelations",
        "relationTypeId": "56414d88-b409-4ad3-8fad-dfcd52d3dd52"
      }
    },
    {
      "name": "isStoredAt",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwcollectives\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "isStoredAt",
        "inName": "isStorageOf",
        "targetCollection": "wwcollectives",
        "relationCollection": "wwrelations",
        "relationTypeId": "3a5fc431-037d-42d4-a810-9d8b33b23307"
      }
    },
    {
      "name": "hasEdition",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwdocuments\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "hasEdition",
        "inName": "isEditionOf",
        "targetCollection": "wwdocuments",
        "relationCollection": "wwrelations",
        "relationTypeId": "d2144e5d-8d5d-4e7a-ad76-2589f34258ec"
      }
    },
    {
      "name": "hasSequel",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwdocuments\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "hasSequel",
        "inName": "isSequelOf",
        "targetCollection": "wwdocuments",
        "relationCollection": "wwrelations",
        "relationTypeId": "0c631c1d-614f-4078-8a2c-3d1e17f8894f"
      }
    },
    {
      "name": "hasTranslation",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwdocuments\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "hasTranslation",
        "inName": "isTranslationOf",
        "targetCollection": "wwdocuments",
        "relationCollection": "wwrelations",
        "relationTypeId": "c9c02e2d-4bd6-4eec-a00a-d791830cdf6d"
      }
    },
    {
      "name": "hasAdaptation",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwdocuments\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "hasAdaptation",
        "inName": "isAdaptationOf",
        "targetCollection": "wwdocuments",
        "relationCollection": "wwrelations",
        "relationTypeId": "f32f6b71-0a7c-4dcb-a45e-04fed5f2ed9f"
      }
    },
    {
      "name": "hasPlagiarismBy",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwdocuments\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "hasPlagiarismBy",
        "inName": "isPlagiarismOf",
        "targetCollection": "wwdocuments",
        "relationCollection": "wwrelations",
        "relationTypeId": "71842860-d4f2-4951-b0fb-ebe78fb0ebd8"
      }
    },
    {
      "name": "isAnnotatedIn",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwdocuments\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "isAnnotatedIn",
        "inName": "hasAnnotationsOn",
        "targetCollection": "wwdocuments",
        "relationCollection": "wwrelations",
        "relationTypeId": "9b941fb2-d5a7-4704-9455-949f1d3a8b91"
      }
    },
    {
      "name": "hasBibliography",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwdocuments\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "hasBibliography",
        "inName": "isBibliographyOf",
        "targetCollection": "wwdocuments",
        "relationCollection": "wwrelations",
        "relationTypeId": "8f8ef8c8-95fd-4ffb-8134-bcaded8c3947"
      }
    },
    {
      "name": "isCensoredBy",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwdocuments\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "isCensoredBy",
        "inName": "isCensoringOf",
        "targetCollection": "wwdocuments",
        "relationCollection": "wwrelations",
        "relationTypeId": "c48a6915-1313-44ab-abf2-145d0404c412"
      }
    },
    {
      "name": "isWorkCommentedOnIn",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwdocuments\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "isWorkCommentedOnIn",
        "inName": "commentsOnWork",
        "targetCollection": "wwdocuments",
        "relationCollection": "wwrelations",
        "relationTypeId": "43918d7b-b027-4bbd-9e90-bcf382fe3242"
      }
    },
    {
      "name": "containedInAnthology",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwdocuments\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "containedInAnthology",
        "inName": "isAnthologyContaining",
        "targetCollection": "wwdocuments",
        "relationCollection": "wwrelations",
        "relationTypeId": "5fe39166-37d9-4c19-b996-8883b486db6f"
      }
    },
    {
      "name": "isCopiedBy",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwdocuments\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "isCopiedBy",
        "inName": "isCopyOf",
        "targetCollection": "wwdocuments",
        "relationCollection": "wwrelations",
        "relationTypeId": "af953b9f-bf95-4f04-b5a6-0e6ecd3a4d70"
      }
    },
    {
      "name": "isWorkAwarded",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwdocuments\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "isWorkAwarded",
        "inName": "isAwardForWork",
        "targetCollection": "wwdocuments",
        "relationCollection": "wwrelations",
        "relationTypeId": "14b0e172-8403-4eda-8ce8-162cd253bbd9"
      }
    },
    {
      "name": "hasPreface",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwdocuments\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "hasPreface",
        "inName": "isPrefaceOf",
        "targetCollection": "wwdocuments",
        "relationCollection": "wwrelations",
        "relationTypeId": "96283be9-017e-45ba-9dd3-b42f76777e4e"
      }
    },
    {
      "name": "isIntertextualOf",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwdocuments\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "isIntertextualOf",
        "inName": "isIntertextualTo",
        "targetCollection": "wwdocuments",
        "relationCollection": "wwrelations",
        "relationTypeId": "96ab4cc6-2653-49d8-b59d-5fc99627bd66"
      }
    },
    {
      "name": "isWorkListedOn",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwdocuments\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "isWorkListedOn",
        "inName": "listsWork",
        "targetCollection": "wwdocuments",
        "relationCollection": "wwrelations",
        "relationTypeId": "5667b886-9647-47f5-bfee-1eca3c5bfedd"
      }
    },
    {
      "name": "isWorkMentionedIn",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwdocuments\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "isWorkMentionedIn",
        "inName": "mentionsWork",
        "targetCollection": "wwdocuments",
        "relationCollection": "wwrelations",
        "relationTypeId": "11b13eaa-8fc7-4aba-a5ef-ade19d506515"
      }
    },
    {
      "name": "isParodiedBy",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwdocuments\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "isParodiedBy",
        "inName": "isParodyOf",
        "targetCollection": "wwdocuments",
        "relationCollection": "wwrelations",
        "relationTypeId": "ea8a6861-b449-40c0-af33-69361b2264a9"
      }
    },
    {
      "name": "isWorkQuotedIn",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwdocuments\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "isWorkQuotedIn",
        "inName": "quotesWork",
        "targetCollection": "wwdocuments",
        "relationCollection": "wwrelations",
        "relationTypeId": "5c19cebf-a667-460b-adb4-a94f4b21df06"
      }
    },
    {
      "name": "isWorkReferencedIn",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwdocuments\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "isWorkReferencedIn",
        "inName": "referencesWork",
        "targetCollection": "wwdocuments",
        "relationCollection": "wwrelations",
        "relationTypeId": "bdfd1825-c289-430d-bf6e-2bee552cadad"
      }
    },
    {
      "name": "hasSourceCategory",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwkeywords\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "hasSourceCategory",
        "inName": "isSourceCategoryOf",
        "targetCollection": "wwkeywords",
        "relationCollection": "wwrelations",
        "relationTypeId": "3e661b55-b044-4840-baf2-ae6090ec08c7"
      }
    },
    {
      "name": "hasDocumentSource",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwdocuments\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "hasDocumentSource",
        "inName": "isDocumentSourceOf",
        "targetCollection": "wwdocuments",
        "relationCollection": "wwrelations",
        "relationTypeId": "07b3f4d4-2baf-424c-b2a8-6c66f316af2f"
      }
    },
    {
      "name": "isBiographyOf",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwpersons\/autocomplete",
      "relation": {
        "direction": "IN",
        "outName": "hasBiography",
        "inName": "isBiographyOf",
        "targetCollection": "wwpersons",
        "relationCollection": "wwrelations",
        "relationTypeId": "1f6782ea-5b0c-4fcd-8f93-bb2da4b000b0"
      }
    },
    {
      "name": "commentsOnPerson",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwpersons\/autocomplete",
      "relation": {
        "direction": "IN",
        "outName": "isPersonCommentedOnIn",
        "inName": "commentsOnPerson",
        "targetCollection": "wwpersons",
        "relationCollection": "wwrelations",
        "relationTypeId": "e9af721e-16a6-4b0a-ac7f-82d4f8c49228"
      }
    },
    {
      "name": "isDedicatedTo",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwpersons\/autocomplete",
      "relation": {
        "direction": "IN",
        "outName": "isDedicatedPersonOf",
        "inName": "isDedicatedTo",
        "targetCollection": "wwpersons",
        "relationCollection": "wwrelations",
        "relationTypeId": "0cd5538a-6981-40af-9637-875552c75770"
      }
    },
    {
      "name": "isAwardForPerson",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwpersons\/autocomplete",
      "relation": {
        "direction": "IN",
        "outName": "isPersonAwarded",
        "inName": "isAwardForPerson",
        "targetCollection": "wwpersons",
        "relationCollection": "wwrelations",
        "relationTypeId": "cb17f01e-7fd6-45b4-968f-f3211beeaf1b"
      }
    },
    {
      "name": "listsPerson",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwpersons\/autocomplete",
      "relation": {
        "direction": "IN",
        "outName": "isPersonListedOn",
        "inName": "listsPerson",
        "targetCollection": "wwpersons",
        "relationCollection": "wwrelations",
        "relationTypeId": "2af9a6a1-6f22-4f93-b80f-de1d514413b8"
      }
    },
    {
      "name": "mentionsPerson",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwpersons\/autocomplete",
      "relation": {
        "direction": "IN",
        "outName": "isPersonMentionedIn",
        "inName": "mentionsPerson",
        "targetCollection": "wwpersons",
        "relationCollection": "wwrelations",
        "relationTypeId": "ec26280a-0bc8-4f35-a786-dc4338ec8684"
      }
    },
    {
      "name": "isObituaryOf",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwpersons\/autocomplete",
      "relation": {
        "direction": "IN",
        "outName": "hasObituary",
        "inName": "isObituaryOf",
        "targetCollection": "wwpersons",
        "relationCollection": "wwrelations",
        "relationTypeId": "5cb928ad-d5b3-469b-83ac-1c35c21f42d7"
      }
    },
    {
      "name": "quotesPerson",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwpersons\/autocomplete",
      "relation": {
        "direction": "IN",
        "outName": "isPersonQuotedIn",
        "inName": "quotesPerson",
        "targetCollection": "wwpersons",
        "relationCollection": "wwrelations",
        "relationTypeId": "2586f43a-49ca-45b9-9c00-32008eecb9d5"
      }
    },
    {
      "name": "referencesPerson",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwpersons\/autocomplete",
      "relation": {
        "direction": "IN",
        "outName": "isPersonReferencedIn",
        "inName": "referencesPerson",
        "targetCollection": "wwpersons",
        "relationCollection": "wwrelations",
        "relationTypeId": "52d5eee9-f607-4478-9183-66b0093217f7"
      }
    }
  ],
  "wwcollectives": [
    {
      "name": "tempLocationPlacename",
      "type": "text"
    },
    {
      "name": "tempShortName",
      "type": "text"
    },
    {
      "name": "tempOrigin",
      "type": "text"
    },
    {
      "name": "name",
      "type": "text"
    },
    {
      "name": "links",
      "type": "links"
    },
    {
      "name": "type",
      "type": "select",
      "options": [
        "UNKNOWN",
        "ACADEMY",
        "ASSOCIATION",
        "LIBRARY",
        "PUBLISHER",
        "SHOP"
      ]
    },
    {
      "name": "tempType",
      "type": "text"
    },
    {
      "name": "hasLocation",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwlocations\/autocomplete",
      "relation": {
        "direction": "OUT",
        "outName": "hasLocation",
        "inName": "isLocationOf",
        "targetCollection": "wwlocations",
        "relationCollection": "wwrelations",
        "relationTypeId": "1ecc73b1-96d3-4d14-af4e-a72f8e2ec3ef"
      }
    },
    {
      "name": "hasMember",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwpersons\/autocomplete",
      "relation": {
        "direction": "IN",
        "outName": "isMemberOf",
        "inName": "hasMember",
        "targetCollection": "wwpersons",
        "relationCollection": "wwrelations",
        "relationTypeId": "b3efb5d5-7c7b-478f-9016-3960fa4bdb05"
      }
    },
    {
      "name": "isPublisherOf",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwdocuments\/autocomplete",
      "relation": {
        "direction": "IN",
        "outName": "isPublishedBy",
        "inName": "isPublisherOf",
        "targetCollection": "wwdocuments",
        "relationCollection": "wwrelations",
        "relationTypeId": "56414d88-b409-4ad3-8fad-dfcd52d3dd52"
      }
    },
    {
      "name": "isStorageOf",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwdocuments\/autocomplete",
      "relation": {
        "direction": "IN",
        "outName": "isStoredAt",
        "inName": "isStorageOf",
        "targetCollection": "wwdocuments",
        "relationCollection": "wwrelations",
        "relationTypeId": "3a5fc431-037d-42d4-a810-9d8b33b23307"
      }
    }
  ],
  "wwlocations": [
    {
      "name": "isBirthPlaceOf",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwpersons\/autocomplete",
      "relation": {
        "direction": "IN",
        "outName": "hasBirthPlace",
        "inName": "isBirthPlaceOf",
        "targetCollection": "wwpersons",
        "relationCollection": "wwrelations",
        "relationTypeId": "9c93ba01-e6af-4790-8eb8-8497be04b7ec"
      }
    },
    {
      "name": "isDeathPlaceOf",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwpersons\/autocomplete",
      "relation": {
        "direction": "IN",
        "outName": "hasDeathPlace",
        "inName": "isDeathPlaceOf",
        "targetCollection": "wwpersons",
        "relationCollection": "wwrelations",
        "relationTypeId": "43a9e190-8cfe-4df3-b11d-23af4a738bc2"
      }
    },
    {
      "name": "isResidenceLocationOf",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwpersons\/autocomplete",
      "relation": {
        "direction": "IN",
        "outName": "hasResidenceLocation",
        "inName": "isResidenceLocationOf",
        "targetCollection": "wwpersons",
        "relationCollection": "wwrelations",
        "relationTypeId": "f0183eee-449e-40b3-af13-a642568cc78e"
      }
    },
    {
      "name": "isLocationOf",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwcollectives\/autocomplete",
      "relation": {
        "direction": "IN",
        "outName": "hasLocation",
        "inName": "isLocationOf",
        "targetCollection": "wwcollectives",
        "relationCollection": "wwrelations",
        "relationTypeId": "1ecc73b1-96d3-4d14-af4e-a72f8e2ec3ef"
      }
    },
    {
      "name": "isPublishLocationOf",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwdocuments\/autocomplete",
      "relation": {
        "direction": "IN",
        "outName": "hasPublishLocation",
        "inName": "isPublishLocationOf",
        "targetCollection": "wwdocuments",
        "relationCollection": "wwrelations",
        "relationTypeId": "93baca3b-64f2-422e-a018-f61c7230f556"
      }
    }
  ],
  "wwkeywords": [
    {
      "name": "isGenreOf",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwdocuments\/autocomplete",
      "relation": {
        "direction": "IN",
        "outName": "hasGenre",
        "inName": "isGenreOf",
        "targetCollection": "wwdocuments",
        "relationCollection": "wwrelations",
        "relationTypeId": "941f29e3-09fc-4f62-b8cd-538c757e0951"
      }
    },
    {
      "name": "isSourceCategoryOf",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwdocuments\/autocomplete",
      "relation": {
        "direction": "IN",
        "outName": "hasSourceCategory",
        "inName": "isSourceCategoryOf",
        "targetCollection": "wwdocuments",
        "relationCollection": "wwrelations",
        "relationTypeId": "3e661b55-b044-4840-baf2-ae6090ec08c7"
      }
    },
    {
      "name": "isEducationOf",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwpersons\/autocomplete",
      "relation": {
        "direction": "IN",
        "outName": "hasEducation",
        "inName": "isEducationOf",
        "targetCollection": "wwpersons",
        "relationCollection": "wwrelations",
        "relationTypeId": "0cebcf21-d54a-46b6-8e91-d53e4e6fc7a5"
      }
    },
    {
      "name": "isFinancialSituationOf",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwpersons\/autocomplete",
      "relation": {
        "direction": "IN",
        "outName": "hasFinancialSituation",
        "inName": "isFinancialSituationOf",
        "targetCollection": "wwpersons",
        "relationCollection": "wwrelations",
        "relationTypeId": "e77e216f-ce46-4861-823a-d5aa06665959"
      }
    },
    {
      "name": "isMaritalStatusOf",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwpersons\/autocomplete",
      "relation": {
        "direction": "IN",
        "outName": "hasMaritalStatus",
        "inName": "isMaritalStatusOf",
        "targetCollection": "wwpersons",
        "relationCollection": "wwrelations",
        "relationTypeId": "d3951eeb-d66f-41c5-8545-9b6498400fa7"
      }
    },
    {
      "name": "isProfessionOf",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwpersons\/autocomplete",
      "relation": {
        "direction": "IN",
        "outName": "hasProfession",
        "inName": "isProfessionOf",
        "targetCollection": "wwpersons",
        "relationCollection": "wwrelations",
        "relationTypeId": "5f83410f-3b77-404a-ad53-3b2cb7607674"
      }
    },
    {
      "name": "isReligionOf",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwpersons\/autocomplete",
      "relation": {
        "direction": "IN",
        "outName": "hasReligion",
        "inName": "isReligionOf",
        "targetCollection": "wwpersons",
        "relationCollection": "wwrelations",
        "relationTypeId": "c1b503f9-5023-4cd2-9a3b-5a3869c4b19c"
      }
    },
    {
      "name": "isSocialClassOf",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwpersons\/autocomplete",
      "relation": {
        "direction": "IN",
        "outName": "hasSocialClass",
        "inName": "isSocialClassOf",
        "targetCollection": "wwpersons",
        "relationCollection": "wwrelations",
        "relationTypeId": "207c10f8-78c5-4e8e-b30e-3df625034478"
      }
    }
  ],
  "wwrelations": [
  ],
  "wwlanguages": [
    {
      "name": "isPersonLanguageOf",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwpersons\/autocomplete",
      "relation": {
        "direction": "IN",
        "outName": "hasPersonLanguage",
        "inName": "isPersonLanguageOf",
        "targetCollection": "wwpersons",
        "relationCollection": "wwrelations",
        "relationTypeId": "62914bb9-5aaa-47ad-8604-256fcb489493"
      }
    },
    {
      "name": "isWorkLanguageOf",
      "type": "relation",
      "quicksearch": "\/v2.1\/domain\/wwdocuments\/autocomplete",
      "relation": {
        "direction": "IN",
        "outName": "hasWorkLanguage",
        "inName": "isWorkLanguageOf",
        "targetCollection": "wwdocuments",
        "relationCollection": "wwrelations",
        "relationTypeId": "41cca2df-c49e-4bd2-9b4f-1d480eecda3c"
      }
    }
  ]
};