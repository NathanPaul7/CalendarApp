import React from 'react';
import axios from 'axios';
import DatePicker from 'react-bootstrap-date-picker';
import DateTime from 'react-datetime';
import moment from 'moment';
//import Event from './Event';

export default class EventListDisplay extends React.Component {
  constructor() {
    super();

    this.state = {
        formattedDateValue: '',
        unformattedDateValue: '',
        formattedTimeValue: '',
        unformattedTimeValue: ''
      }

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);

  }

  handleEditClick(eventId) {
    const { events } = this.props;

this.setState({
  eventToEdit: eventId,
  formattedDateValue: events[eventId].eventData.formattedDateValue,
  formattedTimeValue: events[eventId].eventData.formattedTimeValue,
  unformattedDateValue: events[eventId].eventData.dateValue,
  unformattedTimeValue: events[eventId].eventData.unformattedTimeValue,
  eventTextValue: events[eventId].eventData.eventTextValue
});

  }

  handleSubmit(e) {
    e.preventDefault();

  }

  patchListData(editedData) {
    let id = this.state.eventToEdit;
    //let currentTodo = this.state.todos[id];
    //currentTodo.title = this.refs.editTodoInput.value;
    axios.patch(`https://calendarapp-eca54.firebaseio.com/${id}.json`, { eventData: editedData })
      .then((response) => {
      this.props.getListData();
      this.setState({ eventToEdit: null })
      // this.setState({
      //   dateValue: null,
      //   eventToEdit: null });
      })

  }

  handleClick() {

    this.patchListData(this.state);
 }

  handleDateChange(dateValue, formattedValue) {
    this.setState({
      unformattedDateValue: dateValue,
      formattedDateValue: formattedValue
       });
  }

   handleTimeChange(timeValue) {
    let formattedTime = moment(timeValue).format("hh:mm A");
    this.setState({
      formattedTimeValue: formattedTime,
      unformattedTimeValue: timeValue
       });
  }


  handleTextChange() {
    const eventTextValue = this.eventText.value;
    this.setState({ eventTextValue })
  }


  renderItemOrEditField(key) {
    const { events } = this.props;
        if ( this.state && this.state.eventToEdit === key ) {

      return <li  key={key}  className="event-item">

       <form
          onSubmit={(e) => this.handleSubmit(e)}
          ref={(input) => this.addEventForm = input}
          >
           <input
            type="submit"
            value="Save Changes"
            onClick={() => this.handleClick(key)}

            />
         <DatePicker
              id="example-datepicker"
              value={this.state.unformattedDateValue}
              onChange={this.handleDateChange}

            />
             <DateTime
              dateFormat={false}
              inputProps={ {placeholder: "time"} }
              value={this.state.formattedTimeValue}
              onChange={this.handleTimeChange}
              />
          <input
            type="text"
            placeholder="Event details"
            ref={(input) => this.eventText = input}
            onChange={this.handleTextChange}
            defaultValue={events[key].eventData.eventTextValue}
            />
        </form>
      </li>;
    } else {
      return (
      <li  key={key} className="event-item">

        <button onClick={() => this.handleDeleteClick(key)}>x</button>
        <button onClick={() => this.handleEditClick(key)}>Edit</button>
       <p> <b>Date: </b>{events[key].eventData.formattedDateValue}</p>
       <p>  <b>Time: </b>{events[key].eventData.formattedTimeValue}</p>
       <p> <b>Scheduled Event:</b> {events[key].eventData.eventTextValue}</p>

      </li>
      )

    }
  }

   handleDeleteClick(eventId) {
    axios.delete(`https://calendarapp-eca54.firebaseio.com/${eventId}.json`)
      .then(response => {
        let events = this.props.events;
        delete events[eventId]
        this.setState({ events })
      }).catch((error) => {
        console.error(error);
      });
  }


  render() {
    const { events } = this.props;

    return (

      <ul>{Object.keys(events)
         .map((key) => { return this.renderItemOrEditField( key )})}
      </ul>

    );
  }
}



