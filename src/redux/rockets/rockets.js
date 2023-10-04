import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRockets = createAsyncThunk(
  'rockets/fetchRockets',
  async () => {
    const req = axios.get('https://api.spacexdata.com/v4/rockets');
    const { data } = await req;
    const result = [];
    data.forEach((rocket) => {
      result.push({
        name: rocket.name,
        description: rocket.description,
        id: rocket.id,
        img: rocket.flickr_images,
        reserved: false,
      });
    });
    return result;
  },
);

const initialState = {
  rockets: [],
  pending: false,
  error: false,
};

const rocketsSlice = createSlice({
  name: 'rockets',
  initialState,
  reducers: {
    handleRocket: (state, { payload }) => {
      const rockets = [];
      state.rockets.forEach((rocket) => {
        if (rocket.id === payload) {
          rockets.push({
            ...rocket,
            reserved: !rocket.reserved,
          });
        } else {
          rockets.push({ ...rocket });
        }
      });
      return {
        ...state,
        rockets,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRockets.fulfilled, (state, { payload }) => ({
      ...state,
      rockets: payload,
      pending: false,
      error: false,
    }));
    builder.addCase(fetchRockets.pending, (state) => ({
      ...state,
      pending: true,
      error: false,
    }));

    builder.addCase(fetchRockets.rejected, (state) => ({
      ...state,
      pending: false,
      error: true,
    }));
  },
});

export default rocketsSlice.reducer;
export const { handleRocket } = rocketsSlice.actions;
