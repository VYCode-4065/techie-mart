import { configureStore } from '@reduxjs/toolkit'

export const techieStore = () => {
  return configureStore({
    reducer: {
        
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof techieStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']