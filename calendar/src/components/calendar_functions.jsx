import React, { Component } from 'react'
import moment from 'moment';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import list from '../assets/list.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';
export default class Func extends Component {
    state = {
        dropDownValue:"month",
        name:""
    }
    year = () => {
        return this.state.dateContext.format("Y");
    }
    month = () => {
        return this.state.dateContext.format("MMMM");
    }
    daysInMonth = () => {
        return this.state.dateContext.daysInMonth();
    }
    currentDate = () => {
        console.log("currentDate: ", this.state.dateContext.get("date"));
        return this.state.dateContext.get("date");
    }
    currentDay = () => {
        return this.state.dateContext.format("D");
    }

    firstDayOfMonth = () => {
        let dateContext = this.state.dateContext;
        let firstDay = moment(dateContext).startOf('month').format('d'); 
        return firstDay;
    }

    setMonth = (month) => {
        let monthNo = this.months.indexOf(month);
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).set("month", monthNo);
        this.setState({
            dateContext: dateContext
        });
    }

    nextMonth = (props) => {
        let dateContext = Object.assign({}, this.state.dateContext); 
        dateContext = moment(dateContext).add(1, "month");
        this.setState({
            dateContext: dateContext
        });
        this.props.onNextMonth && this.props.onNextMonth();
    }

    prevMonth = () => {
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).subtract(1, "month");
        this.setState({
            dateContext: dateContext
        });
        this.props.onPrevMonth && this.props.onPrevMonth();
    }

    onSelectChange = (e, data) => {
        this.setMonth(data);
        this.props.onMonthChange && this.props.onMonthChange();
    }
    // SelectList = (props) => {
    //     let popup = props.data.map((data) => {
    //         return (
    //             <div key={data}>
    //                 <span onClick={(e)=> {this.onSelectChange(e, data)}}>
    //                     {data}
    //                 </span>
    //             </div>
    //         );
    //     });

    //     return (
    //         <div className="month-popup">
    //             {popup}
    //         </div>
    //     );
    // }

    onChangeMonth = (e, month) => {
        this.setState({
            showMonthPopup: !this.state.showMonthPopup
        });
    }

    showYearEditor = () => {
        this.setState({
            showYearNav: true
        });
    }

    setYear = (year) => {
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).set("year", year);
        this.setState({
            dateContext: dateContext
        })
    }
    onYearChange = (e) => {
        this.setYear(e.target.value);
        this.props.onYearChange && this.props.onYearChange(e, e.target.value);
    }

    onKeyUpYear = (e) => {
        if (e.which === 13 || e.which === 27) {
            this.setYear(e.target.value);
            this.setState({
                showYearNav: false
            })
        }
    }

    onDayClick = (e, day) => {
        this.setState({
            selectedDay: day
        }, () => {
            console.log("SELECTED DAY: ", this.state.selectedDay);
        });

        this.props.onDayClick && this.props.onDayClick(e, day);
    }
    changeValue(text) {
        this.setState({dropDownValue: text})
    }
    changeMonth(e, data) {
        this.changeValue(e.target.textContent)
        this.onSelectChange(e, data)
    }
    getUserData = async() => {
        const {data:username} = await axios.get("/api/user/register");
        this.setState({
            name:username
        })
        console.log(this.state.name);
    }
    componentDidMount() {
        this.getUserData();
    }
    
    calendarNav = () => {
        return (
            <nav className="navbar m-0 navbar-expand-lg navbar-sticky-top">
                <div className="navbar-text">
                </div>
                    <div className="col d-flex justify-content-start align-items-center flex-row">
                    <DropdownButton size="md" title={this.month()} className="p-2">
                            {this.months.map(m => 
                                <Dropdown.Item onClick={(e)=> {this.changeMonth(e, m)}}> 
                                    {m}
                                </Dropdown.Item>
                            )}
                        </DropdownButton>
                    <input
                        defaultValue = {this.year()}
                        className="form-control year-value"
                        ref={(yearInput) => { this.yearInput = yearInput}}
                        onKeyUp= {(e) => this.onKeyUpYear(e)}
                        onChange = {(e) => this.onYearChange(e)}
                        type="number"
                        placeholder="year"/>
                    </div>
                    <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navLinks" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div className="row d-flex justify-content-center">
                        <div className="col">
                        <div className="collapse navbar-collapse">
                        <div className="navbar-nav format-options">
                        <Link to="/Year"><span className="p-2 navLinks nav-link nav-item">Year</span></Link>
                            <span className="p-2 navLinks nav-link nav-item">month</span>
                            <span className="p-2 navLinks nav-link nav-item">week</span>           
                        </div> 
                    </div>
                        </div>
                    </div>
                    
                    <div className="collapse navbar-collapse justify-content-end">
                            <i className="fa fa-list-ul p-2" style={{fontSize:24}}></i> 
                            <Link to="/signup"><span className="p-2 navLinks">signup</span></Link>
                            <Link to="/login"><span className="p-2 navLinks">login</span></Link>
                    </div>
            </nav>
        );
    }
    
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
