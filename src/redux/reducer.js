import { combineReducers } from 'redux';

// ## Generator Reducer Imports
import app from '../modules/AppState';

import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import errorReducer from './reducers/errorReducer';
import notificationReducer from './reducers/notificationReducer';
import fuelReducer from './reducers/fuelReducer';
import lmsReducer from './reducers/lmsReducer';
import temperatureReducer from './reducers/temperatureReducer';
import coldChainReducer from './reducers/coldChainReducer';
import emReducer from './reducers/energyReducer';
import tankReducer from './reducers/tankReducer';
import envReducer from './reducers/envReducer';
import tubewellReducer from './reducers/tubewellReducer';
import streetLightReducer from './reducers/streetLightReducer';
import humidityTemperatureReducer from './reducers/humidityReducer';
import securityReducer from './reducers/securityReducer';
import rectifierReducer from './reducers/rectifierReducer';
import geyserReducer from './reducers/geyserReducer';
import hybridgeyserReducer from './reducers/hybridgeyserReducer';
import tempReducer from './reducers/tempReducer';
import gasReducer from './reducers/gasReducer';

export default combineReducers({
  // ## Generator Reducers
  app,
  auth: authReducer,
  user: userReducer,
  error: errorReducer,
  notification: notificationReducer,
  fuel: fuelReducer,
  lms: lmsReducer,
  temperature: temperatureReducer,
  coldchain: coldChainReducer,
  energy: emReducer,
  tank: tankReducer,
  env: envReducer,
  tubewell : tubewellReducer,
  light:streetLightReducer,
  humidity:humidityTemperatureReducer,
  security:securityReducer,
  rectifier:rectifierReducer,
  geyser:geyserReducer,
  hybridgeyser:hybridgeyserReducer,
  Temperature:tempReducer,
  gas:gasReducer
});
