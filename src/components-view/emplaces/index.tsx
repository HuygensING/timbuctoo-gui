import React, { SFC } from 'react';
import { em_Place, em_Place_em_reference, em_Place_em_reference_oppole20180627_em_Bib_entry } from './types/emlo2';
import { makeSafeGetter } from '../safeGetter';
import styled from 'styled-components';

/*
		th {
			background-color: #EEE;
			text-align: left;
			padding-right: 5em;
		}
		td {
			padding-right: 5em;
		}
		.tabHeaders {
			background-color: #EEE;
			overflow: hidden;
			cursor: pointer;
			padding: 5px;
		}
		.tabHeader.active {
			font-weight: bold;
		}
		
		.hierarchyTabContents {
			border: 1px solid black;
			display: none;
			text-align: center;
			padding-left: 200px;
		}
		.hierarchyTabContents.active {
			display: block;
		}
		.hierarchyLabels {
			display: block;
			float: left;
			width: 200px;
			padding: 5px;
		}
		.hierarchyLink {
			cursor: pointer;
		}
		.hierarchyLink.active{
			font-weight: bold;
		}
		.date {
			color: #AAA;
    }
    */

function test(input: em_Place_em_reference): input is em_Place_em_reference_oppole20180627_em_Bib_entry {
    return 'dcterms_title' in input;
}

const Column = styled.div`
    float: left;
    width: 50%;
`;

const PlussedList = styled.ul`
    list-style: none;
    > li::before {
        content: '+  ';
    }
`;

export const EmPlaces: SFC<em_Place> = function(data) {
    const d = makeSafeGetter(data);
    return (
        <div>
            <Column>
                <div>
                    <h1>{d('em_preferredName')('value').val('')}</h1>
                </div>
                {/* <div> <i>{data.em_alternateNameList.items.map(item => item.value).join(", ")}</i> </div>
      <div> <div><h2>Current Hierarchy</h2><CurrentHierarchy currenplace={data} relatedPlaces={data.em_hasRelationList.items.filter(item => !item.em_when))} /></div> </div> */}
                <div>
                    <div>
                        <h2>Location</h2>
                        <p>
                            {d('em_where')('em_location')('wgs84_pos_lat')('value').val('')},{' '}
                            {d('em_where')('em_location')('wgs84_pos_long')('value').val('')}
                        </p>
                    </div>
                </div>
                {/* <div> <div><h2>Citation</h2><Citations rawCitation={data.em_reference} /></div> </div> */}
                <div>
                    <div>
                        <h2>Permanent URI</h2>
                        <p>{d('em_canonicalURI')('uri').val('')}</p>
                    </div>
                </div>
                <div>
                    <div>
                        <h2>See Also</h2>
                        <p />
                    </div>
                </div>
                {/* <div> <div><h2>Name Attestations</h2><PlaceNameTable input={data.em_hasAnnotationList.items} /></div> </div>
      <div> <div><h2>Calendars</h2><Calendars input={data.em_hasAnnotationList.items} /></div> </div>
      <div> <div><h2>Related Places</h2><RelatedPlaces input={data.em_hasRelationList.items} /></div> </div> */}
                <div>
                    <div>
                        <h2>Related Resources</h2>
                        <PlussedList>
                            {d('rdfs_seeAlsoList')('items')('title')('value')
                                .vals()
                                .map(x => (
                                    <li key={x}>{x}</li>
                                ))}
                        </PlussedList>
                    </div>
                </div>
                <div>
                    <div>
                        <h2>Bibliography</h2>
                        <p>
                            {d('em_reference')
                                .t(test)('dcterms_title')('value')
                                .val('')}
                        </p>
                    </div>
                </div>
                {/* <div><Metadata data={data} /></div> */}
            </Column>
            <Column>
                <div>
                    <h2>Maps</h2>
                    <div />
                </div>
                <div>
                    <div>
                        <h2>Description</h2>
                        <p>{d('em_editorialNote')('value').val('')}</p>
                    </div>
                </div>
                {/* <div> <div><h2>Historical Hierarchies</h2><HistoricalHierarchies requestedPlace={data} historicalHierarchies={data.em_hasRelationList.items.filter(item => item.em_relationType && item.em_relationType.title && item.em_relationType.title.value === "Former part of")} /></div> </div> */}
                <div>
                    <div>
                        <h2>Feedback</h2>
                        <p>
                            Please email us your comments. We welcome contributions from individual scholars and
                            projects.
                        </p>
                    </div>
                </div>
            </Column>
        </div>
    );
    // updateMap(map, data.em_where);
};

