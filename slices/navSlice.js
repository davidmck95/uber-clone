import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    origin: null,
    destination: null,
    travelTimeInformation: null,
    home: '6 Dee Street, Belfast, BT1 7HU',
    work: '37 Queen Street, Belfast, BT3 1JU'
};

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        setOrigin: (state, action) => {
            state.origin = action.payload;
        },
        setDestination: (state, action) => {
            state.destination = action.payload;
        },
        setTravelTimeInformation: (state, action) => {
            state.travelTimeInformation = action.payload;
        },
        setHomeAddress: (state, action) => {
            state.home = action.payload;
        },
        setWorkAddress: (state, action) => {
            state.work = action.payload;
        },
    },
});


export const { setOrigin, setDestination, setTravelTimeInformation } = navSlice.actions;

export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation;
export const selectHomeAddress = (state) => state.nav.home;
export const selectWorkAddress = (state) => state.nav.work;

export default navSlice.reducer;
