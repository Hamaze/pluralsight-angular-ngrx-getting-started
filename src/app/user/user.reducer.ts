import { User } from './user';
import * as fromRoot from '../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserActionTypes, UserActions } from './user.actions';

export interface State extends fromRoot.State {
  users: UserState;
}

export interface UserState {
  maskUserName: boolean;
}

const initialState: UserState = {
  maskUserName: false
};

const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getMaskUserName = createSelector(getUserFeatureState,
  state => state.maskUserName
);

export function reducer(state = initialState, action: UserActions): UserState {
  switch (action.type) {
    case UserActionTypes.MaskUserName:
      console.log('existing state: ' + JSON.stringify(state));
      console.log('payload: ' + action.payload);
      return {
        ...state,
        maskUserName: action.payload
      };
    default:
      return state;
  }
}

