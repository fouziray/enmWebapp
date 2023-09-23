import * as React from 'react';
import Paper from '@mui/material/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  WeekView,
  Resources,
  EditRecurrenceMenu,
  AllDayPanel,
  ConfirmationDialog,
  Toolbar,
  DateNavigator,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
const currentDate = '2018-11-01';
const enddate= new Date(2023, 7, 2, 11, 35) ;
const startdate= new Date(2023, 7, 2, 9, 35)
const schedulerData = [
  { id:1,startDate:startdate, endDate: enddate, title: 'Meeting'},
  { id: 2, startDate:new Date(2023, 7, 2, 14, 35), endDate: new Date(2023, 7, 2, 15, 35), title: 'Go to a gym'},
];
import {
  pink, purple, teal, amber, deepOrange,
} from '@mui/material/colors';
const resourcesData = [
  {
    text: 'Room 101',
    id: 1,
    color: amber,
  }, {
    text: 'Room 102',
    id: 2,
    color: pink,
  }, {
    text: 'Room 103',
    id: 3,
    color: purple,
  }, {
    text: 'Meeting room',
    id: 4,
    color: deepOrange,
  }, {
    text: 'Conference hall',
    id: 5,
    color: teal,
  },
];

const TextEditor = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  if (props.type === 'multilineTextEditor' || props.type === 'titleTextEditor') {
    return null;
  } return <AppointmentForm.TextEditor {...props} />;
};
const ResourceEditor=(props) => {
  return <AppointmentForm.ResourceEditor {...props} />;
}
const Label=(props)=>{
  let propscopy=JSON.parse(JSON.stringify(props));
  if (propscopy.text === 'Details') {
    propscopy.text='Choose a date'
  } 
  else{
    if(propscopy.text === 'More Information')
    propscopy.text='Site Information';
  }
  return <AppointmentForm.Label {...propscopy} />;

}
const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
  const onCustomFieldChange = (nextValue) => {
    onFieldChange({ customField: nextValue });
  };
  return (
    <AppointmentForm.BasicLayout
      appointmentData={appointmentData}
      onFieldChange={onFieldChange}
      {...restProps}
    >
      
    </AppointmentForm.BasicLayout>
  );
};
/*export default () => (
  <Paper>
    <Scheduler
      data={schedulerData}
    >
      <ViewState
        currentDate={currentDate}
      />
      <DayView
        startDayHour={9}
        endDayHour={14}
      />
      <Appointments />
    </Scheduler>
  </Paper>
);*/


export default class Demo extends React.PureComponent {
    constructor(props) {
      super(props);   
     const copyDeepObject = obj => {
        return JSON.parse(JSON.stringify(obj));
     }
     let copy = copyDeepObject(props.data); 


     copy.map(function(item){
        if(!(item.startDate instanceof Date)) {
         item.startDate=new Date(item.startDate); 
         item.endDate=new Date(item.endDate);
        }
        return item;
      });
      let sites_array= copyDeepObject(props.sites);
      sites_array.forEach(obj=>{obj.text=obj.site_id; obj.id=obj.site_id});
      this.state = {
        ///data: schedulerData.concat(copy),
        data: copy,
        addedData:[],
        sites: props.sites,
        currentDate: props.now,
        hasdtsession: props.hasdtsession,
        addedAppointment: {},
        appointmentChanges: {},
        editingAppointment: undefined,
        resources: [
        {
          fieldName: 'siteId',
          title: 'Site identifying code',
          instances: sites_array,
        }],
      };
      this.setShowAlert=props.setShowAlert;
      this.admin=props.admin;
      this.onSchedulerStateChange=props.onSchedulerStateChange;
      this.currentSelectedTechnician=props.currentSelectedTechnician;
      this.currentSelectedTeam=props.currentSelectedTeam;
      this.hasSession=props.onHasSession;
      this.hasdtsession=props.hasdtsession
      this.commitChanges = this.commitChanges.bind(this);
      this.changeAddedAppointment = this.changeAddedAppointment.bind(this);
      this.changeAppointmentChanges = this.changeAppointmentChanges.bind(this);
      this.changeEditingAppointment = this.changeEditingAppointment.bind(this);
      this.doesOverlap = this.doesOverlap.bind(this);
//      this.onAppointmentFormOpening = this.onAppointmentFormOpening.bind(this);

    }
    static getDerivedStateFromProps(nextProps) {
      return{ hasdtsession: nextProps.hasdtsession };  
    }
    doesOverlap(e1, e2){
      var e1start = e1.startDate.getTime();
      var e1end = e1.endDate.getTime();
      var e2start = e2.startDate.getTime();
      var e2end = e2.endDate.getTime();
    console.log("function does overlap", e1start, e1end, e2start, e2end);
      return (e1start >= e2start && e1start < e2end || 
          e2start >= e1start && e2start < e1end)
    }
    componentDidUpdate(prevProps) {
      // Typical usage (don't forget to compare props):

      if (this.props.hasdtsession !== prevProps.hasdtsession) {
        console.log("changed ",this.props.hasdtsession);
      }
    }
    changeAddedAppointment(addedAppointment) {
      if(this.admin){
      this.setState({ addedAppointment });
      var a=this.hasSession(addedAppointment.siteId);
      }
      else{
        this.setShowAlert(true);
      }

    }
    
    
    changeAppointmentChanges(appointmentChanges) {
      if(this.admin){
        this.setState({ appointmentChanges });

        }
        else{
          this.setShowAlert(true);
        }

    }
  
