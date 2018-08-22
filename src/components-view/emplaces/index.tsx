import React, { SFC, Fragment } from 'react';
import { em_Place, em_Place_em_hasRelationList_items, em_Place_em_hasAnnotationList_items } from './types/emlo2';
import { makeSafeGetter, SafeGetter } from '../safeGetter';
import styled from 'styled-components';
import { UnstyledAnchor } from '../HyperLink';
import { AppContainer, AppProps } from '../AppContainer';

const PlussedList = styled.ul`
    list-style: none;
    padding-left: 1rem;
    > li::before {
        content: '+  ';
    }
`;

const MainHeading = styled.h1`
    font-size: 2em;
    font-weight: bold;
`;
const SubHeading = styled.h2`
    font-size: 1.5em;
    font-weight: bold;
`;

const Citation: SFC<{ href?: string; title?: string }> = function Citations(props) {
    return props.href == null ? null : (
        <UnstyledAnchor href={props.href} target="_blank">
            {props.title}
        </UnstyledAnchor>
    );
};

function* createHierarchy(
    start: em_Place_em_hasRelationList_items,
    hierarchyType: string | null
): IterableIterator<SafeGetter<em_Place_em_hasRelationList_items, false>> {
    const data = makeSafeGetter(start);
    yield data;
    const relations = data('em_relationTo')('em_hasRelationList')('items')
        .filter(
            x =>
                hierarchyType == null ||
                x('em_relationTo')('em_placeCategory')('rdfs_label')('value').val(null) === hierarchyType
        )
        .vals();

    for (let rel of relations) {
        yield* createHierarchy(rel, hierarchyType);
    }
}

const HierarchyLevel: SFC<{ items: string[] }> = function({ items }) {
    return (
        <PlussedList>
            <li>{items[0]}</li>
            {items.length > 1 ? <HierarchyLevel items={items.slice(1)} /> : null}
        </PlussedList>
    );
};

const CurrentHierarchy: SFC<{
    placeTitle?: string;
    relatedPlaces: em_Place_em_hasRelationList_items[];
}> = function({ placeTitle, relatedPlaces }) {
    const hierarchy = Array.from(createHierarchy(relatedPlaces[0], null)).map(x =>
        x('em_relationTo')('title')('value').val('{Name unknown}')
    );
    hierarchy.reverse();
    hierarchy.push(placeTitle || '{Name unknown}');

    return <HierarchyLevel items={hierarchy} />;
};

const MetadataPart: SFC<{ label: string; value: string }> = ({ label, value }) => (
    <p>
        <b>{label}</b>: {value}
    </p>
);

const HeaderCell = styled.th`
    background-color: #eee;
    text-align: left;
`;
const BodyCell = styled.td`
    white-space: nowrap;
    padding-right: 1rem;
`;

