import { ApolloClient, createNetworkInterface } from 'react-apollo';
import { GRAPH_URI } from '../constants/api';

const Client = new ApolloClient({
    networkInterface: createNetworkInterface({
        uri: GRAPH_URI,
        opts: {
            headers: {
                Accept: 'application/json'
            }
        }
    })
});

export default Client;