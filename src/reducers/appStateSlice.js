import { createSlice } from "@reduxjs/toolkit";

export const appStateSlice = createSlice(
    {
        name : 'appState',
        initialState : {
            loading : false,
            firstTime : true,
            handle : "",
            values : []
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
                console.log(state);
                state.values = action.payload;
            }
        }
    }
)

export const {setLoading, setFirstTime, setHandle} = appStateSlice.actions; 
export default appStateSlice.reducer;