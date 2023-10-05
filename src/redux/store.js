import { configureStore } from '@reduxjs/toolkit';
import missionsReducer from './Missions/missions';
import rocketsReducer from './rockets/rockets';

const store = configureStore({
  reducer: {
    missions: missionsReducer,
    rockets: rocketsReducer,
  },
});

export default store;
