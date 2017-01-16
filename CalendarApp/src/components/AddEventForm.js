import React from 'react';
import DatePicker from 'react-bootstrap-date-picker';
import DateTime from 'react-datetime';
import moment from 'moment';

export default class AddEventForm extends React.Component {


  constructor(props) {
    super(props);
      this.state = {
        dateValue: '',
        timeValue: ''
      }

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    //this.handleClick = this.handleClick.bind(this);
    //this.renderHours = this.renderHours.bind(this);

  }


  handleSubmit(e) {
    e.preventDefault();

  }

  handleClick(event) {

    this.props.postListData(this.state);
    this.addEventForm.reset();

  }

  handleDateChange(dateValue, formattedValue) {
    this.setState({
      dateValue: dateValue,
      formattedDateValue: formattedValue
       });
  }

  handleTimeChange(timeValue) {
    let formattedTime = moment(timeValue).format("hh:mm A");
    this.setState({ timeValue: formattedTime });
  }

  handleTextChange() {
    const eventTextValue = this.eventText.value;
    this.setState({ eventTextValue })
  }

  renderHours() {
    for (let i=1; i <= 12; i++) {
      let options = `<option value=${i}>${i}</option>`;
      return options;


      // let options = [];
      // options.push(`<option value=${i}>${i}</option>`);
            //console.log(options);
          }
  }

  render() {
    return (
      <div className="form">
        <form
          onSubmit={(e) => this.handleSubmit(e)}
          ref={(input) => this.addEventForm = input}
          >
            <DatePicker
              id="example-datepicker"
              value={this.state.dateValue}
              onChange={this.handleDateChange}
            />
            <DateTime
              dateFormat={false}
              inputProps={ {placeholder: "time"} }
              value={this.state.timeValue}
              onChange={this.handleTimeChange}
              />
            <input
            type="text"
            placeholder="Event details"
            ref={(input) => this.eventText = input}
            onChange={this.handleTextChange}
            />
          <input
            type="submit"
            value="Submit"
            onClick={() => this.handleClick()}
            />
        </form>
      </div>
    );
  }
}
