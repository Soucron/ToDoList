import {
  DeleteTaskArgType,
  TaskPriorities,
  TaskStatuses,
  TaskType,
  todolistsAPI,
  UpdateTaskArgType,
  UpdateTaskModelType
} from "api/todolists-api";
import { AppThunk } from "app/store";
import {  handleServerNetworkError } from "utils/error-utils";
import { appActions } from "app/app.reducer";
import { todolistsActions, todolistsThunks } from "features/TodolistsList/todolists.reducer";
import {  createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clearTasksAndTodolists } from "common/actions/common.actions";
import { createAppAsyncThunk } from "../../utils/create-app-async-thunk";

const initialState: TasksStateType = {};

const slice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(tasksThunks.fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks;
      })
      .addCase(tasksThunks.addTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.task.todoListId];
        tasks.unshift(action.payload.task);
      })
      .addCase(tasksThunks.updateTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId];
        const index = tasks.findIndex((t) => t.id === action.payload.taskId);
        if (index !== -1) {
          tasks[index] = { ...tasks[index], ...action.payload.domainModel };
        }
      })
      .addCase(tasksThunks.removeTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId];
        const index = tasks.findIndex((t) => t.id === action.payload.taskId);
        if (index !== -1) tasks.splice(index, 1);
      })
      .addCase(todolistsThunks.fetchTodolists.fulfilled, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state[tl.id] = []
        })
      })
      .addCase(todolistsThunks.removeTodolist.fulfilled, (state,action) => {
        delete state[action.payload.id];
      })
      .addCase(todolistsThunks.addTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(clearTasksAndTodolists, () => {
        return {};
      });
  },
});

// thunks

const fetchTasks = createAppAsyncThunk<{tasks: TaskType[], todolistId: string}, string>(
  "tasks/fetchTasks", async (todolistId, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      const res = await todolistsAPI.getTasks(todolistId)
      const tasks = res.data.items;
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return({tasks, todolistId})
    } catch (e) {
      handleServerNetworkError(e, dispatch)
      return rejectWithValue(null)
    }
  });

const addTask = createAppAsyncThunk<{ task: TaskType }, {todolistId: string, title: string}>("tasks/addTask", async ({ todolistId, title }, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    const res = await todolistsAPI.createTask(todolistId, title);
    if (res.data.resultCode === 0) {
      const task = res.data.data.item;
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return { task };
    } else {
      handleServerNetworkError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (e) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  }
});

const updateTask = createAppAsyncThunk<UpdateTaskArgType, UpdateTaskArgType>(
  'tasks/updateTask', async ({todolistId, taskId, domainModel}, thunkApi) => {
    const {dispatch, rejectWithValue, getState} = thunkApi
    try {
      const state = getState();
      const task = state.tasks[todolistId].find((t) => t.id === taskId);
      if (!task) {
        dispatch(appActions.setAppError({error: 'Task not found'}))
        return rejectWithValue(null)
      }

      const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...domainModel,
      };

     const res = await todolistsAPI.updateTask(todolistId, taskId, apiModel)

          if (res.data.resultCode === 0) {
          return {todolistId, taskId, domainModel}
          } else {
            handleServerNetworkError(res.data, dispatch);
            return rejectWithValue(null);
          }
    } catch (e) {
      handleServerNetworkError(e, dispatch);
      return rejectWithValue(null);
    }
  }

)

const removeTask = createAppAsyncThunk<DeleteTaskArgType,DeleteTaskArgType>(
  'tasks/removeTask', async ({todolistId, taskId}, thunkApi) => {
    const {dispatch, rejectWithValue} = thunkApi
    try {
    const res = await todolistsAPI.deleteTask(todolistId, taskId)
      if (res.data.resultCode === 0) {
        return {taskId, todolistId}
      } else {
        handleServerNetworkError(res.data, dispatch);
        return rejectWithValue(null);
      }

    } catch (e) {
      handleServerNetworkError(e, dispatch);
      return rejectWithValue(null);
    }
  }
)






// types
export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};
export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;

export const tasksThunks = { fetchTasks, addTask, updateTask, removeTask };
