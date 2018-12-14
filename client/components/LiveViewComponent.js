import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UploadBlock from "./reusable/UploadBlock";
import ContentBlock from "./reusable/ContentBlock";
import ButtonsList from "./reusable/ButtonsList";
import Table from "./reusable/Table";
import { Switch, Route, NavLink } from 'react-router-dom';
import OpsComponent from './live_view/OpsComponent';
import PedComponent from './live_view/PedComponent';
import ComsComponent from './live_view/ComsComponent';

class LiveViewComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentMap: '/images/admin/comsnet4.png'
    };
  }

  renderMapButtons = () => {
    const {translations: {translations}, match} = this.props;

    console.log(match.url);

    let buttons = [
      {name: 'ops', subButton: false, url: `${match.url}/ops`},
      {name: 'ped', subButton: false, url: `${match.url}/ped`},
      {name: 'coms', subButton: false, url: `${match.url}/coms`},
    ];

    return buttons.map((item, i) => {
      if (!item.subButton) {
        let matchForLink = (this.props.routing.location.pathname.indexOf(item.url) !== -1);
        console.log(matchForLink);
        return (
          <div className={`${item.subButton ? 'sub-button' : 'main-button'} ${matchForLink ?  'highlighted-main-button' : ''}`} key={i}>
            <NavLink to={item.url}>
              <button>{item.name}</button>
            </NavLink>
          </div>
        )
      } else {
        return (
          <div className={`${item.subButton ? 'sub-button' : ''}  ${this.props.routing.location.pathname.indexOf(buttons[0].url) !== -1 ?  'highlighted-sub-button' : ''}`} key={i}>
            <button>{item.name}</button>
          </div>
        )
      }
    });
  };

  render() {

    const {translations: {translations}, match} = this.props;

    return (
      <div>
        <div className="row coms-net" >
          <div className="header-line">
            <img src="/images/admin/personnel_1.png" alt=""/>
            <div className="header-text">
              coms/net
            </div>
            <img className="mirrored-X-image" src="/images/admin/personnel_1.png" alt=""/>
          </div>
          <div className="coms-net-content">
            <div className="col-md-12">
              <div className="map-buttons">
                {this.renderMapButtons()}
              </div>
              <Switch>
                <Route path={`${match.url}/ops`} component={OpsComponent} />
                <Route path={`${match.url}/ped`} component={PedComponent} />
                <Route path={`${match.url}/coms`} component={ComsComponent} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LiveViewComponent.propTypes = {
  children: PropTypes.element,
};

export default LiveViewComponent;