    changeEditingAppointment(editingAppointment) {
      this.setState({ editingAppointment });
    }
  
    commitChanges({ added, changed, deleted }) {
      
      this.setState((state) => {
        let { data } = state;
        let {addedData} = state;
        if (added) {
          const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
          let overlaps=false;
          this.doesOverlap
          for( var i = 0; i< data.length; i++ ) {
            overlaps=this.doesOverlap(data[i],added);
            console.log("overlappingg in predicate",overlaps);
            if( overlaps ){
              break;
            }
          }
          console.log(overlaps ? "overlaps" : "doesn't overlap");
//          var a=this.hasSession(added.title);
//          if( a ) { console.log("session ",  a,  this.hasdtsession);}
          if(this.props.hasdtsession ){
            console.log("has a dt sesion ------------")
          }else{
            console.log("doesn't have a dt session ------");
            if(!overlaps && added.siteId) 
            {
              added.title=added.siteId;
              data = [...data, { id: startingAddedId, ...added }];
              addedData =[...addedData ,{ id: startingAddedId, technicien: this.currentSelectedTechnician, dtTeam: this.currentSelectedTeam ,...added }] 
            }
          }
          //don't forget conflict of time
          
          this.onSchedulerStateChange({data,addedData});
        }
        if (changed) {
          data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
          
        }
        if (deleted !== undefined) {
          data = data.filter(appointment => appointment.id !== deleted);
        }
        return { data, addedData };
      });
    }
    
    render() {
      const {
        currentDate, data, resources,addedAppointment, appointmentChanges, editingAppointment, sites
      } = this.state;
      return (
        <Paper>
          <Scheduler
            data={data}
            height={660}
          >
            <ViewState
              currentDate={currentDate}
              onCurrentDateChange={this.currentDateChange}

            />
            <EditingState
              onCommitChanges={this.commitChanges}
              addedAppointment={addedAppointment}
              onAddedAppointmentChange={this.changeAddedAppointment}
              appointmentChanges={appointmentChanges}
              onAppointmentChangesChange={this.changeAppointmentChanges}
              editingAppointment={editingAppointment}
              onEditingAppointmentChange={this.changeEditingAppointment}
            />
            <WeekView
              startDayHour={9}
              endDayHour={24}
            />
            <Toolbar />
            <DateNavigator />

            <TodayButton />

            <AllDayPanel />
            <EditRecurrenceMenu />
            <ConfirmationDialog />
            <Appointments />
            
            <AppointmentTooltip
              showOpenButton
              showDeleteButton
            />
            <AppointmentForm
              
              basicLayoutComponent={BasicLayout}
              textEditorComponent={TextEditor}
              labelComponent={Label}
              resourceEditorComponent={ResourceEditor}
            />
            <Resources
            data={resources}
            mainResourceName="siteId"
          />

          </Scheduler>
        </Paper>
      );
    }
    
  }
  