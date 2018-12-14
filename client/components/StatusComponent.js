import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import StatusTable from './reusable/StatusTable';
import FullHeaderLine from './reusable/FullHeaderLine';
import HalfHeaderLine from './reusable/HalfHeaderLine';
import CircleStatus from './reusable/CircleStatus';
import ButtonsList from './reusable/ButtonsList';
import Modal  from './reusable/Modal';
import Dropdown from "./reusable/Dropdown";
import FilterDropdown from './reusable/FilterDropdown';
import CustomButton from './reusable/CustomButton';

import CustomDatePicker from './reusable/CustomDatePicker';
import DropDownButton from './reusable/DropDownButton';


import "react-table/react-table.css";
import ReactTable from 'react-table';




class StatusComponent extends React.Component {

  constructor(props) {
    super(props);
    this.onClear();
    this.onSubmit();
    this.state={
      statusModalOpen:false,
    }
  }

  statusModal = () => {
    this.setState({
      statusModalOpen: !this.state.statusModalOpen
    });
  }

  onClear(){
    console.log("clear");
  }

  onSubmit(){
    console.log("submit");
  }

  render() {

    let langs = ['val 1', 'val 2'];

    const {translations: {translations}} = this.props;

    const platform = [
      { platform:'grey eagle', tail:'fg2592', status:'flight ready', remark:'none', etic:'90 days', update:'update' },
      { platform:'grey eagle', tail:'an9444', status:'flight ready', remark:'none', etic:'90 days', update:'update'},
      { platform:'grey eagle', tail:'tf59393', status:'off-line', remark:'ppm', etic:'60 days', update:'update'},
      { platform:'predator', tail:'ks69223', status:'off-line', remark:'fuel leak', etic:'30 days', update:'update'},
      { platform:'mc-12w', tail:'df23992', status:'flight ready', remark:'none', etic:'90 days', update:'update'},
      { platform:'global hawk', tail:'ji239223', status:'off-line', remark:'landing gear', etic:'10 days', update:'update'},
      { platform:'global hawk', tail:'ji239223', status:'off-line', remark:'landing gear', etic:'10 days', update:'update'}

    ];
    const platformColumns = [
      {
        Header: translations['platform'],
        accessor: 'platform', 
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value),
        sortMethod: (a, b) => {
                      if (a.length === b.length) {
                        return a > b ? 1 : -1;
                      }
                      return a.length > b.length ? 1 : -1;
                    }// String-based value accessors!
      },
      {
        Header: translations['Tail#'],
        accessor: 'tail',
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value)
      },
      {
        Header: translations['status'],
        accessor: 'status',

      },
      {
        Header: translations['remark'],
        accessor: 'remark',

      }, 
      {
        Header: translations['etic'],
        accessor: 'etic',
      },
      {
        Header: translations['update'],
        accessor: 'update',
        filterable: false,
        Cell: props => <span className='number'><img src="/images/general/eye_icon.png" onClick={this.statusModal} /></span>// Custom cell components!
      }
    ];

    
    const payload = [
      { payload:'acs-9', serial:'434343224', status:'flight ready', remark:'none', etic:'20 days', update:'update' },
      { payload:'acs-2', serial:'282932992', status:'flight ready', remark:'none', etic:'20 days', update:'update' },
      { payload:'vader', serial:'098392990', status:'off-line', remark:'none', etic:'ppm', update:'update' },
      { payload:'tsp-3', serial:'430480203', status:'off-line', remark:'serial cable', etic:'20 days', update:'update' },
      { payload:'mx-20', serial:'220239922', status:'flight ready', remark:'none', etic:'90 days', update:'update' },
      { payload:'acs-3', serial:'092928822', status:'off-line', remark:'imu calib', etic:'10 days', update:'update' },
      { payload:'acs-9', serial:'434343224', status:'flight ready', remark:'none', etic:'20 days', update:'update' }
    ];

    const payloadColumns = [
      {
        Header: translations['payload'],
        accessor: 'payload', 
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value),
        sortMethod: (a, b) => {
                      if (a.length === b.length) {
                        return a > b ? 1 : -1;
                      }
                      return a.length > b.length ? 1 : -1;
                    }// String-based value accessors!
      },
      {
        Header: translations['serial#'],
        accessor: 'serial',
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value)
      },
      {
        Header: translations['status'],
        accessor: 'status',

      },
      {
        Header: translations['remark'],
        accessor: 'remark',

      }, 
      {
        Header: translations['etic'],
        accessor: 'etic',
      },
      {
        Header: translations['update'],
        accessor: 'update',
        filterable: false,
        Cell: props => <span className='number'><img src="/images/general/eye_icon.png" onClick={this.statusModal} /></span>// Custom cell components!
      }
    ];

    const equipment = [
      { equipment:'strut align', serial:'2932sx21', status:'ready', inventory:'12', remark:'none', update:'update' },
      { equipment:'hydraulic jack', serial:'303-4332', status:'ready', inventory:'8', remark:'none', update:'update' },
      { equipment:'mq river set', serial:'oo-23212', status:'ready', inventory:'23', remark:'none', update:'update' },
      { equipment:'mc deicing kit', serial:'8202334d', status:'low', inventory:'2', remark:'req', update:'update' },
      { equipment:'gh-9 turbine', serial:'pdm2321', status:'ready', inventory:'3', remark:'none', update:'update' },
      { equipment:'satcom kit', serial:'239230x2', status:'ready', inventory:'6', remark:'none', update:'update' },
      { equipment:'strut align', serial:'2932sx21', status:'ready', inventory:'12', remark:'none', update:'update' }
    ];

    const equipmentColumns = [
      {
        Header: translations['equipment'],
        accessor: 'equipment', 
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value),
        Filter: ({ filter, onChange }) =>
                    <FilterDropdown dropdownDataUrl="Munition" dropdownData={(value)=>{onChange({filterValue:value}); console.log(value);}} value={this.state.filterValue}/>,
        sortMethod: (a, b) => {
                      if (a.length === b.length) {
                        return a > b ? 1 : -1;
                      }
                      return a.length > b.length ? 1 : -1;
                    }// String-based value accessors!
      },
      {
        Header: translations['serial#'],
        accessor: 'serial',
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value)
      },
      {
        Header: translations['status'],
        accessor: 'status',

      },
      {
        Header: translations['inventory'],
        accessor: 'inventory',
      },
      {
        Header: translations['remark'],
        accessor: 'remark',

      }, 
      {
        Header: translations['update'],
        accessor: 'update',
        filterable: false,
        Cell: props => <span className='number'><img src="/images/general/eye_icon.png" onClick={this.statusModal} /></span>// Custom cell components!
      }
    ];

    const petTeam = [
      { team:'blue', type:'fmv', status:'ready', day:'11-nov-17', time:'08:00', remark:'none', update:'update' },
      { team:'yellow', type:'fmv', status:'ready', day:'12-nov-17', time:'09:00', remark:'none', update:'update' },
      { team:'green', type:'fmv', status:'ready', day:'11-nov-17', time:'16:00', remark:'none', update:'update' },
      { team:'black', type:'sigint', status:'off-line', day:'14-nov-17', time:'09:30', remark:'training', update:'update' },
      { team:'red', type:'sigint', status:'off-line', day:'10-nov-17', time:'21:00', remark:'transfer', update:'update' },
      { team:'pink', type:'imint', status:'off-line', day:'12-nov-17', time:'19:30', remark:'training', update:'update' },
      { team:'gray', type:'fmv', status:'ready', day:'11-nov-17', time:'08:00', remark:'none', update:'update' }
    ];

    const petTeamColumns = [
      {
        Header: translations['team'],
        accessor: 'team', 
        sortMethod: (a, b) => {
                      if (a.length === b.length) {
                        return a > b ? 1 : -1;
                      }
                      return a.length > b.length ? 1 : -1;
                    }// String-based value accessors!
      },
      {
        Header: translations['type'],
        accessor: 'type',
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value)
      },
      {
        Header: translations['status'],
        accessor: 'status',

      },
      {
        Header: translations['day'],
        accessor: 'day',
      },
      {
        Header: translations['Time'],
        accessor: 'time',
      },
      {
        Header: translations['remark'],
        accessor: 'remark',

      }, 
      {
        Header: translations['update'],
        accessor: 'update',
        filterable: false,
        Cell: props => <span className='number'><img src="/images/general/eye_icon.png" onClick={this.statusModal} /></span>// Custom cell components!
      }
    ];

    const personnelHead = [ translations['Name'], translations['Rank'], translations['mos'], translations['duty pos.'], translations['arrive'], translations['depart'], translations['update'], ];
    const personnel = [
      { name:'Jones, rodney', rank:'a1c', mos:'15p', duty:'airops spec.', arrive:'12-jan-17', depart:'12-oct-17', update:'update' },
      { name:'kennedy, tate', rank:'a1c', mos:'15p', duty:'airops spec.', arrive:'03-mar-17', depart:'10-jan-18', update:'update' },
      { name:'Nelson, max', rank:'sra', mos:'15o', duty:'aviator off.', arrive:'05-june-17', depart:'22-jan-18', update:'update' },
      { name:'hampton, kyle', rank:'sra', mos:'15o', duty:'aviator off.', arrive:'23-jan-17', depart:'12-oct-18', update:'update' },
      { name:'springer, dan', rank:'ssgt', mos:'15k', duty:'air repair sup.', arrive:'17-july-17', depart:'12-apr-18', update:'update' },
      { name:'marlow, barry', rank:'tsgt', mos:'15n', duty:'avionic mech.', arrive:'01-oct-17', depart:'02-oct-18', update:'update' },
      { name:'Jones, rodney', rank:'a1c', mos:'15p', duty:'airops spec.', arrive:'12-jan-17', depart:'12-oct-17', update:'update' },
    ];

    const personnelColumns = [
      {
        Header: translations['Name'],
        accessor: 'name', 
        sortMethod: (a, b) => {
                      if (a.length === b.length) {
                        return a > b ? 1 : -1;
                      }
                      return a.length > b.length ? 1 : -1;
                    }// String-based value accessors!
      },
      {
        Header: translations['Rank'],
        accessor: 'rank',
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value)
      },
      {
        Header: translations['mos'],
        accessor: 'mos',
      },
      {
        Header: translations['duty pos.'],
        accessor: 'duty',
      },
      {
        Header: translations['arrive'],
        accessor: 'arrive',
      },
      {
        Header: translations['depart'],
        accessor: 'depart',
      },
      {
        Header: translations['update'],
        accessor: 'update',
        filterable: false,
        Cell: props => <span className='number'><img src="/images/general/eye_icon.png" onClick={this.statusModal} /></span>// Custom cell components!
      }
    ];

    const commentHead = ['commanders remarks'];
    const comment = [
      'Currently coordinating with U.S. units and anto patners on joint mission training to begin on 05 januar...'
    ];

    return (
      <div>
          <div className="row status" >
            <FullHeaderLine headerText={translations["unit status report"]} />
            <div className="status-content">
              <div className="col-md-4 image-block">
                <img src="/images/status/status_logo.png" className="photo" alt="" />
              </div>
              <div className="col-md-8 status-block">
                <CircleStatus statusHeader={translations["platform"]} statusPercent="88%" statusNumber="16/18" />
                <CircleStatus statusHeader={translations["payload"]} statusPercent="55%" statusNumber="17/31" />
                <CircleStatus statusHeader={translations["flight crew"]} statusPercent="89%" statusNumber="239/270" />
                <CircleStatus statusHeader={translations["line crew"]} statusPercent="80%" statusNumber="12/15" />
                <CircleStatus statusHeader={translations["ped crew"]} statusPercent="78%" statusNumber="492/550" />
              </div>
            </div>
          </div>
          <div className="row status">
          <div className="col-md-12">
            <div className="col-md-6">
              <HalfHeaderLine headerText={translations["platform"]} />
              <ReactTable data={platform} columns={platformColumns} defaultPageSize={5} className="-striped -highlight" filterable
                defaultFilterMethod={(filter, row) =>
                  String(row[filter.id]) === filter.value}
              />
            </div>
            <div className="col-md-6">
              <HalfHeaderLine headerText={translations["payload"]} />
              <ReactTable data={payload} columns={payloadColumns} defaultPageSize={5} className="-striped -highlight" filterable
                defaultFilterMethod={(filter, row) =>
                  String(row[filter.id]) === filter.value}
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="col-md-6">
              <HalfHeaderLine headerText={translations["equipment"]} />
              <ReactTable data={equipment} columns={equipmentColumns} defaultPageSize={5} className="-striped -highlight" filterable
                defaultFilterMethod={(filter, row) =>
                  String(row[filter.id]) === filter.value}
              />     
            </div>
            <div className="col-md-6">
              <HalfHeaderLine headerText={translations["ped teams"]} />
              <ReactTable data={petTeam} columns={petTeamColumns} defaultPageSize={5} className="-striped -highlight" filterable
                defaultFilterMethod={(filter, row) =>
                  String(row[filter.id]) === filter.value}
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="col-md-6">
              <HalfHeaderLine headerText={translations["personnel"]} />
              <ReactTable data={personnel} columns={personnelColumns} defaultPageSize={5} className="-striped -highlight" filterable
                defaultFilterMethod={(filter, row) =>
                  String(row[filter.id]) === filter.value}
              />
            </div>
            <div className="col-md-6">
              <HalfHeaderLine headerText={translations["comment"]} />
              <table className="table">
                <thead className="thead">
                <tr className="tr">
                  <td>
                    <div className="comment-image">
                      {translations["comment"]} 
                    </div>
                  </td>
                </tr>
                </thead>
                <tbody className="tbody">
                  <tr >
                    <div className="comment-body">
                      {comment}
                    </div>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
          <div className="row action-buttons" >
            <div className="menu-button">
              <img className="line" src="/images/admin/edit_up.png" alt=""/>
              <button className="highlighted-button" onClick={this.onClear.bind(this)}>
                CLEAR
              </button>
              <img className="line mirrored-Y-image" src="/images/admin/edit_up.png" alt=""/>
            </div>
            <div className="menu-button">
              <img className="line" src="/images/admin/edit_up.png" alt=""/>
              <button className="highlighted-button" onClick={this.onSubmit.bind(this)}>
                SUBMIT
              </button>
              <img className="line mirrored-Y-image" src="/images/admin/edit_up.png" alt=""/>
            </div>
          </div>
          <Modal show={this.state.statusModalOpen}
            onClose={this.statusModal}>
              <div className="modal-header-text">STATUS ENTRY/UPDATE</div>
              <div className="col-md-12">
                <div className="col-md-6 ">
                  <div className="status-change">
                    <div className="status-label">
                      Status:
                    </div>
                    <div className="status-select pull-right">
                      <Dropdown key="status_key" id="status_id" items={langs}/>                      
                    </div>
                  </div>
                </div>
                <div className="col-md-6 ">
                  <div className="status-change">
                    <div className="status-label">
                      ETIC:
                    </div>
                    <div className="status-select pull-right">
                      <Dropdown key="etic_key" id="etic_id" items={langs}/>                      
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="status-remarks">
                  <div className="remarks-label">
                    Description:
                  </div>
                  <div className="remarks-detail">
                    <textarea rows="5"/>
                  </div>
                </div>
              </div>
              <div className="col-md-12" style={{textAlign:'center'}}>
                <CustomButton buttonName="save" />
              </div>            
          </Modal>
      </div>
    );
  }
}

StatusComponent.propTypes = {
  children: PropTypes.element,

};

export default StatusComponent;
