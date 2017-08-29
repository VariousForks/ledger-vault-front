import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setReroute } from './actions';

const mapStateToProps = state => ({
  clearanceLevel: state.auth.clearanceLevel,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  reroute: () => {
    dispatch(setReroute(ownProps.path));
  },
});

class PrivateRoute extends PureComponent {
  render() {
    //this.props.test();
    return (
      <Route
        exact={this.props.exact}
        path={this.props.path}
        render={() => {
          if (this.props.requiredLevel === '' || ((localStorage.getItem('clearanceLevel') === this.props.requiredLevel))) {
            return React.createElement(this.props.component, this.props);
          }
          //this.props.reroute();
          console.log('this props path', this.props.path);
          localStorage.setItem('reroute', this.props.path);
          let state = { reroute: this.props.path };
          if (localStorage.loginout) {
            state['logout'] = true;
          } else if (localStorage.sessionClosed) {
            state['sessionClosed'] = true;
          }

          return (<Redirect
            to={{
              pathname: '/login',
              state,
            }}
            push
          />);
        }}
      />
    );
  }
}

const { bool, string, func } = PropTypes;

PrivateRoute.defaultProps = {
  exact: false,
  authenticated: false,
  requiredLevel: '',
  clearanceLevel: '',
};

PrivateRoute.propTypes = {
  component: func.isRequired,
  exact: bool,
  path: string.isRequired,
  reroute: func.isRequired,
  requiredLevel: string,
  clearanceLevel: string,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivateRoute));
