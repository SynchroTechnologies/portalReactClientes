import React, { Component } from "react";
import DatePicker from "react-datepicker";
import addDays from "date-fns/addDays";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
//import "bootstrap/dist/css/bootstrap.min.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
registerLocale("es", es);
class DateTimePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
    };
    this.handleChange = this.handleChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date,
    });
  }

  onFormSubmit(e) {
    e.preventDefault();
    console.log(this.state.startDate);
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <div className="form-group">
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            showTimeSelect
            locale="es"
            timeFormat="HH:mm"
            timeIntervals={30}
            timeCaption="time"
            dateFormat="dd/MM/yyyy h:mm"
            minDate={new Date()}
            maxDate={addDays(new Date(), 60)}
          />
        </div>
      </form>
    );
  }
}

export default DateTimePicker;
