import { ApolloClient, createNetworkInterface } from 'react-apollo';
import { GRAPH_URI } from '../constants/api';

export default new ApolloClient({
    networkInterface: createNetworkInterface({
        uri: GRAPH_URI
    })
});