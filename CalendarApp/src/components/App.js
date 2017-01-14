import React from 'react';
import '../../src/App.css';
import axios from 'axios';
import AddEventForm from './AddEventForm';
import EventListDisplay from './EventListDisplay'


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


    axios.post('https://calendarapp-eca54.firebaseio.com/.json', { eventData })
      .then((response) => {
      this.getListData();
      })

  }

  // renderTodoList() {
  //   let todoElements = [];

  //   for(let todoId in this.state.todos) {
  //     let todo = this.state.todos[todoId]

  //     todoElements.push(
  //       <div className="todo d-flex justify-content-between pb-4" key={todoId}>
  //         <div className="mt-2" onClick={ () => this.selectTodo(todoId) }>
  //           <h4>{todo.title}</h4>
  //           <div>{moment(todo.createdAt).calendar()}</div>
  //         </div>
  //         <button
  //           className="ml-4 btn btn-link"
  //           onClick={ () => { this.deleteTodo(todoId) } }
  //         >
  //           <span aria-hidden="true">&times;</span>
  //         </button>
  //       </div>
  //     );
  //   }

  render() {
    return (
      <div className="App">
        <h1>Calendar App</h1>
        <button>Create New Event</button>
        <AddEventForm postListData={this.postListData}/>
        <EventListDisplay
          events={this.state.events}
          getListData={this.getListData} />

      </div>
    );
  }
}
