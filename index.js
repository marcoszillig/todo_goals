// LIBRARY CODE
function createStore (reducer) {
  // The store should have four parts
  // 1. The state
  // 2. Get the state.
  // 3. Listen to changes on the state.
  // 4. Update the state

  let state
  let listeners = []

  const getState = () => state

  const subscribe = (listener) => {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  }

  const dispatch = () => {
    state = reducer(state, action)
    listeners.forEach((listener) => listener())
  }

  return {
    getState,
    subscribe,
    dispatch
  }
}

// APP CODE
const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOALS = 'ADD_GOALS'
const REMOVE_GOAL = 'REMOVE_GOAL'

function addTodoAction (todo) {
  return {
    type: ADD_TODO,
    todo,
  }
}

function removeTodoAction (id) {
  return {
    type: REMOVE_TODO,
    id,
  }
}

function toggleTodoAction (id) {
  return {
    type: TOGGLE_TODO,
    complete,
  }
}

function addGoalAction (goal) {
  return {
    type: ADD_GOALS,
    goal,
  }
}

function removeGoalAction (id) {
  return {
    type: REMOVE_GOAL,
    id,
  }
}

function todos (state = [], action) {
  switch(action.type) {
    case ADD_TODO: 
      return state.concat([action.todo])      
    case REMOVE_TODO: 
      return state.filter((todo) => todo.id !== todo.action)
    case TOGGLE_TODO: 
      return state.map((todo) => todo.id !== action.id ? todo : 
        Object.assign({}, todo, { complete: !todo.complete}))
    default : 
      return state

  }
}

function goals (state = [], action) {
  switch(action.type) {
    case ADD_GOALS :
      return state.concat([action.goal])
    case REMOVE_GOAL :
      return state.filter((goal) => goal.id !== goal.action)
    default :
      return state
  }
}

function app (state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action), 
  }
}

const store = createStore(app)

store.subscribe(() => {
  console.log('The new state is: ', store.getState())
})

store.dispatch(addTodoAction({
  id: 0,
  name: 'Learn Redux',
  complete: false
}))


store.dispatch(addTodoAction({
  id: 1,
  name: 'Walk the dog',
  complete: false
}))

store.dispatch(removeTodoAction(1))

store.dispatch(toggleTodoAction(0))

store.dispatch(addGoalAction({
  id: 0,
  name: 'Loose some weigth'
}))

store.dispatch(addGoalAction({
  id: 1,
  name: 'Exercise'
}))

store.dispatch(removeGoalAction(0))