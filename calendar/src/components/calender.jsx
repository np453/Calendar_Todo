import React from 'react';
import moment from 'moment';
import Func from './calendar_functions';
import axios from 'axios';
import '../styles/calender.scss';
import Cookies from 'js-cookie';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
export default class Calendar extends Func {
    state = {
        dateContext: moment(),
        today: moment(),
        showMonthPopup: false,
        showYearPopup: false,
        selectedDay: null,
        popoverOpen:false,
        events:[],
        show:false,
        todo:""
    }
    componentDidMount() {
        this.getEvents();
    }
    
    getEvents = async() => {
        const {data:events} =  await axios.get('/api/listItems');
        this.setState({events});
    }
    displayEvents() {

    }
    togglePopover = () => {    
        this.setState({ popoverOpen: !this.state.popoverOpen })  
      }
      handleClick = () => {
        this.setState({
            show:!this.state.show
        })
    }
    weekdays = moment.weekdays(); 
    weekdaysShort = moment.weekdaysShort(); 
    months = moment.months();
    handleChange = e => {
        const value = e.target.value;
        this.setState({todo:value});
    }
    handelSubmit = e => {
        e.preventDefault();
        const payload = {
            todo:this.state.todo,
            day:this.state.dateContext.date(),
            month:this.state.dateContext.month(),
            year:this.state.dateContext.year()
        }
        axios.post('/api/listItems', payload)
        .then(console.log("event added!"));
    }
    renderEvents(d1, d2){
        if (d1===d2)return true;
        return false;
    }

    render() {
        console.log(this.state.events);
        console.log(Cookies.get());

        let weekdays = this.weekdaysShort.map((day) => {
            return (
                <td key={day} className="week-day">{day}</td>
            )
        });

        let blanks = [];
        for (let i = 0; i < this.firstDayOfMonth(); i++) {
            blanks.push(<td key={i * 80} className="emptySlot">
                {""}
                </td>
            );
        }
        
        let daysInMonth = [];
        for (let d = 1; d <= this.daysInMonth(); d++) {
            daysInMonth.push(

                <td key={d} id="tddd" className={d === this.state.today.date() ? "today dropdown days":"dropdown days"}>
                <span className="" onClick={e => this.onDayClick(e, d)}>{d}</span>
                            <form className="form" onSubmit={this.handelSubmit}>
                                <div className="form-group p-3">
                                    <label htmlFor="">new event</label>
                                    <input onChange={this.handleChange} className="form-control event" type="text" value={this.state.todo}/>
                                    <button className="btn btn-sm btn-primary mt-2">Add event</button>
                                </div>
                            </form>
                </td>  
                    
                
            );
        }

        var totalSlots = [...blanks, ...daysInMonth];
        let rows = [];
        let cells = [];

        totalSlots.forEach((row, i) => {
            if ((i % 7) !== 0) {
                cells.push(row);
            } else {
                let insertRow = cells.slice();
                rows.push(insertRow);
                cells = [];
                cells.push(row);
            }
            if (i === totalSlots.length - 1) {
                let insertRow = cells.slice();
                rows.push(insertRow);
            }
        });
        let trElems = rows.map((d, i) => {
            return (
                <tr key={i*100} className="week-rows">
                    {d}
                </tr>
            );
        })
        return (
            <div className="container-fluid" style={this.style}>
                {this.calendarNav()}
                <table className="table">
                    <thead>
                    </thead>
                    <tbody>
                        <tr className="week-rows">
                            {weekdays}
                        </tr >
                        {trElems}
                    </tbody>
                </table>
            </div>

        );
    }
}