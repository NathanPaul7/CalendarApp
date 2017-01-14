import React from 'react';
import axios from 'axios';
//import Event from './Event';

export default class EventListDisplay extends React.Component {


  handleClick(eventId) {
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
    const { events, getListData } = this.props;


    return (

      <ul>{Object.keys(events)
         .map(key =>
           <li  key={key} className="event-item">
       <p><button onClick={() => this.handleClick(key)}>x</button> {events[key].eventData.dateValue}</p>
       <p> {events[key].eventData.hourValue}</p>
       <p> {events[key].eventData.minuteValue}</p>
       <p> {events[key].eventData.eventTextValue}</p>

      </li>)}


      </ul>

    );
  }
}
