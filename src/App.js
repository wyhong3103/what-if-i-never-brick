import './styles/App.css';
import { HashLoader } from 'react-spinners';
import { RatingGraph } from "./components/RatingGraph";
import { SearchBar } from './components/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setValues } from './reducers/appStateSlice';
import { useEffect, useState } from 'react';
import { apiHandler } from './util/apiHandler';
import { getOptimalSlow } from './util/getOptimalSlow';
import { getOptimalFast } from './util/getOptimalFast';

export const App = () => {
    const [msg, setMsg] = useState('Enter your handle to start the journey');
    const [resultHandle, setResultHandle] = useState("");
    const firstTime = useSelector(state => state.appState.firstTime);
    const loading = useSelector(state => state.appState.loading);
    const handle = useSelector(state => state.appState.handle);
    const values = useSelector(state => state.appState.values);
    const mode = useSelector(state => state.appState.mode);
    const dispatch = useDispatch();

    const convertSecondsToDate = (values) => {
        const temp = [];
        for(let i = 0; i < values.length; i++){
            temp.push({x : new Date(values[i].x * 1000), y : values[i].y, });
        }
        return temp;
    };

    useEffect(
        () => {
            (async () => {
                if (loading){
                    dispatch(setValues({}));

                    const tempHandle = handle;

                    const apiOK = await apiHandler.apiOK();
                    if (!apiOK){
                        setMsg("Codeforces API is currently down.");
                        dispatch(setLoading(false))
                        return;
                    }

                    const userExist = await apiHandler.userExist(tempHandle);
                    if (!userExist){
                        setMsg("User handle not found.");
                        dispatch(setLoading(false))
                        return;
                    }

                    const contestList = await apiHandler.getContestList(tempHandle);
                    if (contestList.length === 0){
                        setMsg("User has not done any contest.");
                        dispatch(setLoading(false))
                        return;
                    }

                    const optimalData = await (mode === 0 ? getOptimalSlow(tempHandle) : getOptimalFast(tempHandle));

                    const tempValues = [];

                    for(const i of optimalData) {
                        tempValues.push({x : i[2], y : i[0]});
                    }

                    setResultHandle(tempHandle);
                    dispatch(setValues(tempValues));
                    dispatch(setLoading(false))
                }
            })()
        }
    ,[loading])

    return(
        <div className='main'>
            <SearchBar/>
            <div className="result-container">
                {
                    firstTime === false && loading === false ?
                    (
                        Object.keys(values).length === 0 && values.constructor === Object ? 
                        <p className='message-box'>
                           {msg}
                        </p>
                        :
                        <>
                            <h1 className='title'>
                                WHAT IF {resultHandle} NEVER BRICK?
                            </h1>
                            <RatingGraph values={convertSecondsToDate(values)}/>
                        </>
                    )
                    :
                    (
                        loading === true ?
                        <HashLoader/>
                        :
                        <p className='message-box'>
                           {msg}
                        </p>
                    )
                }
            </div>
        </div>
    ) 
}