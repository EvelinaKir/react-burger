import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { AppDispatch, AppThunk, RootState } from './index';
import {Location} from 'history'

export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export type Tlocation = Location & Idata

interface Idata {
  background: { pathname: string | boolean }
}