// function createTextElement(elementName, value) {
//   var element = document.createElement(elementName);
//   element.appendChild(document.createTextNode(value));
//   return element;
// }
// function createTable(items) {
//   var headers = Object.keys(items[0]);
//   var table = document.createElement("table");
//   var headerRow = document.createElement("tr");
//   table.appendChild(headerRow);
//   headers.forEach(header => headerRow.appendChild(createTextElement("th", header)));
//   items.forEach(item => {
//     var row = document.createElement("tr");
//     table.appendChild(row);
//     headers.forEach(header => row.appendChild(createTextElement("td", item[header])));
//   });
//   return table;
// }
// function appendMetadataPart(parent, title, value) {
//   var element = document.createElement("p");
//   var label = document.createElement("b");
//   label.appendChild(document.createTextNode(title + ": "));
//   element.appendChild(label);
//   element.appendChild(document.createTextNode(value));
//   parent.appendChild(element);
// }
// function updateMap(map, location) {
//   var coordinates = location.em_location;
//   map.setCenter({ "lat": coordinates.wgs84_pos_lat.value * 1, "lng": coordinates.wgs84_pos_long.value * 1 });
// }
// var map;
// function initMap() {
//   map = new google.maps.Map(document.getElementById("maps"), {
//     center: { "lat": 52.373056, "lng": 4.893333 },
//     zoom: 11
//   });
//   xhr.open("POST", "https://repository.huygens.knaw.nl/v5/graphql", true);
//   xhr.setRequestHeader("Content-type", "application/json");
//   xhr.send(JSON.stringify({
//     "operationName": "emlo2",
//     "query": query,
//     "variables": null
//   }));
// }
// function hierarchyContent(requestedPlace, type, hierarchyStart, first, parent, labels) {
//   var hierarchy = []
//   createHierarchy(hierarchyStart, type, hierarchy);
//   var reverse = hierarchy.reverse();
//   var hierarchyLabelValue = createHierarchyLabel(reverse);
//   var linkLabel = createTextElement("p", hierarchyLabelValue);
//   linkLabel.classList.add("hierarchyLink");
//   var hierarchyId = type + " " + hierarchyLabelValue
//   linkLabel.onclick = function(event) {
//     openTab(event, hierarchyId)
//   };
//   labels.appendChild(linkLabel);
//   var hierarchyDiv = document.createElement("div");
//   hierarchyDiv.classList.add("hierarchyTabContents");
//   hierarchyDiv.id = hierarchyId;
//   if (first) {
//     hierarchyDiv.classList.add("active");
//     linkLabel.classList.add("active");
//   }
//   reverse.forEach(place => {
//     var placeElement = createTextElement("p", place.em_relationTo.title.value);
//     placeElement.classList.add("place");
//     hierarchyDiv.appendChild(placeElement);
//     var dateElement = createTextElement("p", place.em_when.rdfs_label.value);
//     dateElement.classList.add("date");
//     hierarchyDiv.appendChild(dateElement);
//   });
//   hierarchyDiv.appendChild(createTextElement("p", requestedPlace.title.value));
//   parent.appendChild(hierarchyDiv);
// }
// function createHierarchyLabel(hierrachyArray) {
//   var beginYears = [];
//   var endYears = [];
//   hierrachyArray.map(rel => rel.em_when.rdfs_label.value).forEach(when => {
//     var splitted = when.split("-");
//     beginYears.push(splitted[0]);
//     endYears.push(splitted[1]);
//   });
//   return (beginYears.sort((a, b) => b - a)[0] + "-" + endYears.sort((a,b) => a - b)[0]);
// }
// function createHierarchy(start, hierarchyType, coll) {
//   coll.push(start);
//   if (start.em_relationTo.em_hasRelationList) {
//     start.em_relationTo.em_hasRelationList.items.filter(item => hierarchyType == null || (item.em_relationTo.em_placeCategory && item.em_relationTo.em_placeCategory.rdfs_label && item.em_relationTo.em_placeCategory.rdfs_label.value === hierarchyType)).forEach(rel => {
//       createHierarchy(rel, hierarchyType, coll);
//     });
//   }
// }

