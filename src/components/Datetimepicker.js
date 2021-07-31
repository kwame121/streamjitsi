import React from 'react';// choose your lib
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

export default function Datetimepicker(props) {

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
        <div className="modal-input-row" style={{marginBottom:'1rem'}}>
        <label>Start Date</label><br></br>
             <DateTimePicker value={props.broadcastObject.start_time} onChange={(date)=>{props.OnChange(date,'start_time');}}/>
        </div>
        <div className="modal-input-row" style={{marginBottom:'1rem'}}>
        <label>End Time</label><br></br>
            <DateTimePicker value = {props.broadcastObject.end_time} onChange={(date)=>{props.OnChange(date,'end_time')}}/>
        </div>
    </MuiPickersUtilsProvider>
  );
}