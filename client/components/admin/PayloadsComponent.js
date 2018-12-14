import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UploadBlock from "../reusable/UploadBlock";
import ContentBlock from "../reusable/ContentBlock";
import ButtonsList from "../reusable/ButtonsList";
import FilterDropdown from '../reusable/FilterDropdown';
import Dropdown from '../reusable/Dropdown';
import FilterDatePicker from '../reusable/FilterDatePicker';
import DropDownButton from '../reusable/DropDownButton';
import StatusTable from '../reusable/StatusTable';

import EoirModal from './payloads/EoirModal';
import SargmtiModal from './payloads/SargmtiModal';
import WamiModal from './payloads/WamiModal';
import SigintModal from './payloads/SigintModal';
import EquipmentModal from './payloads/EquipmentModal';
import TableRowDetailModal from '../reusable/TableRowDetailModal';

import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



import "react-table/react-table.css";
import ReactTable from 'react-table';

import { makeData } from '../../actions/actions';


class PayloadsComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      filterValue: '',
      filter: [], 
      eoirModalOpen:false,
      sargmtiModalOpen: false,
      wamiModalOpen: false,
      sigintModalOpen: false,
      equipmentModalOpen: false,
      tableRowDetailModalOpen: false,
    }
  }

 
  onFind(){
    console.log("find");
  }

  eoirModal = () => {
    this.setState({
      eoirModalOpen: !this.state.eoirModalOpen
    });
  }

  sargmtiModal = () => {
    this.setState({
      sargmtiModalOpen: !this.state.sargmtiModalOpen
    });
  }

  wamiModal = () => {
    this.setState({
      wamiModalOpen: !this.state.wamiModalOpen
    });
  }

  sigintModal = () =>{
    this.setState({
      sigintModalOpen: !this.state.sigintModalOpen
    });
  }

  equipmentModal = () => {
    this.setState({
      equipmentModalOpen: !this.state.equipmentModalOpen
    });
  }

  tableRowDetailModal = () => {  
    this.setState({
      tableRowDetailModalOpen: !this.state.tableRowDetailModalOpen
    })
  }


  componentWillMount() {

    this.props.fetchPayloadData();
    this.props.getPayloads();
    this.props.getPayloadTypes();
    this.props.getCocoms();
    this.props.getLocations();

  }

  renderItems(optionItem) {
    let items = [{"label": "-Select Item-", "value": 0}];
    optionItem.map((item, i) => {
        items.push({"label": item.description, "value": i});
    });
    return items.map(function(data, key){  
        if(data.label == "-Select Item-"){
          return ( <option key={key} value=""> {data.label} </option>) ;
        } else {
          return (<option key={key} value={data.label}>{data.label}</option> );
        }
    })
  }

  handleChange(value) {
    console.log(value); 
  }

  render() {

    const {translations: {translations}} = this.props;
    const {payload_data, payload_list, payload_types, cocom_list, location_list} = this.props;

    
    const addPayloads = [
      {name:translations['eo/ir'], onClick:this.eoirModal},
      {name:translations['sar/gmti'], onClick:this.sargmtiModal},
      {name:translations['wami'], onClick:this.wamiModal},
      {name:translations['sigint'], onClick:this.sigintModal},
      {name:translations['equipment'], onClick:this.equipmentModal},
    ];


    const columns = [
      {
        Header: translations["type"],
        accessor: 'type', 
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value),
        Filter: ({ filter, onChange}) =>
                <select 
                    onChange={event => onChange(event.target.value)}
                    style={{ width: "100%" }}
                    value={filter ? filter.value : ""} >
                    {this.renderItems(payload_types)}
                </select>,
        sortMethod: (a, b) => {
                      if (a.length === b.length) {
                        return a > b ? 1 : -1;
                      }
                      return a.length > b.length ? 1 : -1;
                    }// String-based value accessors!
      },
      {
        Header: translations['Name'],
        accessor: 'payload',
        Filter: ({ filter, onChange }) =>
                   <select
                    onChange={event => onChange(event.target.value)}
                    style={{ width: "100%" }}
                    value={filter ? filter.value : ""}
                  >
                    {this.renderItems(payload_list)}
                  </select>
      },
      {
        Header: translations['serial#'],
        accessor: 'serial',

      }, 
      {
        Header: translations['cocom'],
        accessor: 'status',
        Filter: ({ filter, onChange }) =>
                  <select
                      onChange={event => onChange(event.target.value)}
                      style={{ width: "100%" }}
                      value={filter ? filter.value : ""}
                  >
                      {this.renderItems(cocom_list)}
                  </select>
      },
      {
        Header: translations['Location'],
        accessor: 'remark',
        Filter: ({ filter, onChange }) =>
                  <select
                      onChange={event => onChange(event.target.value)}
                      style={{ width: "100%" }}
                      value={filter ? filter.value : ""}
                  >
                      {this.renderItems(location_list)}
                  </select>
      },
      {
        Header: translations['Record Date'],
        accessor: 'etic',
        Filter: ({ filter, onChange }) =>
                  <FilterDatePicker onChange={this.handleChange} value={filter ? filter.value : ""}/>
      }, 
      {
        Header: translations['view'],
        accessor: 'view',
        filterable: false,
        Cell: props => <span className='number'><img src="/images/general/eye_icon.png" onClick={this.tableRowDetailModal} /></span>// Custom cell components!
      }
    ];

    const rowFields = [
      {name: translations['Type'], type: 'dropdown'},
      {name: translations['Name'], type: 'input'},
      {name: translations['Serial#'], type: 'input'},
      {name: translations['COCOM'], type: 'dropdown'},
      {name: translations['Unit'], type: 'dropdown'},
      {name: translations['Location'], type: 'dropdown'},
      {name: translations['Record Date'], type: 'date'},
    ];

    return (
      <div>
        <div className="row orders-assets">
          <div className="header-line">
            <img src="/images/admin/personnel_1.png" alt=""/>
            <div className="header-text">
              {translations["payloads"]} 
            </div>
            <img className="mirrored-X-image" src="/images/admin/personnel_1.png" alt=""/>
          </div>
          <div className="col-md-12 filter-line">
            <div className="add-button">
              <DropDownButton key = '1' label={translations["Add Payload"]} id="1" items={addPayloads} />
            </div>
          </div>
          <div className="col-md-12">
            <ReactTable
              data={payload_data}
              columns={columns}
              defaultPageSize={5}
              className="-striped -highlight"
              filterable
              defaultFilterMethod={(filter, row) =>
                String(row[filter.id]) === filter.value}
            />
          </div>
        </div>
        
        <EoirModal show={this.state.eoirModalOpen} onClose={this.eoirModal} translations = {translations}/>
        <SargmtiModal show={this.state.sargmtiModalOpen} onClose={this.sargmtiModal} translations = {translations}/>
        <WamiModal show={this.state.wamiModalOpen} onClose={this.wamiModal} translations = {translations}/>
        <SigintModal show={this.state.sigintModalOpen} onClose={this.sigintModal} translations = {translations}/>
        <EquipmentModal show={this.state.equipmentModalOpen} onClose={this.equipmentModal} translations = {translations}/>
        <TableRowDetailModal show={this.state.tableRowDetailModalOpen} onClose={this.tableRowDetailModal} rowdata = {rowFields} translations = {translations}/>
      </div>
    );
  }
}

PayloadsComponent.propTypes = {
  children: PropTypes.element,

};

export default PayloadsComponent;
