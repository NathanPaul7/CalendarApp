import React from 'react';
import DatePicker from 'react-bootstrap-date-picker';
import DateTime from 'react-datetime';

export default class AddEventForm extends React.Component {


  constructor(props) {
    super(props);
      this.state = {
        dateValue: ''
      }

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleHourChange = this.handleHourChange.bind(this);
    this.handleMinuteChange = this.handleMinuteChange.bind(this);
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

  // componentDidUpdate() {
  //   const hiddenInputElement = document.getElementById("example-datepicker");
  //   console.log(hiddenInputElement.value); // ISO String, ex: "2016-11-19T12:00:00.000Z"
  //   console.log(hiddenInputElement.getAttribute('data-formattedvalue')) // Formatted String, ex: "11/19/2016"
  // }

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
// datePicker() {
//   $(function () {
//                 $('#datetimepicker1').datetimepicker();
//             });
// }


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
            <DateTime mode="time" dateFormat={false} inputProps={ {placeholder: "time"} }/>
            <input
              type="number"
              ref={(input) => this.hour = input}
              min="1" max="12"
              onChange={this.handleHourChange}
            />
          <input
            type="number"
            ref={(input) => this.minute = input}
            min="01" max="59"
            onChange={this.handleMinuteChange}
            />
          <select>
            <option value={this.amValue}>AM</option>
            <option value={this.pmValue}>PM</option>
          </select>
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
//<DatePicker
          //showClearButton={false}
         // ref={(input) => this.date = input }
         // onChange={this.handleDateChange}
       //   />
