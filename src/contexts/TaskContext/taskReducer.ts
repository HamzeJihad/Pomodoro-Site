import type { TaskStateModel } from '../../models/TaskStateModel';
import { formatSeconsToMinutes } from '../../utils/formatSecondsToMinutes';
import { getNextCycle } from '../../utils/getNextCycle';
import { TaskActionTypes, type TaskActionModel } from './taskActions';

export function taskReducer(state: TaskStateModel, action: TaskActionModel) {
  switch (action.type) {
    case TaskActionTypes.START_TASK: {
      const newTask = action.payload;
      const nextCycle = getNextCycle(state.currentCycle);
      const secondsRemaining = newTask.duration * 60;
      return {
        ...state,
        tasks: [...state.tasks, newTask],
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining: secondsRemaining,
        formattedSecondsRemaining: formatSeconsToMinutes(secondsRemaining),
      };
    }

    case TaskActionTypes.INTERRUPT_TASK: {
      const interruptedTask = action.payload;
      
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: state.tasks.map(task =>
          task.id === interruptedTask.id
            ? { ...task, interruptDate: Date.now() }
            : task,
        ),
        lastActionType: TaskActionTypes.INTERRUPT_TASK,
      };
    }
    case TaskActionTypes.RESET_STATE: {
      return state;
    }

    case TaskActionTypes.COUNT_DOWN: {
      return {
        ...state,
        secondsRemaining: action.payload.secondsRemaining,
        formattedSecondsRemaining: formatSeconsToMinutes(
          action.payload.secondsRemaining,
        ),
      };
    }

    case TaskActionTypes.COMPLETE_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: state.tasks.map(task =>
          state.activeTask && state.activeTask.id === task.id
            ? { ...task, completeDate: Date.now() }
            : task,
        ),
      };
    }

    default:
      return state;
  }
}
