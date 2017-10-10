import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import FullHelmet from '../FullHelmet';
import Hero from '../hero/Hero';
import { Col } from '../layout/Grid';
import { ROUTE_PATHS } from '../../constants/routeNaming';
import { encode } from '../../services/UrlStringCreator';
import CollectionTags from '../CollectionTags';
import GridSection from '../layout/GridSection';
import { Dummy } from '../Dummy';
import { CollectionMetadata, ContactInfo, ProvenanceInfo } from '../../typings/timbuctoo/schema';
import { match } from 'react-router';
import { UserReducer } from '../../typings/store';
import EditCollectionBar from './EditCollectionBar';
import { Title } from '../layout/StyledCopy';
import { isKnown, reorderUnknownsInList } from '../../services/HandleUnknowns';
import About from '../About';
import { getValue } from '../../services/getValue';
import Colophon from '../Colophon';

interface Props {
    title: string;
    description: string;
    imageUrl: string;
    dataSetId: string;
    collectionKeys: CollectionMetadata[];
    match: match<any>;
    user: UserReducer;
    provenanceInfo: ProvenanceInfo;
    owner: ContactInfo;
    contact: ContactInfo;
}

type FullProps = Props;

interface State {
}

class DataSetBody extends PureComponent<FullProps, State> {
    constructor (props: FullProps) {
        super(props);

        this.renderCollectionBar = this.renderCollectionBar.bind(this);
    }

    render () {
        const { title, description, imageUrl, dataSetId, collectionKeys, owner, contact } = this.props;

        return (
            <section>
                <FullHelmet pageName={`Dataset: ${title}`}/>

                <Hero
                    title={title}
                    content={description}
                    imgUrl={imageUrl}
                    searchPath={`${ROUTE_PATHS.details}/${dataSetId}/${encode(collectionKeys[0].collectionId)}`}
                    buttonText={'Search this dataset'}
                />

                <Col sm={42} smOffset={3} smPaddingBottom={.5}>
                    <CollectionTags
                        colKeys={reorderUnknownsInList(collectionKeys)}
                        dataSetId={dataSetId}
                    />
                </Col>

                {this.renderEditCollections()}

                <Col sm={48}>
                    <GridSection tag={'div'} gridSize={48} gridOffset={0} cols={2} colSizeOffset={2} gridSpacing={2}>
                        <Colophon owner={owner} contact={contact} />
                        <Dummy text={'Partners'} height={10}/>
                    </GridSection>
                </Col>

                {this.renderProvenanceInfo()}
            </section>
        );
    }

    private renderProvenanceInfo () {
        const { provenanceInfo } = this.props;
        const title = getValue(provenanceInfo.title);
        const body = getValue(provenanceInfo.body);

        if (!title || !body) {
            return null;
        }

        return (
            <About title={title} body={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium at autem commodi consequuntur corporis delectus deserunt dolores dolorum eaque, error esse et eum eveniet, exercitationem explicabo fugit id in ipsa iste iusto magni maxime molestias neque non placeat praesentium quae qui quia quibusdam sed sint soluta suscipit temporibus totam ut veniam voluptatem? A facere fuga id odit placeat suscipit tenetur unde! Aliquam amet at consequuntur cum delectus illo, ipsam modi nobis perspiciatis quia reprehenderit soluta vel. Eligendi eum sit totam vero? Ab ad corporis dolorum, eos facilis hic ipsum iusto nemo quasi quo reprehenderit sequi suscipit tenetur veritatis voluptatibus! Autem deserunt doloremque, et mollitia necessitatibus provident quidem. Aperiam architecto beatae eius impedit inventore ipsum, laborum modi, porro sunt, ut velit veritatis voluptas? Dolorum eius esse itaque iusto, laudantium libero molestiae molestias officia optio, pariatur perspiciatis placeat quasi quod sunt vel! Consectetur dolore earum ipsum labore porro repellendus tempora tenetur! Adipisci, alias aliquam asperiores assumenda beatae consectetur consequuntur dolorem doloribus, earum eos eum eveniet expedita facilis fuga fugit inventore ipsa labore laboriosam laborum modi nam neque nisi odit officia officiis optio perferendis, porro provident quae quas quasi quo quos ratione sit tempora totam veniam. Ab ad adipisci alias amet, dolores est iste minus molestiae neque non officia qui, recusandae, sequi sit tempore veniam vitae. Ab aperiam architecto atque culpa cum cupiditate deserunt dolor dolorum ea, enim exercitationem in incidunt labore nemo non pariatur quam sed sequi vel voluptatem? Aperiam aut nam ratione voluptas voluptates? Aspernatur illo quos ullam. Dolores facere molestias perspiciatis praesentium sint voluptas voluptatibus. Ad doloribus est et ipsa perferendis quae sapiente? Cumque, laborum, nostrum! Corporis earum laboriosam nemo, pariatur provident quis sed sint. Ab adipisci amet dignissimos hic impedit incidunt, itaque laborum maiores odio odit quae quas ratione, rem sint veniam vero vitae. Aliquam autem, corporis eos nam nihil sint voluptas. Ab adipisci animi at corporis dolorum eaque fugit id modi, mollitia nobis non obcaecati officia possimus quis reprehenderit rerum, sit veniam! Blanditiis delectus deleniti incidunt labore maiores provident, quo saepe ut. A beatae debitis distinctio, esse facere, iusto laborum magnam minus nam non, numquam officia optio quasi quidem similique tempora veniam? Aliquid aperiam dicta doloribus ducimus eaque eius enim fugit, laudantium magni, maxime necessitatibus nesciunt nobis tenetur velit voluptas? Aliquid assumenda aut consectetur corporis excepturi facere illo inventore molestiae nam nemo officia porro, ratione repellat repudiandae sapiente sint tempora voluptate voluptates. Accusamus accusantium aut dicta ea fugiat in ipsum, iste iure maiores optio provident quae, ratione reiciendis sunt tenetur! Aspernatur deserunt, ipsam. Accusamus aliquam animi deleniti dolor excepturi labore libero nemo nihil nobis officiis, quasi quia repudiandae sunt ut veritatis vero voluptatem. Accusamus amet aperiam asperiores autem commodi dolor enim ex facere illum impedit maiores non officia officiis optio perspiciatis placeat provident reiciendis, repudiandae sapiente vero. Ad aliquid blanditiis culpa dolor, eos est ipsa, laudantium neque numquam odit recusandae sit unde! Aliquam, aspernatur assumenda cum delectus dolore ea eligendi, enim et incidunt inventore ipsa iure labore laborum neque nesciunt, numquam officia perspiciatis quis rerum similique veniam vero!'}/>
        );
    }

    private renderEditCollections () {
        const { user, collectionKeys } = this.props;

        if (!user.loggedIn) {
            return false;
        }

        return (
            <Col sm={42} smOffset={3} smPaddingBottom={.5}>
                <section>
                    <Title>Collection</Title>
                    <ul>
                        {collectionKeys
                            .filter(isKnown)
                            .map(this.renderCollectionBar)}
                    </ul>
                </section>
            </Col>
        );
    }

    private renderCollectionBar (collection: CollectionMetadata, idx: number) {
        return (
            <li key={idx}>
                <EditCollectionBar key={idx} collection={collection} dataSetId={this.props.dataSetId}/>
            </li>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(DataSetBody);