// const CurrentHierarchy: SFC<{}> = function CurrentHierarchy(currentPlace, relatedPlaces) {
//   var hierarchy = [];
//   createHierarchy(relatedPlaces[0], null, hierarchy);
//   var reverse = hierarchy.reverse();

//   var parentList = document.createElement("ul");
//   var firstList = parentList;
//   var prefParent;
//   reverse.forEach(rel => {
//     parentList.appendChild(createTextElement("li", rel.em_relationTo && rel.em_relationTo.title ? rel.em_relationTo.title.value : "{Name unknown}"));
//     prefParent = parentList;
//     parentList = document.createElement("ul");
//     prefParent.appendChild(parentList);
//   });
//   parentList.appendChild(createTextElement("li", currentPlace.title.value));

//   return firstList;
// }
// const Calendars: SFC<{}> = function Calendars(input) {
//   return createTable(input.filter(an => an.oa_hasBody).filter(an => an.oa_hasBody.rdf_type).filter(an => an.oa_hasBody.rdf_type.uri === "http://emplaces.namespace.example.org/Calendar").map(an => {
//     var flatten = new Object();
//     flatten.Name = an.oa_hasBody.rdfs_label.value;
//     flatten.Date = an.em_when.rdfs_label.value;
//     return flatten;
//   }));
// }
// const PlaceNameTable: SFC<{}> = function PlaceNameTable(input) {
//   return createTable(input.filter(an => an.oa_hasBody).filter(an => an.oa_hasBody.rdf_type).filter(an => an.oa_hasBody.rdf_type.uri === "http://emplaces.namespace.example.org/Place_name").map(an => {
//     var flatten = new Object();
//     var body = an.oa_hasBody;
//     flatten.Name = body.em_name.value;
//     flatten.Language = "(" + body.em_language.em_tag.value + ")";
//     flatten.Date = an.em_when.rdfs_label.value;
//     flatten.Source = an.em_sourceList.items.map(source => source.rdfs_label.value).join("<br>");
//     return flatten;
//   }));
// }
// const RelatedPlaces: SFC<{}> = function RelatedPlaces(input) {
//   return document.createElement("p");
//   // return createTable(input.map(relation => {
//   // 	var flatten = new Object();
//   // 	flatten.Name = relation.em_relationTo.title.value;
//   // 	flatten.Type = relation.em_relationTo.em_placeType && relation.em_relationTo.em_placeType.title ? relation.em_relationTo.em_placeType.title.value : "";
//   // 	flatten.Relationship = relation.em_relationType.title.value;
//   // 	return flatten;
//   // }));
// }
// const Metadata: SFC<{}> = function Metadata(parent, data) {
//   appendMetadataPart(parent, "Creator", "{creator}");
//   appendMetadataPart(parent, "Contributors", "{contributors}");
//   appendMetadataPart(parent, "Reference Gazetteers", data.em_coreDataRef.title.value);
//   appendMetadataPart(parent, "Licenses", "{licenses}");
// }
// const HistoricalHierarchies: SFC<{}> = function HistoricalHierarchies(requestedPlace, historicalHierarchies) {
//   var completeDiv = document.createElement("div");
//   var tabHeaders = document.createElement("div");
//   tabHeaders.classList.add("tabHeaders");
//   completeDiv.appendChild(tabHeaders);
//   var labelsDiv =  document.createElement("div");
//   labelsDiv.classList.add("hierarchyLabels");
//   var tabContent = document.createElement("div");
//   tabContent.appendChild(labelsDiv);
//   completeDiv.appendChild(tabContent);
//   var first = true;
//   var hierarchiesByType = historicalHierarchies.reduce(function (rv, v) {
//     (rv[v.em_relationTo.em_placeCategory.rdfs_label.value] = rv[v.em_relationTo.em_placeCategory.rdfs_label.value] || []).push(v);
//     return rv;
//   }, {});
//   for (hierarchyType in hierarchiesByType) {
//     var tab = createTextElement("p", hierarchyType);
//     tab.classList.add("tabHeader");
//     tabHeaders.append(tab);
//     var hierarchies = hierarchiesByType[hierarchyType];
//     hierarchies.forEach(hierarchy => {
//       hierarchyContent(requestedPlace, hierarchyType, hierarchy, first, tabContent, labelsDiv);
//       if (first) {
//         tab.classList.add("active")
//         first = false;
//       }
//     });
//   }
//   return completeDiv;
// }
// const Citations: SFC<{}> = function Citations(rawCitation) {
//   var link = document.createElement("a");
//   link.setAttribute("href", rawCitation.dcterms_source.value);
//   link.setAttribute("target", "_blank");
//   link.appendChild(document.createTextNode(rawCitation.dcterms_title.value));

