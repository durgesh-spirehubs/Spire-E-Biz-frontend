// third-party
import { combineReducers } from 'redux';

// project imports
// import menuReducer from './slices/menu';
import listingReducer from './reducer/listing';
// import validationReducer from './reducer/validation';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    // menu: menuReducer,
    listing: listingReducer,
    // validation: validationReducer
});

export default reducer;
