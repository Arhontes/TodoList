import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../components/reducers/TasksReducer";
import {todoListsReducer} from "../components/reducers/TodoListsReducer";

const rootReducer = combineReducers({
    tasks:tasksReducer,
    todolist:todoListsReducer,
})

export const store = legacy_createStore(rootReducer)
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store