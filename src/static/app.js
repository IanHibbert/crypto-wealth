import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import classNames from 'classnames';

import { authLogoutAndRedirect } from './actions/auth';
import Logo from "./images/newlogo.png";
import './style.scss';

class App extends React.Component {

  static propTypes = {
    isAuthenticated: React.PropTypes.bool.isRequired,
    children: React.PropTypes.shape(),
    dispatch: React.PropTypes.func.isRequired,
    pathName: React.PropTypes.string.isRequired
  };

  logout = () => {
    this.props.dispatch(authLogoutAndRedirect());
  };

  goToIndex = () => {
    this.props.dispatch(push('/'));
  };

  goToProtected = () => {
    this.props.dispatch(push('/protected'));
  };

  goToAnalytics = () => {
    this.props.dispatch(push('/analytics'));
  }

  goToActivityLog = () => {
    this.props.dispatch(push('/activity'));
  }

  render() {
    const homeClass = classNames({
      active: this.props.pathName === '/'
    });
    const protectedClass = classNames({
      active: this.props.pathName === '/protected'
    });
    const loginClass = classNames({
      active: this.props.pathName === '/login'
    });
    const analyticsClass = classNames({
      active: this.props.pathName === "/analytics"
    });
    const activityLogClass = classNames({
      active: this.props.pathName === "/activity"
    });

    const styles = {
      propStyle: {
        height: '100%',
        width: '100%'
      },
      navStyle: {
        backgroundColor: '#696969',
        height: '50px'
      },
      logoStyle: {
        height: '41px',
        width: '41x',
        paddingLeft: '5px'
      }
    }

    return (
      <div className="app">
        <nav id="main-nav" className="navbar navbar-inverse bg-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" tabIndex="0" onClick={this.goToIndex}>
                <img className="nav-logo" src={Logo} />
              </a>
              <a className="brand-text navbar-brand" tabIndex="0" onClick={this.goToIndex}>
              </a>
            </div>
            <div className="collapse navbar-collapse" id="top-navbar">
              {
                this.props.isAuthenticated ?
                <ul className="nav navbar-nav navbar-right">
                  <li className={homeClass}>
                    <a className="js-go-to-index-button" tabIndex="0" onClick={this.goToIndex}>
                      <i className="fa fa-home" /> Home
                    </a>
                  </li>
                  <li className={activityLogClass}>
                    <a className="" tabIndex="0" onClick={this.goToActivityLog}>
                      <i className="fa fa-tasks" /> Activity Log
                    </a>
                  </li>
                  <li> <a className="js-logout-button" tabIndex="0" onClick={this.logout}>
                  <i className="fa fa-power-off" />  Logout </a>
                  </li>
                </ul>
                                :
                <ul className="nav navbar-nav navbar-right">
                  <li className={homeClass}>
                    <a className="js-go-to-index-button" tabIndex="0" onClick={this.goToIndex}>
                      <i className="fa fa-home" /> Home
                    </a>
                  </li>
                  <li className={loginClass}>
                    <Link className="js-login-button" to="/login">Login</Link>
                  </li>
                </ul>
              }
            </div>
          </div>
        </nav>
        <div style={styles.propStyle}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    pathName: ownProps.location.pathname
  };
};

export default connect(mapStateToProps)(App);
export { App as AppNotConnected };
