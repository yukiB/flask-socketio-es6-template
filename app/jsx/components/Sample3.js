import React from 'react'
import Chart from './chart/Chart'
import Coffee from './img/Coffee'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

let namespace = '/sample';
let socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port + namespace);
const data = [
  {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
  {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
  {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
  {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
  {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
  {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
  {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

export default class Sample3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{name: 0, data1: 9.697382446695155, data2: 2.3434}],
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
      if (data.length > 500)
        data.shift();
      this.setState({data: data, start: start});
    });
  }

  render () {
    let {data} = this.state;
    let d = data[data.length - 1];
    let dt = Object.keys(d).filter((i) => {return i != "name"}).map((p) => {return {name: p, data: d[p]}});
    return (
      <div className="chart-img">
    	  <BarChart width={600} height={300} data={dt}
                  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
          <XAxis dataKey="name"/>
          <YAxis domain={[0, 20]} />
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Legend />
          <Bar dataKey="data" fill="#8884d8"  isAnimationActive={false}/>
        </BarChart>
      </div>)
  }
}
