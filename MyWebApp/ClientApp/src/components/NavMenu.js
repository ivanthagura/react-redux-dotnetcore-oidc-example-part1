import React from 'react';
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink
} from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

import userManager from '../utils/userManager';
import { connect } from 'react-redux';

class NavMenu extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    const { user, isAuthenticated } = this.props;
    const isAdmin = isAuthenticated && user.profile['role'] === 'Admin';

    const onLoginButtonClick = event => {
      event.preventDefault();
      userManager.signinRedirect();
    };

    const onLogoutButtonClick = event => {
      event.preventDefault();
      userManager.signoutRedirect({ id_token_hint: user.id_token });
      userManager.removeUser(); // removes the user data from sessionStorage
    };

    return (
      <header>
        <Navbar
          className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3"
          light
        >
          <Container>
            <NavbarBrand tag={Link} to="/">
              MyWebApp
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} className="mr-2" />
            <Collapse
              className="d-sm-inline-flex flex-sm-row-reverse"
              isOpen={this.state.isOpen}
              navbar
            >
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/counter">
                    Counter
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/fetch-data">
                    Fetch data
                  </NavLink>
                </NavItem>

                {isAuthenticated ? (
                  <NavItem>
                    <NavLink tag={Link} className="text-primary" to="/profile">
                      {user.profile.given_name}
                    </NavLink>
                  </NavItem>
                ) : (
                  <React.Fragment />
                )}
                <NavItem>
                  <button
                    className="btn btn-primary"
                    onClick={
                      isAuthenticated ? onLogoutButtonClick : onLoginButtonClick
                    }
                  >
                    {isAuthenticated ? 'Log Out' : 'Log In'}
                  </button>
                </NavItem>
                {isAdmin ? (
                  <NavItem>
                    <button className="btn btn-warning">Admin</button>
                  </NavItem>
                ) : (
                  <React.Fragment />
                )}
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.oidc.user,
    isAuthenticated: state.oidc.user && !state.oidc.user.expired
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavMenu);
