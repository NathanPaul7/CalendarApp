import React from 'react';
import '../../src/App.css';
import axios from 'axios';
import AddEventForm from './AddEventForm';
import EventListDisplay from './EventListDisplay'


export default class App extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      events: {},
      dateValue: '',
      hourValue: '',
      minuteValue: '',
      eventTextValue: ''
    }

  this.getListData = this.getListData.bind(this);
  this.postListData = this.postListData.bind(this);

  }

  componentDidMount() {
    this.getListData();

  }

  getListData() {
    axios.get('https://calendarapp-eca54.firebaseio.com/.json')
      .then((response) => {
        let events = response.data;
        this.setState({ events });

      })
  }

  postListData(eventData) {

    axios.post('https://calendarapp-eca54.firebaseio.com/.json', { eventData })
      .then((response) => {
      this.getListData();
      })

  }



  render() {
    return (
      <div className="App">
        <h1>Calendar App</h1>
        <button>Create New Event</button>
        <AddEventForm
          postListData={this.postListData}
          dateValue={this.state.dateValue}
          hourValue={this.state.hourValue}
          minuteValue={this.state.minuteValue}
          eventTextValue={this.state.eventTextValue}
          />
        <EventListDisplay
          events={this.state.events}
          getListData={this.getListData}
          postListData={this.postListData}
          handleClick={this.handleClick}
          dateValue={this.state.dateValue}
          hourValue={this.state.hourValue}
          minuteValue={this.state.minuteValue}
          eventTextValue={this.state.eventTextValue}
           />

      </div>
    );
  }
}
