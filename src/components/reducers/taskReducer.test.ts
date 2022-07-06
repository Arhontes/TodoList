import {v1} from "uuid";
import {
    addTaskAC,
    changeTaskStatusAC,
    editTaskTitleAC,
    removeTaskAC,
    removeTasksListAC,
    tasksReducer
} from "./TasksReducer";
import {TasksType, TaskType} from "../../App";
import {removeTodoListAC} from "./TodoListsReducer";

let todolistID1 = v1();
let todolistID2 = v1();

let tasks:TasksType;
beforeEach(() => {
    tasks = {
        [todolistID1]: [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "ReactJS", isDone: false},
            {id: "4", title: "Rest API", isDone: false},
            {id: '5', title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: "1", title: "HTML&CSS2", isDone: true},
            {id: "2", title: "JS2", isDone: true},
            {id: "3", title: "ReactJS2", isDone: false},
            {id: "4", title: "Rest API2", isDone: false},
            {id: '5', title: "GraphQL2", isDone: false},
        ]
    }
})
test("first reducer", () => {
    tasksReducer(tasks, removeTaskAC(todolistID1, "2"))
})

test('correct task should be added to correct array', () => {
    const startState: TasksType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = addTaskAC('todolistId2','juice')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juice')
    expect(endState['todolistId2'][0].isDone).toBe(false)
})
test('status of specified task should be changed', () => {
    const startState: TasksType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = changeTaskStatusAC('todolistId2','2', false)

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].isDone).toBe(false)
    expect(endState['todolistId2'].length).toBe(3)
})
test('title of specified task should be changed', () => {
    const startState: TasksType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = editTaskTitleAC('todolistId2','2', "newTitle")

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe("newTitle")
    expect(endState['todolistId2'].length).toBe(3)
})
test('property with todolistId should be deleted', () => {
    const startState: TasksType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = removeTasksListAC('todolistId2')

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})