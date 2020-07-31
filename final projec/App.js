import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import volunteersReducer from './src/store/reducers/volunteers';
import commitmentsReducer from './src/store/reducers/commitments';
import authReducer from './src/store/reducers/auth';
import NavigationContainer from './src/navigation/NavigationContainer';
// newwwwww
const rootReducer = combineReducers({
  volunteers: volunteersReducer,
  commitments: commitmentsReducer,
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}
