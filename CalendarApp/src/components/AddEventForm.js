import React from 'react';
import DatePicker from 'react-bootstrap-date-picker';

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

  handleDateChange(dateValue) {

    this.setState({ dateValue })
  }

// handleChange: function(value, formattedValue) {
//     this.setState({
//       value: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
//       formattedValue: formattedValue // Formatted String, ex: "11/19/2016"
//     });
//   },
//   getInitialState: function(){
//     var value = new Date().toISOString();
//     return {
//       value: value
//     }

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
          <DatePicker Datevalue={this.state.value}
                  onChange={this.handleDateChange}
            />
          <input type="text"
            placeholder="Date"
            ref={(input) => this.date = input }
            onChange={this.handleDateChange}
            data-provide="datepicker"
            />

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
