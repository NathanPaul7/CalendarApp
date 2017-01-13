import React from 'react';
import '../../src/App.css';
import axios from 'axios';
import AddEventForm from './AddEventForm';


export default class App extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      events: {}
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
        //console.log(response.data);
        let events = response.data;
        this.setState({ events });
      })
  }

  postListData(eventData) {

    axios.post('https://calendarapp-eca54.firebaseio.com/.json', {content: eventData})
      .then((response) => {
        console.log(response.data);
        this.getListData();
      })

  }
  render() {
    return (
      <div className="App">
        <h1>Calendar App</h1>
        <button>Create New Event</button>
        <AddEventForm postListData={this.postListData}/>
      </div>
    );
  }
}
