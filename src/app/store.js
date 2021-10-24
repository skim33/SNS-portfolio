import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import throttle from 'lodash/throttle'


const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if(serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    
  }
};

const persistedState = loadState();

const store = configureStore({
  persistedState,
  reducer: {
    user: userReducer
  },
});

store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000));

export { store }