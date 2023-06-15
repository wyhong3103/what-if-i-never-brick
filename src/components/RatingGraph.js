import { useState, useEffect, useRef } from "react";
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
    const chart = useRef();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    // return min & max value to be displayed in the rating graph
    const getMinMax = () => {
        let mn = 1000000;
        let mx = -1000000;
        for (const i of values){
            mn = Math.min(mn, i.y);
            mx = Math.max(mx, i.y);
        }
        return [Math.floor(mn/100)*100-100, Math.floor(mx/100)* 100 +100];
    }

    const getTimeUnit = () => {
        const day = Math.floor((values[values.length-1].x.getTime() - values[0].x.getTime()) / (1000 * 60 * 60 * 24));
        
        // if difference of day is within a money, we display by day
        // if its less than 24 month we display by month
        // else in year
        if (day <= 30) return "day";
        else if (day <= 24 * 30) return "month";
        else return "year";
    };

    const [options, setOptions] = useState(
        {
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: "time",
                    time : {
                        unit : getTimeUnit()
                    }
                },
                y:{
                    min : getMinMax()[0],
                    max : getMinMax()[1],
                    grid : {
                        display : false
                    },
                    ticks : {
                        display : (screenWidth >= 1200),
                        // actual stepSize to be displayed would be affected by font size
                        font : {
                            size : 10.5
                        },
                        stepSize : 100,
                        callback : (value) => {
                            const rating = [0, 1200, 1400, 1600, 1900, 2100, 2300, 2400, 2600, 3000];
                            return (rating.includes(value) ? (value) : '');
                        }
                    }
                }
            },
        }
    );
    
    const data = {
        datasets: [
            {
                data: values,
                borderColor: '#555',
                pointBackgroundColor : '#FFF'
            }
        ]
    };



    const getRatingRects = (height) => {
        const [mn, mx] = getMinMax();
        
        const threshold = [
            [-1, '#FFFFFF'],
            [1199, '#cccccc'],
            [1399, '#77ff77'],
            [1599, '#77ddbb'],
            [1899, '#aaaaff'],
            [2099, '#ff88ff'],
            [2299, '#ffcc88'],
            [2399, '#ffbb55'],
            [2599, '#ff7777'],
            [2999, '#ff3333'],
            [Infinity, '#aa0000']
        ];

        // [ {height, color} ]
        const rects = [];
        let sum = 0;
        let prev = mn;
        for (const i of threshold){
            if (mn <= i[0] && i[0] <= mx) {
                rects.push({
                    height : (i[0]-prev+1) / (mx - mn + 1) * height,
                    color : i[1]
                });
                prev = i[0];
                sum += rects[rects.length-1].height;
            }
            else if (mn <= i[0] && mx <= i[0]){
                rects.push({
                    height : height - sum,
                    color : i[1]
                });
                break;
            }
        }

        return rects;
    };

    const plugins = [{
        beforeDraw: function(chart) {
            const ctx = chart.ctx;
            const chartArea = chart.chartArea;
            const rects = getRatingRects(chartArea.bottom - chartArea.top);

            ctx.fillStyle = '#ffffff'
            ctx.fillRect(chartArea.left, 0,chartArea.right - chartArea.left, 10);
            let prev = 10;
            for(let i = rects.length-1; i >= 0; i--){
                ctx.fillStyle = rects[i].color;
                ctx.fillRect(chartArea.left, prev,chartArea.right - chartArea.left, rects[i].height);
                prev += rects[i].height;
            }
        }
    }];
            
    useEffect(() => {
        const temp = {...options};
        temp.scales.y.ticks.display = (screenWidth >= 1200 ? true : false);
        setOptions({...temp});
    }, [screenWidth])

    useEffect(() => {
        window.addEventListener("resize", () => {
            setScreenWidth(window.innerWidth);
        });
        return () => {
            window.removeEventListener("resize", () => {
                setScreenWidth(window.innerWidth);
            })
        }
    }, []);
        
    return(
        <div className='chart-container' style={{"width" : '60%', 'height':(screenWidth >= 1200 ? '500px' : '300px')}}>
            <Line ref={chart} options={options} data={data} plugins={plugins}/>
        </div>
    )
}
