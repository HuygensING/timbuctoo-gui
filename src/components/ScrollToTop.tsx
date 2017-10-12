import { RouteComponentProps, withRouter } from 'react-router';
import { PureComponent } from 'react';

type Props = RouteComponentProps<any>;

class ScrollToTop extends PureComponent<Props> {
    componentDidUpdate(prevProps: Props) {
        if (this.props.location !== prevProps.location && !this.props.location.state.dontJumpToTop) {
            window.scrollTo(0, 0);
        }
    }
}

export default withRouter(ScrollToTop);