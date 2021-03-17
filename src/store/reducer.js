import * as actionType from "./actionType";

const defaultState = {
  tasks: [],
  addTaskSucces: false,
  deletTasksSucces: false,
  editTasksSucces: false,
  editTaskSucces: false,
  loading: false,
  successMessage: null,
  errorMessage: null,
  task:null
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionType.PENDING:
      return {
        ...state,
        loading: true,
        addTaskSucces: false,
        deletTasksSucces: false,
        editTasksSucces: false,
        editTaskSucces: false,
      };
    case actionType.GET_TASKS:
      return {
        ...state,
        tasks: action.tasks,
        loading: false,
      };
    case actionType.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.task],
        addTaskSucces: true,
        loading: false,
        successMessage: "Task created successfully!!!!",
      };

    case actionType.DELETE_TASK:
      const newTask = state.tasks.filter((task) => task._id !== action.taskId);

      return {
        ...state,
        tasks: newTask,
        loading: false,
        successMessage: "Task deleted successfully!!!!",
      };
    case actionType.DELETE_TASKS:
      const newTasks = state.tasks.filter((task) => {
        if (action.taskIds.has(task._id)) {
          return false;
        }
        return true;
      });

      return {
        ...state,
        tasks: newTasks,
        deletTasksSucces: true,
        loading: false,
        successMessage: "Tasks deleted successfully!!!!",
      };

    case actionType.EDIT_TASK:
   let successMessage="Task edited successfully!!!!"
   if(action.status){
     if(action.status==="done"){
       successMessage="Congrats you have completed the task!!!"
     }else{
      successMessage="The task is active now!!!"
     }
   }

      if(action.from==="single"){
        return { 
          ...state,
          task:action.editedTask,
          editTaskSucces: true,
          loading: false,
          successMessage:successMessage,
        };

      }
      const tasks = [...state.tasks];
      const foundIndex = tasks.findIndex(
        (task) => task._id === action.editedTask._id
      );
      tasks[foundIndex] = action.editedTask;

      return {
        ...state,
        tasks,
        editTasksSucces: true,
        loading: false,
        successMessage: successMessage,
      };
    case actionType.ERROR:
      return {
        ...state,
        errorMessage:action.error,
        loading: false,
      };
      case actionType.GET_TASK:
        return {
          ...state,
          task: action.task,
          loading: false,
        };

    default:
      return {
        ...state,
      };
  }
}
