import React, { Component } from 'react'
import moment from 'moment';
import Func from './calendar_functions';
import {Link} from 'react-router-dom';
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';
export default class Year extends Func {
    weekdaysShort = moment.weekdaysShort();
    months = moment.months();
    state = {
        dateContext:moment(),
        allMonths:[],
        today:moment()
    }
    year = (m) => {
        return m.format("Y");
    }
    month = (m) => {
        return m.format("MMMM");
    }
    daysInMonth = (m) => {
        return m.daysInMonth();
    }
    currentDate = (m) => {
        console.log("currentDate: ", m.get("date"));
        return m.get("date");
    }
    currentDay = (m) => {
        return m.format("D");
    }

    firstDayOfMonth = (m) => {
        let dateContext = m;
        let firstDay = moment(dateContext).startOf('month').format('d'); 
        return firstDay;
    }
    renderWeekDays() {
        let weekdays = this.weekdaysShort.map((day) => 

                <td key={day} className="week-day">{day}</td>
        );
        return weekdays;
    }

    renderNavBar() {
        return (
            <nav className="navbar m-0 navbar-expand-lg navbar-sticky-top">
                    <h1 className="navbar-text">
                        {moment().format("YYYY")}
                    </h1>
                    <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navLinks" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navLinks">
                        <div className="navbar-nav ml-auto">
                        <Link to="/Year"><span className="p-2 navLinks nav-item nav-link">Year</span></Link>
                        <Link to="/"><span className="p-2 navLinks nav-item nav-link">month</span></Link>
                        <span className="p-2 navLinks nav-item nav-link">week</span>
                        <i className="fa fa-list-ul p-2" style={{fontSize:24}}></i> 
                        </div>
                            
                    </div>
            </nav>
        );
    }

    renderMonths() {
        let allMonths=[];
        for(let i=0;i<12;i++) {
            let monthNo = i;
            let dateContext = Object.assign({}, moment());
            dateContext = moment().set("month", monthNo);
            allMonths.push(dateContext);
        }
        console.log(allMonths);
        return (
            <React.Fragment>
                {this.renderNavBar()}
            <div className="row">
                {allMonths.map(m => 
                    <div className="col-md-3 p-5">
                        <h2 className="text-center badge badge-primary badge-lg">{m.format("MMMM")}</h2>
                        <table className="table">
                            <tbody>
                            <tr>
                            {this.renderEachMonth(m)}
                            </tr>  
                            </tbody>
                        </table>
                    </div>
                        
                    )}                    
            </div>
            </React.Fragment>
        );
    }

    renderEachMonth(m) {
        const today = this.state.today.date();
        let blanks = [];
        for (let i = 0; i < this.firstDayOfMonth(m); i++) {
            blanks.push(<td key={i * 80} className="emptySlot">
                {""}
                </td>
            );
        }
        let daysInMonth = [];
        for (let d = 1; d <= this.daysInMonth(m); d++) {
            daysInMonth.push(
                
                <OverlayTrigger
                rootClose
                trigger="click"
                placement="top"
                overlay={
                    <Popover className="edit-popover">
                    <Popover.Title as="h3" className="popover-title">New event{d ===  today? " today":(d === today+1 ? " tomorrow":` on ${d}th`)}</Popover.Title>
                    <Popover.Content>
                        <form className="form form-group"  action="">
                            <input onChange={this.handleRadio} name="edit" type="textarea" className="form-control mb-3" type="text"/>
                            <button  className="btn btn-success btn-sm">save changes</button>
                        </form>
                    </Popover.Content>
                    </Popover>
                }
                >
                <td key={d} className="days days-year">
                    <span className="" onClick={(e)=>{this.onDayClick(e, d)}}>{d}</span>
                </td>
            </OverlayTrigger>
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
                <tr key={i*100} className="">
                    {d}
                </tr>
            );
        })
        return [trElems];
    }
    render() {
        
        return (
            <div className="container-fluid">            
                {this.renderMonths()}
            </div>
        )
    }
}
