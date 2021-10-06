import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from '../../index';

import { TWSActions } from '../actions/webSocket';
import { TIndexActions } from '../actions/index';
import { TAuthActions } from '../actions/auth'

export type TApplicationActions = TWSActions & TIndexActions & TAuthActions

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;

