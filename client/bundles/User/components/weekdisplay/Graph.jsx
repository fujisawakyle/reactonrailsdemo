import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2'

defaults.global.defaultFontFamily = "Bungee Hairline, cursive"
//make API call to update data.
//look for the keys that are the date and then retrieve
//data for the week. if there's no stored date, the
//time will default to 0

const style = {
    graph : {
        height: '12em'
    }
}

let daysArray = [];
let today = new Date().getDay();
const offset = 6 - today;
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
for (let i=0; i < days.length; i++){
    days.unshift(days.pop());
}



export default class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
        days: [],
        chartData: {
            labels: [
                days[0],days[1],days[2],days[3],days[4],days[5],days[6]
            ],
            datasets: [
                {
                    label: 'minutes',
                    data: this.props.weekArrayVals,
                    backgroundColor: 'rgba(74, 144, 226, 0.68)',

                }
            ]
        },
        options: {
            legend: {
                labels: {
                    fontColor: "white",
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: "white",
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: "white",
                    }
                }]
            }
        }
    };

  }

  render() {
    let chartData;
    if (this.props.today) {
        chartData = (
            <div style={style.graph}>
                <Bar
                    redraw ={true}
                    data = {this.state.chartData}
                    options = {this.state.options}
                    width = {300}
                    height = {150} />
            </div>
        )
    }
    else {
        chartData = (
            <div style={style.graph}>
                <Bar
                    data = {this.state.chartData}
                    options = {this.state.options}
                    width = {300}
                    height = {150} />
            </div>
        )
    }
    return (
        <div>
            {chartData}
        </div>
    );
  }

}
