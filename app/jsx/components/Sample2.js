import React from 'react'
import Chart from './chart/Chart'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

let namespace = '/sample';
let socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port + namespace);

export default class Sample2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [...Array(30).keys()].map((d)=> {return {name: 0, data1: 9.697382446695155, data2: 2.3434}}),
            start: null
        };
    }
    
    componentWillMount() {
        socket.on('my_response', (msg) => {
          let {data, start} = this.state;
          let d = msg.data;
          if (start == null && d.length > 0) {
            start = d[0].time;
          }
          for (let i = 0; i < d.length; i++)
            data.push({name: d[i].time - start, data1: d[i].data1, data2: d[i].data2});
          while (data[data.length - 1].name - data[0].name > 30)                  
            data.shift();
          this.setState({data: data, start: start});
        });
    }
    render () {
         let {data} = this.state;
        return (
                <div className="chart-img">
                <Chart data={data} />
                <div>{data[data.length - 1].sindata}</div>
                </div>)
    }
}
