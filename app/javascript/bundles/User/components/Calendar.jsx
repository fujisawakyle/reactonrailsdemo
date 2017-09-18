import React, { Component } from 'react';
import DayPicker from 'react-day-picker';
import Timer from './timer/Timer';
import Journal from './journal/Journal';
import WeekDisplay from './weekdisplay/WeekDisplay';
import User2 from './User2';
// import PropTypes from 'prop-types';

const style = {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      maxWidth: '80em',
      height: '60em',
    },
    user : {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'rgba(255,255,255,0.3)',
      height: '9em',
      width: '22em',
      textAlign: 'center',
      margin: 'auto',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
      padding: '1em',
      margin: '1em',
      color: 'white',
    },
    weekdisplay : {
      background: 'rgba(255,255,255,0.2)',
      textAlign: 'center',
      paddingBottom: '10px',
      width: '22em',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
      margin: '1em',
      color: 'white',
    },
    calendar: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '1em',

    },
    timer : {
      background: 'rgba(255,255,255,0.3)',
      height: '15em',
      width: '22em',
      textAlign: 'center',
      margin: 'auto',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
      margin: '1em',
    },
    journal : {
      background: 'rgba(255,255,255,0.3)',
      height: '25em',
      width: '22em',
      textAlign: 'center',
      margin: 'auto',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
      margin: '1em',
    },

}

// const dateObj = new Date();
// const year = dateObj.getFullYear();
// const month = dateObj.getMonth() + 1;
// const date = dateObj.getDate();
// const todayDate = `${year},${month},${date}`;
// let selectedDay = '';
// let updateFlag = false;

// const weekArray = [];
// for (let i = 0; i < 7; i ++){
//   let oneWeekAgo = new Date()

//   oneWeekAgo.setDate(oneWeekAgo.getDate() - 6 + i);
//   let dateAlter = String(oneWeekAgo).split(' ').splice(1,3);
//   // if (dateAlter[1][0] == 0) {
//   //   dateAlter[1] = dateAlter[1].substr(1);
//   // }
//   dateAlter[0] = translateMonth(dateAlter[0]);
//   let formattedDate = `${dateAlter[2]},${dateAlter[0]},${dateAlter[1]}`;
//   weekArray[i] = formattedDate
// }


// function translateMonth (month) {
//   switch (month) {
//       case 'Jan':
//         month = '1';
//         break;
//       case 'Feb':
//         month = '2';
//         break;
//       case 'Mar':
//         month = '3';
//         break;
//       case 'Apr':
//         month = '4';
//         break;
//       case 'May':
//         month = '5';
//         break;
//       case 'Jun':
//         month = '6';
//         break;
//       case 'Jul':
//         month = '7';
//         break;
//       case 'Aug':
//         month = '8';
//         break;
//       case 'Sep':
//         month = '9';
//         break;
//       case 'Oct':
//         month = '10';
//         break;
//       case 'Nov':
//         month = '11';
//         break;
//       case 'Dec':
//         month = '12';
//         break;
//     }
//   return month;
// }
export default class Calendar extends Component {
  // static propTypes = {
  //   name: PropTypes.string.isRequired, // this is passed from the Rails view
  // };
  constructor(props) {
    super(props);

    this.state = {
      daysArrayNum: this.props.daysArrayNum,
      daysArrayText: this.props.daysArrayText,
      userData: this.props.userData,
      today: true,
      weekArrayVals: this.props.weekArrayVals,
      journal: this.props.journal,
    }

  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if(nextProps.postFlag) {
      console.log('Cal CWRP postFlag true')
      this.setState({
        journal: nextProps.userData[nextProps.userData.length-1].journal,

      });
    }else {
      console.log('Cal CWRP postFlag false')
      console.log('journalprops');
      console.log(this.props.journal);
      this.setState({
        journal: nextProps.journal
      })
    }
  }

  render () {

    return (
      <div>
        <div style={style.container}>
          <div style = {style.user}>
            <User2 name={this.props.name} />
          </div>
          <div className="l-site__components--calendar" style={style.calendar}>
            <DayPicker
              initialMonth={new Date(this.props.year, this.props.month - 1)}
              todayButton="Go to current month"
              selectedDays={this.state.daysArrayText}
              onDayClick={day => this.props.chooseDay(day)}
            />
          </div>
          <div style = {style.weekdisplay}>
            <WeekDisplay
              dates={this.state.weekArrayVals}
            />
          </div>
          <div style = {style.timer}>
            <Timer
              id={this.state.id}
              today={this.state.today}
              time={this.props.time}
            />
          </div>
          <div style = {style.journal}>
            <Journal
              id={this.state.id}
              time={this.state.time}
              updateFlag={this.props.updateFlag}
              selectedDay={this.props.selectedDay}
              mediflectionUpdate={this.props.mediflectionUpdate}
              mediflectionSubmit={this.props.mediflectionSubmit}
              journal={this.state.journal}
            />
          </div>

        </div>
      </div>
    );
  }

}

