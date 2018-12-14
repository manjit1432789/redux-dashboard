import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {getTranslations} from '../../actions/actions';
import {connect} from 'react-redux';

class DashboardCircleStatus extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const {translations: {translations}} = this.props;
    let background, backgroundSize, width;

      switch(this.props.statusHeader) {

        case translations["platform"]:
          background= 'url(/images/status/platform_status.png) no-repeat center';
          break;

        case translations['mission']:
          background= 'url(/images/status/platform_status.png) no-repeat center';
          break;

        case translations["ccri's"]:
          background= 'url(/images/status/platform_status.png) no-repeat center';
          break;

        case translations["payload"]:
          background= 'url(/images/status/payload_status.png) no-repeat center';
          break;
        case translations['reports']:
          background= 'url(/images/status/payload_status.png) no-repeat center';
          break;
        case translations["pir's"]:
          background= 'url(/images/status/payload_status.png) no-repeat center';
          break;

        case translations["flight crew"]:
          background= 'url(/images/status/fcrew_status.png) no-repeat center';
          break;
        case translations['video']:
          background= 'url(/images/status/fcrew_status.png) no-repeat center';
          break;
        case translations["eei's"]:
          background= 'url(/images/status/fcrew_status.png) no-repeat center';
          break;

        case translations["line crew"]:
          background= 'url(/images/status/lcrew_status.png) no-repeat center';
          break;
        case translations['tracks']:
          background= 'url(/images/status/lcrew_status.png) no-repeat center';
          break;
        case translations["nai's"]:
          background= 'url(/images/status/lcrew_status.png) no-repeat center';
          break;

        case translations["ped crew"]:
          background= 'url(/images/status/pcrew_status.png) no-repeat center';
          break;
        case translations['capacity']:
          background= 'url(/images/status/fcrew_status.png) no-repeat center';
          width = '100%';
          break;
        case translations["pid's"]:
          background= 'url(/images/status/pcrew_status.png) no-repeat center';
          break;
          

      }

    return (
      <div className="each-status" style={{width}}>
        <div className="status-image" style={{background,backgroundSize}}><div className="status-percent">{this.props.statusPercent}</div></div>
        <div className="status-header">{this.props.statusHeader}</div>
      </div>
    );
  }
}

DashboardCircleStatus.propTypes = {
  children: PropTypes.element,

};

const mapStateToProps = state => {
  return {
    translations: state.translationsReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTranslations: (lang) => {
      dispatch(getTranslations(lang));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardCircleStatus);

