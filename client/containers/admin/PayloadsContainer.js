import {connect} from 'react-redux';

import PayloadsComponent from '../../components/admin/PayloadsComponent';
import {getTranslations, addPayload, fetchPayloadData, getPayloads, getPayloadTypes, getCocoms, getLocations} from '../../actions/actions';

const mapStateToProps = state => {
  return {
    translations: state.translationsReducer,
    payload_data: state.payloadData.payload_data,
    payload_list: state.payloads.payload_list,
    payload_types: state.payloadTypes.payload_types,
    fetchingPayloads: state.payloads.isFetching,
    location_list: state.locations.location_list,
    cocom_list: state.cocoms.cocom_list,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTranslations: (lang) => {
      dispatch(getTranslations(lang));
    },

    addPayload: (payload) => {
    	dispatch(addPayload(payload));
    },

    getPayloads: () => {
      dispatch(getPayloads());
    },

    getPayloadTypes: () => {
      dispatch(getPayloadTypes());
    },

    fetchPayloadData: () => {
    	dispatch(fetchPayloadData());
    },

    getCocoms: () => {
      dispatch(getCocoms());
    },

    getLocations: () => {
      dispatch(getLocations());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PayloadsComponent);