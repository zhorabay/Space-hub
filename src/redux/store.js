import { configureStore } from '@reduxjs/toolkit';
import missionsReducer from './Missions/missions';
import rocketsReducer from './rockets/rockets';

const store = configureStore({
  reducer: {
    rockets: rocketsReducer,
    missions: missionsReducer,
  },
});

export default store;
