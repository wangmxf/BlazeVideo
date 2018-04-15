import React, { Component } from 'react';
import { Link } from 'react-router';
import { HiddenOnlyAuth, VisibleOnlyAuth } from '../../util/wrappers.js';

class Home extends Component {
  render() {
    const OnlyAuthLinks = VisibleOnlyAuth(() =>
      <p>
        <Link to="/funplace" className="btn btn-primary">Get Started</Link>
      </p>
    )

    const OnlyGuestLinks = HiddenOnlyAuth(() =>
      <p>
        <Link to="/signup" className="btn btn-primary">Get Started</Link>
      </p>
    )
    return(
      <div className="splash-container">
        <div className="splash">
          <h1 className="splash-head">Bit Video.One</h1>
          <p className="splash-subhead">
              Collects your faverate Youtube videos on a Blockchain.
          </p>
          <OnlyAuthLinks />
          <OnlyGuestLinks />
        </div>
      </div>
    )
  }
}

export default Home
