import { configureStore } from '@reduxjs/toolkit'
import appStateReducer from './reducers/appStateSlice';

export default configureStore({
  reducer: {appState : appStateReducer}
});