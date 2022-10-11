import "./App.css";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import probability from "./probability.json";

const data = probability.map((prob) => {
  return {
    name: `${prob.time}:00 - ${
      parseInt(prob.time) + 1 < 10
        ? `0${parseInt(prob.time) + 1}`
        : parseInt(prob.time) + 1
    }:00`,
    probability: prob.probability,
    probabilityLabel: `${prob.probability}%`,
  };
});

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p>{`${label}`}</p>
        <p>{`Probability that it is alert is ${payload[0].value}%`}</p>
      </div>
    );
  }

  return null;
};

function App() {
  return (
    <div className="App">
      <h1>Probability that it is alert</h1>
      <h2>Kyiv</h2>
      <div className="responsiveContainer">
        <ResponsiveContainer>
          <AreaChart
            data={data}
            margin={{
              top: 5,
              right: 70,
              left: 20,
              bottom: 55,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              angle={45}
              interval="preserveStartEnd"
              textAnchor="start"
            />
            <YAxis unit="%" />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              stroke="#8884d8"
              dataKey="probability"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default App;
