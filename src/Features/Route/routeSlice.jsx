import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	routeName: '',
	isClosed: true,
	isDrawerOpened: false,
};

const routeSlice = createSlice({
	name: 'route',
	initialState,
	reducers: {
		changeRouteName: (state, { payload: name }) => {
			state.routeName = name;
		},
		closePopup: (state, { payload: status}) => {
			state.isClosed = status;
		},
		setIsDrawerOpened: (state, { payload: status}) => {
			state.isDrawerOpened = status;
		}
	},
});

export const { changeRouteName, closePopup, setIsDrawerOpened } = routeSlice.actions;

export default routeSlice.reducer;
