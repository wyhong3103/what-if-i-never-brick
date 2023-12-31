import { createSlice } from "@reduxjs/toolkit";

export const appStateSlice = createSlice(
    {
        name : 'appState',
        initialState : {
            loading : false,
            firstTime : true,
            handle : "",
            values : [],
            mode : 1,
            progress : [0,0]
        },
        reducers : {
            setLoading : (state, action) => {
                state.loading = action.payload;
            },
            setFirstTime : (state, action) => {
                state.firstTime = action.payload;
            },
            setHandle : (state, action) => {
                state.handle = action.payload;
            },
            setValues : (state, action) => {
                state.values = action.payload;
            },
            setMode : (state, action)  => {
                state.mode = action.payload;
            },
            setProgress : (state, action)  => {
                state.progress = action.payload;
            }
        }
    }
)

export const {setLoading, setFirstTime, setHandle, setValues, setMode, setProgress} = appStateSlice.actions; 
export default appStateSlice.reducer;