import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {AppDispatch, PersistedReducerType} from "../store/store";


// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<PersistedReducerType> = useSelector