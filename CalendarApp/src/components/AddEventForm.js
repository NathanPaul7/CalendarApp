import React from 'react';

export default class AddEventForm extends React.Component {


  constructor(props) {
    super(props);
      this.state = {
        inputValue: {}
      }

    this.renderHours = this.renderHours.bind(this);
    // this.handleDateChange = this.handleDateChange.bind(this);
    // this.handleHourChange = this.handleHourChange.bind(this);
    // this.handleMinuteChange = this.handleMinuteChange.bind(this);
    // this.handleTextChange = this.handleTextChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }


  handleSubmit(e) {
    e.preventDefault();

  }

  handleClick() {
    const event = {
      date: this.date.value,
      hour: this.hour.value,
      minute: this.minute.value,
      text: this.text.value

    }

    this.setState({ inputValue: event })
      console.log(this.state.inputValue);
    //this.props.postListData(this.state.inputValue);
    //this.setState({ inputValue: {} });
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
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input type="text"
            placeholder="Date"
            ref={(input) => this.date = input}
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
            ref={(input) => this.text = input}
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
