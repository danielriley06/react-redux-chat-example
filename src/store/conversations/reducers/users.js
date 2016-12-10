import { LOAD_USERS, LOAD_USERS_SUCCESS} from '../constants/ActionTypes'

const initialState = {
  loaded: false,
  data: []
}

export default function channels(state = initialState, action) {
  switch (action.type) {
    case LOAD_USERS:
      return {...state,
        loading: true
      };
    case LOAD_USERS_SUCCESS:
      return {...state,
        loading: false,
        loaded: true,
        data: [...state.data, ...action.json]
      };
    default:
      return state;
    }
}
