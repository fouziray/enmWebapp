import * as React from 'react';
import Paper from '@mui/material/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  WeekView,
  EditRecurrenceMenu,
  AllDayPanel,
  ConfirmationDialog,
  Toolbar,
  DateNavigator,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';

const currentDate = '2018-11-01';
const enddate= new Date(2023, 7, 1, 11, 35) ;
const startdate= new Date(2023, 7, 1, 9, 35)
const schedulerData = [
  { id:1,startDate:startdate, endDate: enddate, title: 'Meeting'},
  { id: 2, startDate:new Date(2023, 7, 1, 14, 35), endDate: new Date(2023, 7, 1, 15, 35), title: 'Go to a gym'},
];


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
      console.log("jejeej", schedulerData.concat(props.data));
      this.state = {
        data: schedulerData.concat(props.data),
        currentDate: props.now,
  
        addedAppointment: {},
        appointmentChanges: {},
        editingAppointment: undefined,
      };
      this.onSchedulerStateChange=props.onSchedulerStateChange;
      this.commitChanges = this.commitChanges.bind(this);
      this.changeAddedAppointment = this.changeAddedAppointment.bind(this);
      this.changeAppointmentChanges = this.changeAppointmentChanges.bind(this);
      this.changeEditingAppointment = this.changeEditingAppointment.bind(this);
    }
 
    changeAddedAppointment(addedAppointment) {
      this.setState({ addedAppointment });
    }
  
    changeAppointmentChanges(appointmentChanges) {
      this.setState({ appointmentChanges });
    }
  
    changeEditingAppointment(editingAppointment) {
      this.setState({ editingAppointment });
    }
  
    commitChanges({ added, changed, deleted }) {
      this.setState((state) => {
          console.log(deleted,"del");
        let { data } = state;
        if (added) {
          const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
          console.log("creation",startingAddedId, data.length,)
          data = [...data, { id: startingAddedId, ...added }];
          this.onSchedulerStateChange(data);

        }
        if (changed) {
          data = data.map(appointment => (
            changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
        }
        if (deleted !== undefined) {
          data = data.filter(appointment => appointment.id !== deleted);
          console.log("deleted",data,deleted);
        }
        return { data };
      });
    }
  
    render() {
      const {
        currentDate, data, addedAppointment, appointmentChanges, editingAppointment,
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
              endDayHour={17}
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
            <AppointmentForm />
          </Scheduler>
        </Paper>
      );
    }
  }
  