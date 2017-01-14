import React from 'react';

export default class AddEventForm extends React.Component {


  constructor(props) {
    super(props);
      this.state = {

        dateValue: '',
        hourValue: '',
        minuteValue: '',
        eventTextValue: ''

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

  handleDateChange() {
    const dateValue = this.date.value;
    this.setState({ dateValue })
  }

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
          <input type="text"
            placeholder="Date"
            ref={(input) => this.date = input }
            onChange={this.handleDateChange}
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
            <option value={this.state.amValue}>AM</option>
            <option value={this.state.pmValue}>PM</option>
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

// dateValue: '',
//         hourValue: '',
//         minuteValue: '',
//         amValue: false,
//         pmValue: false,
//         eventTextValue: ''
