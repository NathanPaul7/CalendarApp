import React from 'react';
//import Event from './Event';

export default class EventListDisplay extends React.Component {
  handleClick() {
    deleteEvent();
  }

  deleteEvent(toDeleteId) {
    axios.delete()
  }

  render() {
    const { events, getListData } = this.props;

    return (

      <ul>{Object.keys(events)
         .map(key =>
           <li  key={key} className="event-item">
       <p><button onClick={this.handleClick}>x</button> {events[key].eventData.dateValue}</p>
       <p> {events[key].eventData.hourValue}</p>
       <p> {events[key].eventData.minuteValue}</p>
       <p> {events[key].eventData.eventTextValue}</p>

      </li>)}


      </ul>

    );
  }
}
