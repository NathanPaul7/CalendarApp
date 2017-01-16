import React from 'react';
import axios from 'axios';
//import Event from './Event';

export default class EventListDisplay extends React.Component {
  constructor() {
    super();

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleHourChange = this.handleHourChange.bind(this);
    this.handleMinuteChange = this.handleMinuteChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);

  }

  handleEditClick(eventId) {
    const { events } = this.props;
this.setState({
  eventToEdit: eventId,
  dateValue: events[eventId].eventData.dateValue,
  hourValue: events[eventId].eventData.hourValue,
  minuteValue: events[eventId].eventData.minuteValue,
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

  handleDateChange() {
    const dateValue = this.date.value;
    this.setState({ dateValue })
  }

  handleHourChange() {
    const hourValue = this.hour.value;
    this.setState({ hourValue })

  }
  handleMinuteChange() {
    const minuteValue = this.minute.value;
    this.setState({ minuteValue })
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
          <input type="text"
            placeholder="Date"
            ref={(input) => this.date = input }
            onChange={this.handleDateChange}
            defaultValue={events[key].eventData.dateValue}
            />
            <input
              type="number"
              ref={(input) => this.hour = input}
              min="1" max="12"
              onChange={this.handleHourChange}
              defaultValue={events[key].eventData.hourValue}
            />
          <input
            type="number"
            ref={(input) => this.minute = input}
            min="01" max="59"
            onChange={this.handleMinuteChange}
            defaultValue={events[key].eventData.minuteValue}
            />
          <select>
            <option value={this.state.amValue}>AM</option>
            <option value={this.state.pmValue}>PM</option>
          </select>
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
       <p>  <b>Time: </b>{events[key].eventData.timeValue}</p>
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



