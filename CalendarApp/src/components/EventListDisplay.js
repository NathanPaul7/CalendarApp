import React from 'react';
import axios from 'axios';
//import Event from './Event';

export default class EventListDisplay extends React.Component {

  handleEditClick(eventId) {
this.setState({ eventToEdit: eventId });
  }


  renderItemOrEditField( key ) {
    const { events } = this.props;
    if ( this.state && this.state.eventToEdit === key ) {

      return <li  key={key}  className="event-item">
      <button onClick={() => this.handleEditClick(key)}>Save Changes</button>
       <form
          onSubmit={(e) => this.handleSubmit(e)}
          ref={(input) => this.addEventForm = input}
          >
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
          <input
            type="submit"
            value="Submit"
            onClick={() => this.handleClick()}
            />
        </form>
      </li>;
    } else {
      return (
      <li  key={key} className="event-item">

        <button onClick={() => this.handleDeleteClick(key)}>x</button>
        <button onClick={() => this.handleEditClick(key)}>Edit</button>
       <p> {events[key].eventData.dateValue}</p>
       <p> {events[key].eventData.hourValue}</p>
       <p> {events[key].eventData.minuteValue}</p>
       <p> {events[key].eventData.eventTextValue}</p>

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

