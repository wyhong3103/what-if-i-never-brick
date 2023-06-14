import React, { useEffect } from "react";
import "chartjs-adapter-moment";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
);


export const RatingGraph = ({values}) => {
    //dummy data
    values = [
        {
            x: new Date("2020-01-01"),
            y: 100.2
        },
        {
            x: new Date("2020-01-02"),
            y: 102.2
        },
        {
            x: new Date("2020-01-03"),
            y: 105.3
        },
        {
            x: new Date("2020-02-11"),
            y: 104.4
        }
    ];

    const data = {
        datasets: [
            {
            data: values
            }
        ]
    };

    const getMinMax = () => {
        let mn = Infinity;
        let mx = -Infinity;
        for (const i of values){
            mn = Math.min(mn, i.y);
            mx = Math.max(mx, i.y);
        }
        return [mn, mx];
    }

    const getRatingRects = () => {

    }

    const plugins = [{
        beforeDraw: function(chart) {
            const ctx = chart.ctx;
            const chartArea = chart.chartArea;
        
            /*
            ctx.fillStyle = "red";
            ctx.fillRect(chartArea.left, 0,chartArea.right - chartArea.left, 20);
            ctx.fillStyle = "blue";
            ctx.fillRect(chartArea.left, 20,chartArea.right - chartArea.left, 20);
            ctx.fillRect(chartArea.left, chartArea.bottom, chartArea.right - chartArea.left, chartArea.top - chartArea.bottom);
            */
        }
    }];

    const options = {
        response: true,
        scales: {
            x: {
            type: "time",
            time : {
                unit : "month"
            }
            },
            y:{
                min : 0,
                max : 4000
            }
        },
    };

    useEffect(
        () => {
            const [mn, mx] = getMinMax();
            options.scales.y = {min : mn, max : mx};
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [])

    return(
        <div className='chart-container' style={{width : '1000px'}}>
            <Line options={options} data={data} plugins={plugins}/>
        </div>
    )
}
