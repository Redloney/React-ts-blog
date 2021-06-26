import { combineReducers } from 'redux'

import userinfo from './userinfo'
import comments from './comments'


export default combineReducers({
  userinfo,
  comments
})