import React from 'react';
import DatePicker from 'react-bootstrap-date-picker';
import DateTime from 'react-datetime';
import moment from 'moment';

export default class AddEventForm extends React.Component {


  constructor() {
    super();
      this.state = {
        dateValue: '',
        formattedTimeValue: '',
        unformattedTimeValue: ''
      }

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleClick = this.handleClick.bind(this);


  }


  handleSubmit(e) {
    e.preventDefault();

  }

  handleClick(event) {

    this.props.postListData(this.state);
    this.addEventForm.reset();
    this.setState({
      dateValue: '',
      formattedTimeValue: ''
    })

  }

  handleDateChange(dateValue, formattedValue) {
    this.setState({
      dateValue: dateValue,
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


  render() {
    return (
      <div>

        <form

          onSubmit={(e) => this.handleSubmit(e)}
          ref={(input) => this.addEventForm = input}
          >
          <div id="form">
          <h4>Create New Event:</h4>
            <DatePicker
              id="example-datepicker"
              value={this.state.dateValue}
              onChange={this.handleDateChange}
            />


            <DateTime
              dateFormat={false}
              inputProps={ {placeholder: "Time"} }
              value={this.state.formattedTimeValue}
              onChange={this.handleTimeChange}
              />


            <textarea
            className="form-control"
            id="form-text"
             rows="4" cols="40"
            placeholder="Event details"
            ref={(input) => this.eventText = input}
            onChange={this.handleTextChange}
            >
            </textarea>


          <input
            className="btn btn-default"
            type="submit"
            value="Submit"
            onClick={() => this.handleClick()}
            />
            </div>
        </form>
      </div>
    );
  }
}
