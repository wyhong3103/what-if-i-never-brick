import './styles/App.css';
import { useEffect, useState } from "react";
import { RatingGraph } from "./components/RatingGraph";

export const App = () => {
    const [loading, setLoaing] = useState(false);
    const values = [
        {
            x: new Date("2020-01-01"),
            y: 300
        },
        {
            x: new Date("2020-01-02"),
            y: 1002
        },
        {
            x: new Date("2020-01-03"),
            y: 1505
        },
        {
            x: new Date("2020-01-11"),
            y: 1904
        },
        {
            x: new Date("2025-02-11"),
            y: 1904
        },
        {
            x: new Date("2026-02-11"),
            y: 3005
        },
    ];

    return(
        <>
            <div class="result-container">
                {
                    loading === false ?
                    <RatingGraph values={values}/>
                    :
                    //probably react spinner
                    null
                }
            </div>
        </>
    ) 
}