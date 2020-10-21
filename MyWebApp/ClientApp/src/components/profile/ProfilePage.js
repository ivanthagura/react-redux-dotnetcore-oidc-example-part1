import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProfilePage extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        {user ? (
          <div>
            <h1>Profile</h1>
            <div>
              <h3>Welcome, {user.profile.given_name}!</h3>
            </div>
            <div>
              <table className="table">
                <tbody>
                  <tr>
                    <td>Identity token</td>
                    <td>{user.id_token}</td>
                  </tr>
                  <tr>
                    <td>token_type</td>
                    <td>{user.token_type}</td>
                  </tr>
                  <tr>
                    <td>access_token</td>
                    <td>{user.access_token}</td>
                  </tr>
                  <tr>
                    <td>expires_at</td>
                    <td>{user.expires_at}</td>
                  </tr>
                  <tr>
                    <td>scope</td>
                    <td>{user.scope}</td>
                  </tr>
                  {Object.keys(user.profile).map(key => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{user.profile[key]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div>Please Login</div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.oidc.user
  };
}

export default connect(mapStateToProps)(ProfilePage);