class SimpleTable<T> extends React.Component<{ items: T[] }> {
    render() {
        const headers = Object.keys(this.props.items[0]) as Array<keyof T>;
        return (
            <table>
                <thead>
                    <tr>
                        {headers.map(header => (
                            <HeaderCell key={header}>{header}</HeaderCell>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {this.props.items.map((item, i) => (
                        <tr key={i}>
                            {headers.map((header, j) => (
                                <BodyCell key={j}>{item[header] == null ? '' : item[header].toString()}</BodyCell>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

const PlaceNameTable: SFC<{ input: em_Place_em_hasAnnotationList_items[] }> = function({ input }) {
    const items = input.map(function(an) {
        return {
            Name: makeSafeGetter(an)('oa_hasBody')('em_name')('value').val(''),
            Language: '(' + makeSafeGetter(an)('oa_hasBody')('em_language')('em_tag')('value').val('') + ')',
            Date: makeSafeGetter(an)('em_when')('rdfs_label')('value').val(''),
            Source: makeSafeGetter(an)('em_sourceList')('items')('rdfs_label')('value')
                .vals()
                .join('<br>')
        };
    });
    return <SimpleTable items={items} />;
};

const Calendars: SFC<{ input: em_Place_em_hasAnnotationList_items[] }> = function({ input }) {
    const items = input.map(an => ({
        Name: makeSafeGetter(an)('oa_hasBody')('rdfs_label')('value').val(''),
        Date: makeSafeGetter(an)('em_when')('rdfs_label')('value').val('')
    }));

    return <SimpleTable items={items} />;
};

function createHierarchyRange(
    hierrachyArray: Array<SafeGetter<em_Place_em_hasRelationList_items, false>>
): [number, number] {
    const beginYears: number[] = [];
    const endYears: number[] = [];
    hierrachyArray.map(rel => rel('em_when')('rdfs_label')('value').val('NaN-NaN')).forEach(when => {
        const splitted = when.split('-');
        beginYears.push(+splitted[0]);
        endYears.push(+splitted[1]);
    });
    return [beginYears.sort((a, b) => b - a)[0], endYears.sort((a, b) => a - b)[0]];
}

const TabHeaders = styled.div`
    background-color: #eee;
    cursor: pointer;
    padding: 5px;
    display: flex;
    width: 100%;

    & > .active {
        font-weight: bold;
    }
`;

const TabHeader = styled.p`
    background-color: #eee;
    overflow: hidden;
    cursor: pointer;
    padding: 5px;
`;

const HierarchyTabContents = styled.div`
    border: 1px solid black;
    display: none;
    text-align: center;
    padding-left: 200px;
    &.active {
        display: block;
    }
`;
const HierarchyLabels = styled.div`
    display: block;
    float: left;
    width: 200px;
    padding: 5px;
`;

const HierarchyLink = styled.p`
    cursor: pointer;
    &.active {
        font-weight: bold;
    }
`;
const Date = styled.p`
    color: #aaa;
`;

interface HierarchyLinkData {
    label: string;
    date: string;
}

interface HistoricalHierarchiesData {
    [key: string]: Array<{
        from: number;
        to: number;
        items: Array<HierarchyLinkData>;
    }>;
}

function ParseHistoricalHierarchies(
    historicalHierarchies: em_Place_em_hasRelationList_items[]
): HistoricalHierarchiesData {
    const result: HistoricalHierarchiesData = {};
    const hierarchyStartsByType: { [key: string]: em_Place_em_hasRelationList_items[] } = {};
    for (let item of historicalHierarchies) {
        const type = makeSafeGetter(item)('em_relationTo')('em_placeCategory')('rdfs_label')('value').val('');
        if (!hierarchyStartsByType.hasOwnProperty(type)) {
            hierarchyStartsByType[type] = [];
        }
        hierarchyStartsByType[type].push(item);
    }

    Object.keys(hierarchyStartsByType).forEach(type => {
        result[type] = [];
        hierarchyStartsByType[type].forEach((hierarchyStart, i) => {
            const hierarchy = Array.from(createHierarchy(hierarchyStart, type)).reverse();
            const [from, to] = createHierarchyRange(hierarchy);

            result[type].push({
                from: from,
                to: to,
                items: hierarchy.map(place => ({
                    label: place('em_relationTo')('title')('value').val('???'),
                    date: place('em_when')('rdfs_label')('value').val('???-???')
                }))
            });
        });
    });

    return result;
}

export const HistoricalHierarchies: SFC<{
    placeName: string;
    data: HistoricalHierarchiesData;
    selectedType: string;
    selectedRange: number;
    onChange?: (type: string, period: number) => void;
}> = function({ data, selectedRange, selectedType, onChange, placeName }) {
    if (Object.keys(data).length === 0) {
        return <div>No Hierarchies present</div>;
    }
    if (!data.hasOwnProperty(selectedType)) {
        selectedType = Object.keys(data).sort()[0];
    }
    const clickHandler = onChange || function() {};
    if (data[selectedType].length === 0) {
        return (
            <div>
                <TabHeaders>
                    {Object.keys(data)
                        .sort()
                        .map((type, i) => (
                            <TabHeader
                                key={type}
                                onClick={() => clickHandler(type, 0)}
                                className={
                                    'tabHeader' + (i === 0 ? ' first' : '') + (type === selectedType ? ' active' : '')
                                }
                            >
                                {type}
                            </TabHeader>
                        ))}
                </TabHeaders>
                <div className="tabContent">No Hierarchies present</div>
            </div>
        );
    }
    if (data[selectedType].length <= selectedRange) {
        selectedRange = 0;
    }
    return (
        <div>
            <TabHeaders>
                {Object.keys(data)
                    .sort()
                    .map((type, i) => (
                        <TabHeader
                            key={type}
                            onClick={() => clickHandler(type, 0)}
                            className={
                                'tabHeader' + (i === 0 ? ' first' : '') + (type === selectedType ? ' active' : '')
                            }
                        >
                            {type}
                        </TabHeader>
                    ))}
            </TabHeaders>
            <div className="tabContent">
                <HierarchyLabels>
                    {data[selectedType].map((x, i) => (
                        <HierarchyLink
                            className={i === selectedRange ? 'active' : ''}
                            key={'' + x.from + x.to}
                            onClick={() => clickHandler(selectedType, i)}
                        >
                            {x.from}-{x.to}
                        </HierarchyLink>
                    ))}
                </HierarchyLabels>
                <HierarchyTabContents className="active">
                    {data[selectedType][selectedRange].items.map((place, i) => (
                        <Fragment key={i}>
                            <p className="place">{place.label}</p>
                            <Date>{place.date}</Date>
                        </Fragment>
                    ))}
                    <p>{placeName}</p>
                </HierarchyTabContents>
            </div>
        </div>
    );
};

const ColumnWrapper = styled.div`
    column-count: 2;
    @media (max-width: 999px) {
        column-count: 1;
    }
`;

const Segment = styled.div`
    break-inside: avoid;

    @media (min-width: 1000px) {
        &.breakPoint {
            break-before: 'column';
        }
    }
`;

export const EmPlaces: SFC<{
    containerProps: AppProps;
    place: em_Place;
    onSwitchHierarchyClick: (type: string, id: number) => void;
}> = function(data) {
    const d = makeSafeGetter(data.place);
    return (
        <AppContainer {...data.containerProps}>
            <ColumnWrapper>
                <Segment>
                    <MainHeading>{d('em_preferredName')('value').val('')}</MainHeading>
                    <i>
                        {d('em_alternateNameList')('items')('value')
                            .vals()
                            .join(', ')}
                    </i>
                </Segment>
                <Segment>
                    <SubHeading>Current Hierarchy</SubHeading>
                    <CurrentHierarchy
                        placeTitle={d('title')('value').val(undefined)}
                        relatedPlaces={d('em_hasRelationList')('items')
                            .vals()
                            .filter(item => !item.em_when)}
                    />
                </Segment>
                <Segment>
                    <SubHeading>Location</SubHeading>
                    <p>
                        {d('em_where')('em_location')('wgs84_pos_lat')('value').val('')},{' '}
                        {d('em_where')('em_location')('wgs84_pos_long')('value').val('')}
                    </p>
                </Segment>
                <Segment>
                    <SubHeading>Citation</SubHeading>
                    <Citation
                        href={d('em_reference')('dcterms_source')('value').val(undefined)}
                        title={d('em_reference')('dcterms_title')('value').val(undefined)}
                    />
                </Segment>
                <Segment>
                    <SubHeading>Permanent URI</SubHeading>
                    <p>
                        <UnstyledAnchor href={d('em_canonicalURI')('uri').val('')}>
                            {d('em_canonicalURI')('uri').val('')}
                        </UnstyledAnchor>
                    </p>
                </Segment>
                <Segment>
                    <SubHeading>See Also</SubHeading>
                    <p />
                </Segment>
                <Segment>
                    <SubHeading>Name Attestations</SubHeading>
                    <PlaceNameTable
                        input={d('em_hasAnnotationList')('items')
                            .filter(
                                x =>
                                    x('oa_hasBody')('rdf_type')('uri').val('') ===
                                    'http://emplaces.namespace.example.org/Place_name'
                            )
                            .vals()}
                    />
                </Segment>
                <Segment>
                    <SubHeading>Calendars</SubHeading>
                    <Calendars
                        input={d('em_hasAnnotationList')('items')
                            .filter(
                                x =>
                                    x('oa_hasBody')('rdf_type')('uri').val('') ===
                                    'http://emplaces.namespace.example.org/Calendar'
                            )
                            .vals()}
                    />
                </Segment>
                <Segment>
                    <SubHeading>Related Places</SubHeading>
                    {/* <RelatedPlaces input={data.em_hasRelationList.items} /> */}
                    <p />
                </Segment>
                <Segment>
                    <SubHeading>Related Resources</SubHeading>
                    <PlussedList>
                        {d('rdfs_seeAlsoList')('items')('title')('value')
                            .vals()
                            .map(x => (
                                <li key={x}>
                                    <UnstyledAnchor rel="nofollow" href={x}>
                                        {x}
                                    </UnstyledAnchor>
                                </li>
                            ))}
                    </PlussedList>
                </Segment>
                <Segment>
                    <SubHeading>Bibliography</SubHeading>
                    <p>{d('em_reference')('dcterms_title')('value').val('')}</p>
                </Segment>
                <MetadataPart label="Creator" value="{creator}" />
                <MetadataPart label="Contributors" value="{contributors}" />
                <MetadataPart label="Reference" value={d('em_coreDataRef')('title')('value').val('')} />
                <MetadataPart label="Licenses" value="{licenses}" />
                <Segment className="breakPoint">
                    <SubHeading>Maps</SubHeading>
                    <div />
                </Segment>
                <Segment>
                    <SubHeading>Description</SubHeading>
                    <p>{d('em_editorialNote')('value').val('')}</p>
                </Segment>
                <Segment>
                    <SubHeading>Historical Hierarchies</SubHeading>
                    <HistoricalHierarchies
                        placeName={d('title')('value').val('')}
                        data={ParseHistoricalHierarchies(
                            d('em_hasRelationList')('items')
                                .filter(item => item('em_relationType')('title')('value').val('') === 'Former part of')
                                .vals()
                        )}
                        selectedRange={0}
                        selectedType=""
                        onChange={data.onSwitchHierarchyClick}
                    />
                </Segment>
                <Segment>
                    <SubHeading>Feedback</SubHeading>
                    <p>
                        Please email us your comments. We welcome contributions from individual scholars and projects.
                    </p>
                </Segment>
            </ColumnWrapper>
        </AppContainer>
    );
    // updateMap(map, data.em_where);
};

// function createTextElement(elementName, value) {
//   var element = document.createElement(elementName);
//   element.appendChild(document.createTextNode(value));
//   return element;
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

export const dummyData: { place: em_Place } = {
    place: {
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
                    em_when: {
                        rdfs_label: { value: '1146-(today)' },
                        title: { value: '1146-(today)' },
                        em_timespan: {}
                    }
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
                            {
                                rdfs_label: {
                                    value: 'Tomsa, Jan: Počìtánì času (Základy teorie kalendáře). Praha 1995'
                                }
                            },
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
                        items: [
                            { rdfs_label: { value: 'Arno Bosse / Dariusz Gierczak / David Rumsey Map Collection' } }
                        ]
                    },
                    em_when: { rdfs_label: { value: '1561' }, title: { value: '1561' }, em_timespan: {} }
                },
                {
                    oa_hasBody: {
                        rdf_type: { uri: 'http://emplaces.namespace.example.org/MapResource' },
                        title: { value: '1608' }
                    },
                    em_sourceList: {
                        items: [
                            { rdfs_label: { value: 'Arno Bosse / Dariusz Gierczak / David Rumsey Map Collection' } }
                        ]
                    },
                    em_when: { rdfs_label: { value: '1608' }, title: { value: '1608' }, em_timespan: {} }
                },
                {
                    oa_hasBody: {
                        rdf_type: { uri: 'http://emplaces.namespace.example.org/MapResource' },
                        title: { value: '1740' }
                    },
                    em_sourceList: {
                        items: [
                            { rdfs_label: { value: 'Arno Bosse / Dariusz Gierczak / David Rumsey Map Collection' } }
                        ]
                    },
                    em_when: { rdfs_label: { value: '1740' }, title: { value: '1740' }, em_timespan: {} }
                },
                {
                    oa_hasBody: {
                        rdf_type: { uri: 'http://emplaces.namespace.example.org/MapResource' },
                        title: { value: '1777' }
                    },
                    em_sourceList: {
                        items: [
                            { rdfs_label: { value: 'Arno Bosse / Dariusz Gierczak / David Rumsey Map Collection' } }
                        ]
                    },
                    em_when: { rdfs_label: { value: '1777' }, title: { value: '1777' }, em_timespan: {} }
                },
                {
                    oa_hasBody: {
                        rdf_type: { uri: 'http://emplaces.namespace.example.org/MapResource' },
                        title: { value: '1787' }
                    },
                    em_sourceList: {
                        items: [
                            { rdfs_label: { value: 'Arno Bosse / Dariusz Gierczak / David Rumsey Map Collection' } }
                        ]
                    },
                    em_when: { rdfs_label: { value: '1787' }, title: { value: '1787' }, em_timespan: {} }
                },
                {
                    oa_hasBody: {
                        rdf_type: { uri: 'http://emplaces.namespace.example.org/MapResource' },
                        title: { value: '1794' }
                    },
                    em_sourceList: {
                        items: [
                            { rdfs_label: { value: 'Arno Bosse / Dariusz Gierczak / David Rumsey Map Collection' } }
                        ]
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
                                                                    em_relationType: {
                                                                        title: { value: 'Subdivision of' }
                                                                    },
                                                                    em_when: null,
                                                                    em_relationTo: {
                                                                        title: { value: 'Poland (country)' },
                                                                        em_preferredName: { value: 'Poland' },
                                                                        em_placeCategory: {
                                                                            rdfs_label: {
                                                                                value: 'Administrative division'
                                                                            }
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
                                                                    em_relationType: {
                                                                        title: { value: 'Former part of' }
                                                                    },
                                                                    em_when: {
                                                                        rdfs_label: { value: '1348-1804' },
                                                                        em_timespan: {}
                                                                    },
                                                                    em_relationTo: {}
                                                                },
                                                                {
                                                                    em_relationType: {
                                                                        title: { value: 'Former part of' }
                                                                    },
                                                                    em_when: {
                                                                        rdfs_label: { value: '1348-1806' },
                                                                        em_timespan: {}
                                                                    },
                                                                    em_relationTo: {
                                                                        title: { value: 'Holy Roman Empire' },
                                                                        em_preferredName: null,
                                                                        em_placeCategory: {
                                                                            rdfs_label: {
                                                                                value: 'Administrative division'
                                                                            }
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
    }
};
