import React, { StatelessComponent } from 'react';
import { Grid, Col } from '../layout/Grid';
import FullHelmet from '../FullHelmet';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'recompose';
import ListContent from '../lists/ListContent';
import translate from '../../services/translate';
import { Value } from '../../typings/schema';
import { ButtonLink } from '../layout/Button';

const DataSetList: StatelessComponent<{ data: any; mutate: (props: any) => void }> = props => {
    let dataSetInfo: Array<{
        title?: Value;
        description?: Value;
        dataSetId: String;
        dataSetName: String;
    }> = [];
    if (props.data.aboutMe && props.data.aboutMe.dataSetMetadataList && props.data.aboutMe.dataSetMetadataList) {
        dataSetInfo = props.data.aboutMe.dataSetMetadataList;
    }
    return (
        <Grid>
            <FullHelmet pageName="Datasets" />
            <ListContent
                smOffset={2}
                sm={20}
                smPaddingY={1}
                title={translate('dataset_overview.title')}
                data={dataSetInfo}
            />
            <Col smOffset={2} sm={20} smPaddingY={1}>
                <ButtonLink
                    to=""
                    onClick={(e: any) => {
                        const name = window.prompt("What's the dataset name?");
                        props.mutate({ variables: { name: name } });
                        e.preventDefault();
                    }}
                >
                    Add&hellip;
                </ButtonLink>
            </Col>
        </Grid>
    );
};

export default compose(
    graphql(
        gql`
            query getDataSets {
                aboutMe {
                    id
                    dataSetMetadataList(ownOnly: false, permission: WRITE) {
                        uri
                        dataSetId
                        dataSetName
                        title {
                            value
                        }
                        description {
                            value
                        }
                    }
                }
            }
        `
    ),
    graphql(
        gql`
            mutation createDataSet($name: String!) {
                createDataSet(dataSetName: $name) {
                    uri
                }
            }
        `,
        { options: { refetchQueries: ['getDataSets'] } }
    )
)(DataSetList);
