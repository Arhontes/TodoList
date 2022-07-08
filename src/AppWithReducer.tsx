// import React, {useReducer} from 'react';
// import './App.css';
// import {TodoList} from "./components/TodoList/TodoList";
// import {v1} from "uuid";
// import AddItemForm from "./components/AddItemForm/AddItemForm";
// import {addTodoListAC, todoListsReducer} from "./components/reducers/TodoListsReducer";
// import {addTaskListAC, tasksReducer} from "./components/reducers/TasksReducer";
//
//
// export type TaskType = {
//     id: string, title: string, isDone: boolean
// }
// export type FilterValuesType = "all" | "completed" | "active"
// export type TodolistType = {
//     id: string,
//     title: string
//     filter: FilterValuesType
// }
// export type TasksType = {
//     [key: string]: Array<TaskType>
// }
//
// function App() {
//
//     let todolistID1 = v1();
//     let todolistID2 = v1();
//     let [todoLists, todoListDispatch] = useReducer(todoListsReducer, [
//         {id: todolistID1, title: 'What to learn', filter: 'all'},
//         {id: todolistID2, title: 'What to buy', filter: 'all'},
//     ])
//     let [tasks, tasksDispatch] = useReducer(tasksReducer, {
//         [todolistID1]: [
//             {id: v1(), title: "HTML&CSS", isDone: true},
//             {id: v1(), title: "JS", isDone: true},
//             {id: v1(), title: "ReactJS", isDone: false},
//             {id: v1(), title: "Rest API", isDone: false},
//             {id: v1(), title: "GraphQL", isDone: false},
//         ],
//         [todolistID2]: [
//             {id: v1(), title: "HTML&CSS2", isDone: true},
//             {id: v1(), title: "JS2", isDone: true},
//             {id: v1(), title: "ReactJS2", isDone: false},
//             {id: v1(), title: "Rest API2", isDone: false},
//             {id: v1(), title: "GraphQL2", isDone: false},
//         ]
//     });
//
//     function getTasksByTodoListFilter(todoListID: string, filter: string) {
//         switch (filter) {
//             case "completed":
//                 return tasks[todoListID].filter((t) => t.isDone)
//             case "active":
//                 return tasks[todoListID].filter((t) => !t.isDone)
//             case "all":
//                 return [...tasks[todoListID]]
//             default:
//                 return [...tasks[todoListID]]
//         }
//     }
//
//     const todoListArray = todoLists.length
//         ? todoLists.map(el => {
//
//             let tasksForTodoList = getTasksByTodoListFilter(el.id, el.filter);
//             return <TodoList
//                 todoListDispatch={todoListDispatch}
//                 tasksDispatch={tasksDispatch}
//                 todoListID={el.id}
//                 key={el.id}
//                 filter={el.filter}
//                 title={el.title}
//                 tasks={tasksForTodoList}
//             />
//         })
//
//         : <div>No TodoLists</div>
//
//
//     const newTodoListId = v1()
//
//     function addTodoList(title: string) {
//
//         todoListDispatch(addTodoListAC({id: newTodoListId, title: title, filter: "all"}))
//         tasksDispatch(addTaskListAC({
//                     [newTodoListId]: [
//                         {id: v1(), title: "HTML&CSS2", isDone: true},
//                         {id: v1(), title: "JS2", isDone: true},
//                         {id: v1(), title: "ReactJS2", isDone: false}]
//                 }
//             )
//         )
//     }
//
//     return (
//         <div className="App">
//             {
//                 todoListArray
//             }
//             <AddItemForm callBack={addTodoList}/>
//         </div>
//     );
// }
//
// export default App;
export default {}