//   return link;
// }

export const dummyData: em_Place = {
    title: { value: 'City of Opole' },
    em_preferredName: { value: 'Opole' },
    em_alternateNameList: {
        items: [
            { value: 'أبولوسكي', type: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#langString' },
            { value: 'Горад Аполе', type: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#langString' },
            { value: 'Ополе', type: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#langString' },
            { value: 'Opolí', type: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#langString' },
            { value: 'Òpòle', type: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#langString' },
            { value: 'Opole', type: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#langString' },
            { value: 'Oppeln', type: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#langString' },
            { value: 'Opole', type: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#langString' },
            { value: 'Opole', type: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#langString' },
            { value: 'اوپوله', type: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#langString' },
            { value: 'Opole', type: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#langString' },
            { value: 'Opole', type: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#langString' },
            { value: 'אופולה', type: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#langString' },
            { value: 'Opole', type: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#langString' },
            { value: 'Opole', type: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#langString' },
            { value: 'Opole', type: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#langString' },
            { value: 'オポーレ', type: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#langString' },
            { value: 'Opole', type: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#langString' },
            { value: '오폴레', type: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#langString' },
            { value: 'Opolė', type: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#langString' }
        ]
    },
    em_where: {
        em_when: { em_timespan: { em_latestStart_: { value: '2018' }, em_earliestEnd_: { value: '2018' } } },
        em_location: { wgs84_pos_lat: { value: '50.67211' }, wgs84_pos_long: { value: '17.92533' } }
    },
    em_canonicalURI: { uri: 'http://emplaces.data.example.org/Opole_P' },
    em_hasAnnotationList: {
        items: [
            {
                oa_hasBody: {},
                em_sourceList: { items: [{ rdfs_label: { value: 'GeoNames data' } }] },
                em_when: {
                    rdfs_label: { value: 'Current, as of 2018' },
                    title: { value: 'Current, as of 2018' },
                    em_timespan: { em_latestStart_: { value: '2018' }, em_earliestEnd_: { value: '2018' } }
                }
            },
            {
                oa_hasBody: {
                    rdf_type: { uri: 'http://emplaces.namespace.example.org/Place_name' },
                    em_name: { value: 'Opole' },
                    em_language: { em_tag: { value: 'pl' } }
                },
                em_sourceList: { items: [{ rdfs_label: { value: 'Arno Bosse / Dariusz Gierczak' } }] },
                em_when: { rdfs_label: { value: '1146-(today)' }, title: { value: '1146-(today)' }, em_timespan: {} }
            },
            {
                oa_hasBody: {
                    rdf_type: { uri: 'http://emplaces.namespace.example.org/Place_name' },
                    em_name: { value: 'Opol' },
                    em_language: { em_tag: { value: 'la' } }
                },
                em_sourceList: { items: [{ rdfs_label: { value: 'Arno Bosse / Dariusz Gierczak' } }] },
                em_when: { rdfs_label: { value: '1222-1431' }, title: { value: '1222-1431' }, em_timespan: {} }
            },
            {
                oa_hasBody: {
                    rdf_type: { uri: 'http://emplaces.namespace.example.org/Place_name' },
                    em_name: { value: 'Opolie' },
                    em_language: { em_tag: { value: 'la' } }
                },
                em_sourceList: { items: [{ rdfs_label: { value: 'Arno Bosse / Dariusz Gierczak' } }] },
                em_when: { rdfs_label: { value: '1228-1483' }, title: { value: '1228-1483' }, em_timespan: {} }
            },
            {
                oa_hasBody: {
                    rdf_type: { uri: 'http://emplaces.namespace.example.org/Place_name' },
                    em_name: { value: 'Oppol' },
                    em_language: { em_tag: { value: 'la' } }
                },
                em_sourceList: { items: [{ rdfs_label: { value: 'Arno Bosse / Dariusz Gierczak' } }] },
                em_when: { rdfs_label: { value: '1226-1487' }, title: { value: '1226-1487' }, em_timespan: {} }
            },
            {
                oa_hasBody: {
                    rdf_type: { uri: 'http://emplaces.namespace.example.org/Place_name' },
                    em_name: { value: 'Opul' },
                    em_language: { em_tag: { value: 'de' } }
                },
                em_sourceList: { items: [{ rdfs_label: { value: 'Arno Bosse / Dariusz Gierczak' } }] },
                em_when: { rdfs_label: { value: '1322-1417' }, title: { value: '1322-1417' }, em_timespan: {} }
            },
            {
                oa_hasBody: {
                    rdf_type: { uri: 'http://emplaces.namespace.example.org/Place_name' },
                    em_name: { value: 'Oppoln' },
                    em_language: { em_tag: { value: 'de' } }
                },
                em_sourceList: { items: [{ rdfs_label: { value: 'Arno Bosse / Dariusz Gierczak' } }] },
                em_when: { rdfs_label: { value: '1433' }, title: { value: '1433' }, em_timespan: {} }
            },
            {
                oa_hasBody: {
                    rdf_type: { uri: 'http://emplaces.namespace.example.org/Place_name' },
                    em_name: { value: 'Oppelln' },
                    em_language: { em_tag: { value: 'de' } }
                },
                em_sourceList: { items: [{ rdfs_label: { value: 'Arno Bosse / Dariusz Gierczak' } }] },
                em_when: { rdfs_label: { value: '1454' }, title: { value: '1454' }, em_timespan: {} }
            },
            {
                oa_hasBody: {
                    rdf_type: { uri: 'http://emplaces.namespace.example.org/Place_name' },
                    em_name: { value: 'Oppul' },
                    em_language: { em_tag: { value: 'de' } }
                },
                em_sourceList: { items: [{ rdfs_label: { value: 'Arno Bosse / Dariusz Gierczak' } }] },
                em_when: { rdfs_label: { value: '1455' }, title: { value: '1455' }, em_timespan: {} }
            },
            {
                oa_hasBody: {
                    rdf_type: { uri: 'http://emplaces.namespace.example.org/Place_name' },
                    em_name: { value: 'Oppeln' },
                    em_language: { em_tag: { value: 'de' } }
                },
                em_sourceList: { items: [{ rdfs_label: { value: 'Arno Bosse / Dariusz Gierczak' } }] },
                em_when: { rdfs_label: { value: '1477-1945' }, title: { value: '1477-1945' }, em_timespan: {} }
            },
            {
                oa_hasBody: {
                    rdf_type: { uri: 'http://emplaces.namespace.example.org/Place_name' },
                    em_name: { value: 'Oppolie' },
                    em_language: { em_tag: { value: 'pl' } }
                },
                em_sourceList: { items: [{ rdfs_label: { value: 'Arno Bosse / Dariusz Gierczak' } }] },
                em_when: { rdfs_label: { value: '1830' }, title: { value: '1830' }, em_timespan: {} }
            },
            {
                oa_hasBody: {
                    rdf_type: { uri: 'http://emplaces.namespace.example.org/Calendar' },
                    rdfs_label: { value: 'Julian (OS)' }
                },
                em_sourceList: {
                    items: [{ rdfs_label: { value: 'Assumed from adoption of Papal Bull (Gregorian) in 1584' } }]
                },
                em_when: { rdfs_label: { value: 'Until 1584' }, title: { value: 'Until 1584' }, em_timespan: {} }
            },
            {
                oa_hasBody: {
                    rdf_type: { uri: 'http://emplaces.namespace.example.org/Calendar' },
                    rdfs_label: { value: 'Gregorian' }
                },
                em_sourceList: {
                    items: [
                        { rdfs_label: { value: 'Tomsa, Jan: Počìtánì času (Základy teorie kalendáře). Praha 1995' } },
                        { rdfs_label: { value: 'Bláhová, Marie: Historická chronologie. Praha 2001' } }
                    ]
                },
                em_when: {
                    rdfs_label: { value: 'Since 23-Feb-1584' },
                    title: { value: 'Since 23-Feb-1584' },
                    em_timespan: {}
                }
            },
            {
                oa_hasBody: {
                    rdf_type: { uri: 'http://emplaces.namespace.example.org/MapResource' },
                    title: { value: '1561' }
                },
                em_sourceList: {
                    items: [{ rdfs_label: { value: 'Arno Bosse / Dariusz Gierczak / David Rumsey Map Collection' } }]
                },
                em_when: { rdfs_label: { value: '1561' }, title: { value: '1561' }, em_timespan: {} }
            },
            {
                oa_hasBody: {
                    rdf_type: { uri: 'http://emplaces.namespace.example.org/MapResource' },
                    title: { value: '1608' }
                },
                em_sourceList: {
                    items: [{ rdfs_label: { value: 'Arno Bosse / Dariusz Gierczak / David Rumsey Map Collection' } }]
                },
                em_when: { rdfs_label: { value: '1608' }, title: { value: '1608' }, em_timespan: {} }
            },
            {
                oa_hasBody: {
                    rdf_type: { uri: 'http://emplaces.namespace.example.org/MapResource' },
                    title: { value: '1740' }
                },
                em_sourceList: {
                    items: [{ rdfs_label: { value: 'Arno Bosse / Dariusz Gierczak / David Rumsey Map Collection' } }]
                },
                em_when: { rdfs_label: { value: '1740' }, title: { value: '1740' }, em_timespan: {} }
            },
            {
                oa_hasBody: {
                    rdf_type: { uri: 'http://emplaces.namespace.example.org/MapResource' },
                    title: { value: '1777' }
                },
                em_sourceList: {
                    items: [{ rdfs_label: { value: 'Arno Bosse / Dariusz Gierczak / David Rumsey Map Collection' } }]
                },
                em_when: { rdfs_label: { value: '1777' }, title: { value: '1777' }, em_timespan: {} }
            },
            {
                oa_hasBody: {
                    rdf_type: { uri: 'http://emplaces.namespace.example.org/MapResource' },
                    title: { value: '1787' }
                },
                em_sourceList: {
                    items: [{ rdfs_label: { value: 'Arno Bosse / Dariusz Gierczak / David Rumsey Map Collection' } }]
                },
                em_when: { rdfs_label: { value: '1787' }, title: { value: '1787' }, em_timespan: {} }
            },
            {
                oa_hasBody: {
                    rdf_type: { uri: 'http://emplaces.namespace.example.org/MapResource' },
                    title: { value: '1794' }
                },
                em_sourceList: {
                    items: [{ rdfs_label: { value: 'Arno Bosse / Dariusz Gierczak / David Rumsey Map Collection' } }]
                },
                em_when: { rdfs_label: { value: '1794' }, title: { value: '1794' }, em_timespan: {} }
            }
        ]
    },
    em_hasRelationList: {
        items: [
            {
                em_relationType: { title: { value: 'Administered by' } },
                em_when: null,
                em_relationTo: {
                    title: { value: 'Opole (ADM3)' },
                    em_preferredName: { value: 'Opole' },
                    em_placeCategory: { rdfs_label: { value: 'Administrative division' } },
                    em_hasRelationList: {
                        items: [
                            {
                                em_relationType: { title: { value: 'Subdivision of' } },
                                em_when: null,
                                em_relationTo: {
                                    title: { value: 'Opole (ADM2)' },
                                    em_preferredName: { value: 'Opole' },
                                    em_placeCategory: { rdfs_label: { value: 'Administrative division' } },
                                    em_hasRelationList: {
                                        items: [
                                            {
                                                em_relationType: { title: { value: 'Subdivision of' } },
                                                em_when: null,
                                                em_relationTo: {
                                                    title: { value: 'Opole Voivodeship (ADM1)' },
                                                    em_preferredName: { value: 'Opole Voivodeship' },
                                                    em_placeCategory: {
                                                        rdfs_label: { value: 'Administrative division' }
                                                    },
                                                    em_hasRelationList: {
                                                        items: [
                                                            {
                                                                em_relationType: { title: { value: 'Subdivision of' } },
                                                                em_when: null,
                                                                em_relationTo: {
                                                                    title: { value: 'Poland (country)' },
                                                                    em_preferredName: { value: 'Poland' },
                                                                    em_placeCategory: {
                                                                        rdfs_label: { value: 'Administrative division' }
                                                                    },
                                                                    em_hasRelationList: { items: [] }
                                                                }
                                                            }
                                                        ]
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        ]
                    }
                }
            },
            {
                em_relationType: { title: { value: 'Former part of' } },
                em_when: { rdfs_label: { value: '1281-1521' }, em_timespan: {} },
                em_relationTo: {
                    title: { value: 'Duchy of Opole' },
                    em_preferredName: null,
                    em_placeCategory: { rdfs_label: { value: 'Administrative division' } },
                    em_hasRelationList: {
                        items: [
                            {
                                em_relationType: { title: { value: 'Former part of' } },
                                em_when: { rdfs_label: { value: '1348-1806' }, em_timespan: {} },
                                em_relationTo: {
                                    title: { value: 'Bohemian Crown' },
                                    em_preferredName: null,
                                    em_placeCategory: { rdfs_label: { value: 'Administrative division' } },
                                    em_hasRelationList: {
                                        items: [
                                            {
                                                em_relationType: { title: { value: 'Former part of' } },
                                                em_when: { rdfs_label: { value: '1348-1804' }, em_timespan: {} },
                                                em_relationTo: {}
                                            },
                                            {
                                                em_relationType: { title: { value: 'Former part of' } },
                                                em_when: { rdfs_label: { value: '1348-1806' }, em_timespan: {} },
                                                em_relationTo: {
                                                    title: { value: 'Holy Roman Empire' },
                                                    em_preferredName: null,
                                                    em_placeCategory: {
                                                        rdfs_label: { value: 'Administrative division' }
                                                    },
                                                    em_hasRelationList: { items: [] }
                                                }
                                            }
                                        ]
                                    }
                                }
                            },
                            {
                                em_relationType: { title: { value: 'Former part of' } },
                                em_when: { rdfs_label: { value: '1742-1809' }, em_timespan: {} },
                                em_relationTo: {}
                            }
                        ]
                    }
                }
            },
            {
                em_relationType: { title: { value: 'Former part of' } },
                em_when: { rdfs_label: { value: '1521-1809' }, em_timespan: {} },
                em_relationTo: {
                    title: { value: 'Duchy of Opole and Racibórz' },
                    em_preferredName: null,
                    em_placeCategory: { rdfs_label: { value: 'Administrative division' } },
                    em_hasRelationList: {
                        items: [
                            {
                                em_relationType: { title: { value: 'Former part of' } },
                                em_when: { rdfs_label: { value: '1348-1806' }, em_timespan: {} },
                                em_relationTo: {
                                    title: { value: 'Bohemian Crown' },
                                    em_preferredName: null,
                                    em_placeCategory: { rdfs_label: { value: 'Administrative division' } },
                                    em_hasRelationList: {
                                        items: [
                                            {
                                                em_relationType: { title: { value: 'Former part of' } },
                                                em_when: { rdfs_label: { value: '1348-1804' }, em_timespan: {} },
                                                em_relationTo: {}
                                            },
                                            {
                                                em_relationType: { title: { value: 'Former part of' } },
                                                em_when: { rdfs_label: { value: '1348-1806' }, em_timespan: {} },
                                                em_relationTo: {
                                                    title: { value: 'Holy Roman Empire' },
                                                    em_preferredName: null,
                                                    em_placeCategory: {
                                                        rdfs_label: { value: 'Administrative division' }
                                                    },
                                                    em_hasRelationList: { items: [] }
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        ]
                    }
                }
            },
            {
                em_relationType: { title: { value: 'Former part of' } },
                em_when: { rdfs_label: { value: '1742-1945' }, em_timespan: {} },
                em_relationTo: {
                    title: { value: 'County of Opole' },
                    em_preferredName: null,
                    em_placeCategory: { rdfs_label: { value: 'Administrative division' } },
                    em_hasRelationList: {
                        items: [
                            {
                                em_relationType: { title: { value: 'Former part of' } },
                                em_when: { rdfs_label: { value: '1521-1809' }, em_timespan: {} },
                                em_relationTo: {
                                    title: { value: 'Duchy of Opole' },
                                    em_preferredName: null,
                                    em_placeCategory: { rdfs_label: { value: 'Administrative division' } },
                                    em_hasRelationList: {
                                        items: [
                                            {
                                                em_relationType: { title: { value: 'Former part of' } },
                                                em_when: { rdfs_label: { value: '1348-1806' }, em_timespan: {} },
                                                em_relationTo: {
                                                    title: { value: 'Bohemian Crown' },
                                                    em_preferredName: null,
                                                    em_placeCategory: {
                                                        rdfs_label: { value: 'Administrative division' }
                                                    },
                                                    em_hasRelationList: {
                                                        items: [
                                                            {
                                                                em_relationType: { title: { value: 'Former part of' } },
                                                                em_when: {
                                                                    rdfs_label: { value: '1348-1804' },
                                                                    em_timespan: {}
                                                                },
                                                                em_relationTo: {}
                                                            },
                                                            {
                                                                em_relationType: { title: { value: 'Former part of' } },
                                                                em_when: {
                                                                    rdfs_label: { value: '1348-1806' },
                                                                    em_timespan: {}
                                                                },
                                                                em_relationTo: {
                                                                    title: { value: 'Holy Roman Empire' },
                                                                    em_preferredName: null,
                                                                    em_placeCategory: {
                                                                        rdfs_label: { value: 'Administrative division' }
                                                                    },
                                                                    em_hasRelationList: { items: [] }
                                                                }
                                                            }
                                                        ]
                                                    }
                                                }
                                            },
                                            {
                                                em_relationType: { title: { value: 'Former part of' } },
                                                em_when: { rdfs_label: { value: '1742-1809' }, em_timespan: {} },
                                                em_relationTo: {}
                                            }
                                        ]
                                    }
                                }
                            }
                        ]
                    }
                }
            }
        ]
    },
    rdfs_seeAlsoList: {
        items: [
            { title: { value: 'http://dbpedia.org/resource/Opole' }, em_start: null },
            { title: { value: 'http://en.wikipedia.org/wiki/Opole' }, em_start: null },
            { title: { value: 'http://ru.wikipedia.org/wiki/%D0%9E%D0%BF%D0%BE%D0%BB%D0%B5' }, em_start: null }
        ]
    },
    em_coreDataRef: { title: { value: 'GeoNames data' } },
    em_editorialNote: {
        value:
            '\n        Getty Thesaurus of Geographic Names (05/03/2018):\n\n        Located on Oder River; passed to Bohemia in 1327, to Habsburgs in 1742 & returned to Poland in 1945; is important port between Wrocław & Upper Silesia; economy depends on cement factories & iron foundries; noted for many historic buildings.\n        '
    },
    em_reference: {
        dcterms_title: { value: 'Oppeln/Opole: Die Hauptstadt der Wojewodschaft Oppeln' },
        dcterms_source: { value: 'https://www.amazon.com/Opole-Capital-of-Opolskie-Province/dp/B0021JGAOI' }
    }
};
