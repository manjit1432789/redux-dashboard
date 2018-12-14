import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import UploadBlock from "../../reusable/UploadBlock";
import ContentBlock from "../../reusable/ContentBlock";
import ButtonsList from "../../reusable/ButtonsList";

import MissionMgtDropDown from '../../reusable/MissionMgtDropDown';
import CustomDatePicker from '../../reusable/CustomDatePicker';
import DropDownButton from '../../reusable/DropDownButton';
import StatusTable from '../../reusable/StatusTable';

import { getTranslations, addPayload, fetchPayloadData, uploadFile } from '../../../actions/actions';


class EquipmentModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        file: '',
        imagePreviewUrl: '',
        payload: {
          PayloadID: '',
          PayloadReferenceCode: '',
          PaylodWireframe: '',
          PayloadPhoto: '',
          Payload3D: '',
          PayloadIcon: '',
          Payload2525B: '',
          PayloadDatasheet: '',
          PayloadName: '',
          PayloadNomenclature: '',
          PayloadRole: '',
          PayloadManufacturer: '',
          PayloadExecutiveAgent: '',
          PayloadContractProgram: '',
          PayloadCost: '',
          PayloadCostNotes: '',
          PayloadLength: '',
          PayloadWidth: '',
          PayloadHeight: '',
          PayloadWeight: '',
          PayloadPower: '',
          PayloadConnector1: '',
          PayloadConnector2: '',
          PayloadDaySpotter: '',
          PayloadThermalImager: '',
          PayloadLaserDesginator: '',
          PayloadContinuousZoom: '',
          PayloadStabalization: '',
          PayloadVibrationIsolation: '',
          PayloadAutoTracker: '',
          PayloadGPSTimeSync: '',
          PayloadInternalGPS: '',
          PayloadInternalINS: '',
          PayloadMetadata: '',
          PayloadCrewCount: '',
          PayloadMOS1: '',
          PayloadMOS2: '',
          PayloadMOS3: '',
        }
    }

    this.resetForm = this.resetForm.bind(this);
    // preserve the initial state in a new object
    this.baseState = this.state;
  }

  componentWillMount(){
    console.log("---hereis eoirmodal---------");
    //this.props.fetchPayloadData();
  }

  handlePayloadGeneralData = (generalData) => {
    const {payload} = this.state;
    this.setState({
      payload: {
        ...payload,
        PayloadSerial: generalData.PayloadSerial,
        // PayloadOwningUnit: generalData.PayloadOwningUnit,
        PayloadName: generalData.PayloadName,
        PayloadNomenclature: generalData.PayloadNomenclature,
        PayloadRole: generalData.PayloadRole,
        PayloadManufacturer: generalData.PayloadManufacturer,
        PayloadExecutiveAgent: generalData.PayloadExecutiveAgent,
        PayloadContractProgram: generalData.PayloadContractProgram,
        PayloadCost: generalData.PayloadCost,
        PayloadCostNotes: generalData.PayloadCostNotes,
      }
    }, () => {
      console.log("New state in ASYNC callback:22222", this.state.payload);
    });
  }

  handlePayloadTechnicalData = (technicalData) => {
    const {payload} = this.state;
    this.setState({
      payload: {
        ...payload,
        PayloadLength: technicalData.PayloadLength,
        PayloadWidth: technicalData.PayloadWidth,
        PayloadHeight: technicalData.PayloadHeight,
        PayloadWeight: technicalData.PayloadWeight,
        PayloadPower: technicalData.PayloadPower,
        PayloadConnector1: technicalData.PayloadConnector1,
        PayloadConnector2: technicalData.PayloadConnector2,
      }
    }, () => {
      console.log("New state in ASYNC callback:22222", this.state.payload);
    });
  }

  handlePayloadFeatureData = (featureData) => {
    const {payload} = this.state;
    this.setState({
      payload: {
        ...payload,
        PayloadLensCount: featureData.PayloadlensCount
      }
    }, () => {
      console.log("New state in ASYNC callback:22222", this.state.payload);
    });
  }
  handlePayloadCrewData = (crewData) => {
    const {payload} = this.state;
    this.setState({
      payload: {
        ...payload,
        PayloadCrewCount: crewData.PayloadCrewCount,
        PayloadMOS1: crewData.PayloadMOS1,
        PayloadMOS2: crewData.PayloadMOS2,
        PayloadMOS3: crewData.PayloadMOS3
      }
    }, () => {
      console.log("New state in ASYNC callback:22222", this.state.payload);
    });
  }
  

  handleUploadFile(event){
      event.preventDefault();
      const {payload} = this.state;
      if(event.target.id == "PayloadPhoto") {
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend =() =>{
            this.setState({
                file:file,
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(file)  
      }
      
      let parametername = event.target.id;

      this.setState({
          payload: {
              ...payload,
              [parametername] : event.target.files[0].name
          }
      }, () => {
          console.log("New state in ASYNC callback:", this.state.payload);
      });

      const data = new FormData();

      data.append('file', event.target.files[0]);
      data.append('name', event.target.files[0].name);

      // this.props.uploadFile(data);
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log('---here--');
    console.log(this.state.payload);
    this.props.addPayload(this.state.payload);
    this.props.fetchPayloadData();
  }


  resetForm(){
    this.setState(this.baseState);
    console.log("FORM RESET DONE");
    if (confirm("Do you want to clear all data from this form?")) {
      let inputs = document.body.getElementsByTagName('input');
      let drops = document.body.getElementsByTagName('select');
      for (let item of inputs) {
        item.value = '';
      }
      for (let item of drops) {
        item.value = 0;
      }
    }
  }


  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    let {imagePreviewUrl} = this.state;
    let $imagePreview = '';

    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} alt="" className="photo" alt=""/>);
    } 
    else {
      $imagePreview = (<img src="/images/admin/aircraft.png" className="photo" alt=""/>);
    }

    const {payload} = this.state;
    const {translations: {translations}} = this.props;


    const generalFields = [
      {name: translations['Serial#'], type: 'input', domID: 'PayloadSerial', valFieldID: 'PayloadSerial' },
      {name: translations['Owning Unit'], type: 'input', domID: 'PayloadOwningUnit', valFieldID: 'PayloadOwningUnit'},    
      {name: translations['Payload Name'], type: 'input', domID: 'PayloadName', valFieldID: 'PayloadName'},
      {name: translations['Payload Nomenclature'], type: 'input', domID: 'PayloadNomenclature', valFieldID: 'PayloadNomenclature'},
      {name: translations['Mission Role'], type: 'dropdown', domID: 'MissionRole', ddID: 'PayloadRoles', valFieldID: 'PayloadRole'},
      {name: translations['Manufacture'], type: 'input', domID: 'PayloadManufacture', valFieldID: 'PayloadManufacturer'},
      {name: translations['Service Executive Agent'], type: 'input', domID: 'PayloadExecutiveAgent', valFieldID: 'PayloadExecutiveAgent'},
      {name: translations['Contract Program'], type: 'input', domID: 'PayloadContractProgram', valFieldID: 'PayloadContractProgram'},
      {name: translations['Cost'], type: 'input', domID: 'PayloadCost', valFieldID: 'PayloadCost'},
      {name: translations['Cost notes'], type: 'input', domID: 'PayloadCostNotes', valFieldID: 'PayloadCostNotes'},
    ];

    const technicalFields = [
      {name: translations['Length (in.)'], type: 'number', domID: 'PayloadLength', valFieldID: 'PayloadLength'},
      {name: translations['Width (in.)'], type: 'number', domID: 'PayloadWidth', valFieldID: 'PayloadWidth'},
      {name: translations['Height (in.)'], type: 'number', domID: 'PayloadHeight', valFieldID: 'PayloadHeight'},
      {name: translations['Weight (lbs.)'], type: 'number', domID: 'PayloadWeight', valFieldID: 'PayloadWeight'},
      {name: translations['Power(W)'], type: 'number', domID: 'PayloadPower', valFieldID: 'PayloadPower'},
      {name: translations['Connector']+ "1", type: 'input', domID: 'PayloadConnector1', valFieldID: 'PayloadConnector1'},
      {name: translations['Connector']+ "2", type: 'input', domID: 'PayloadConnector2', valFieldID: 'PayloadConnector2'},
    ];

    const itemDescription = [
      {name: 'Lens Count:', type: 'input', domID: 'PayloadLensCount', valFieldID: 'PayloadLensCount'},
    ];

    

    return (
      <div className="payload-modal modal-overlay" >
      <form action="" onSubmit={this.handleSubmit} >
        <div className="modal-content">
          <div className="close-button" >
            <img src="/images/general/close.png" onClick={this.props.onClose} />
          </div>
          <div className="payload-content">
            <div className="row personnel" >
              <div className="header-line">
                <img src="/images/admin/personnel_1.png" alt=""/>
                <div className="header-text">
                  payloads administration
                </div>
                <img className="mirrored-X-image" src="/images/admin/personnel_1.png" alt=""/>
              </div>
              <div className="personnel-content">
                <div className="col-md-4 image-block">
                  <img src="/images/admin/r2d2-1.png" className="photo" alt=""/>
                </div>
                <div className="col-md-4 image-block">
                  {$imagePreview}
                </div>
                <div className="col-md-4 upload-block">
                  <div className="upload-imagery">
                    <img src="/images/admin/upload_1.png" alt=""/>
                    <div className="header-text">
                      upload imagery & datasheets
                    </div>
                    <img className="mirrored-X-image" src="/images/admin/upload_1.png" alt=""/>
                  </div>
                  <div className="upload-content">
                    <div className="upload-line">
                      <div>
                        {translations['Wireframe Image']}
                      </div>
                      <input type="file"  name="file" id="PaylodWireframe" onChange= {this.handleUploadFile.bind(this)} className="hidden_input pull-right" required />
                    </div>
                    <div className="upload-line">
                      <div>
                        {translations['Photo Image']}
                      </div>
                      <input type="file"  name="file" id="PayloadPhoto" onChange= {this.handleUploadFile.bind(this)} className="hidden_input pull-right" required />
                    </div>
                    <div className="upload-line">
                      <div>
                        {translations['3D Model']}
                      </div>
                      <input type="file"  name="file" id="Payload3D" onChange= {this.handleUploadFile.bind(this)} className="hidden_input pull-right" required />
                    </div>
                    <div className="upload-line">
                      <div>
                        {translations['2D Icon']}
                      </div>
                      <input type="file"  name="file" id="PayloadIcon" onChange= {this.handleUploadFile.bind(this)} className="hidden_input pull-right" required />
                    </div>
                    <div className="upload-line">
                      <div>
                        {translations['Milspec Icon']}
                      </div>
                      <input type="file"  name="file" id="Payload2525B" onChange= {this.handleUploadFile.bind(this)} className="hidden_input pull-right" required />
                    </div>
                    <div className="upload-line">
                      <div>
                        {translations['Datasheets']}
                      </div>
                      <input type="file"  name="file" id="PayloadDatasheet" onChange= {this.handleUploadFile.bind(this)} className="hidden_input pull-right" required />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row personnel" >
              <div className="under-payload-content">
                <ContentBlock headerLine="/images/admin/upload_1.png" title="general" fields={generalFields} 
                data={this.handlePayloadGeneralData} initstate ={this.state.payload}/>
                <ContentBlock headerLine="/images/admin/upload_1.png" title="size, weight, power, connect" fields={technicalFields} 
                data={this.handlePayloadTechnicalData} initstate ={this.state.payload}/>
                <ContentBlock bigBackground={true} headerLine="/images/admin/upload_1.png" title="Item Description" fields={itemDescription} 
                data={this.handlePayloadFeatureData} initstate ={this.state.payload}/>
              </div>
            </div>
          </div>
          <div className="row action-buttons">
            <div className="menu-button">
              <img className="line" src="/images/admin/edit_up.png" alt=""/>
              <button className='highlighted-button' onClick={this.resetForm.bind(this)}>
                {translations['clear']}
              </button>
              <img className="line mirrored-Y-image" src="/images/admin/edit_up.png" alt=""/>
            </div>
            <div className="menu-button">
              <img className="line" src="/images/admin/edit_up.png" alt=""/>
              <button className='highlighted-button'>
                {translations['Delete']}
              </button>
              <img className="line mirrored-Y-image" src="/images/admin/edit_up.png" alt=""/>
            </div>
            <div className="menu-button">
              <img className="line" src="/images/admin/edit_up.png" alt=""/>
              <button type="submit" className='highlighted-button'>
                {translations['save']}
              </button>
              <img className="line mirrored-Y-image" src="/images/admin/edit_up.png" alt=""/>
            </div>
          </div>
        </div>
      </form>
      </div>
    );
  }
}

EquipmentModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
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
    },

    addPayload: (payload) => {
      dispatch(addPayload(payload));
    },

    fetchPayload: () => {
      dispatch(fetchPayloadData());
    },

    uploadFile: (fileData) => {
      dispatch(uploadFile(fileData));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EquipmentModal);