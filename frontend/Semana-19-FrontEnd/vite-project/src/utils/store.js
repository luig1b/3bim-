import { configureStore } from '@reduxjs/toolkit'; 
import tarefasReducer from './tarefasSlice'; 

export const store = configureStore({ 
    reducer: { tarefas: tarefasReducer } });