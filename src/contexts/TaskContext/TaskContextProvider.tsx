import React, { useEffect, useReducer, useRef } from 'react';
import { TaskContext } from './TaskContext';
import { initialTaskState } from './initialTaskState';
import { taskReducer } from './taskReducer';
import { TimeWorkerManager } from '../../workers/TimerWorkerManager';
import { TaskActionTypes } from './taskActions';
import { loadBeep } from '../../utils/loadBeep';

export function TaskContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);

  let playBeepRef = useRef<() => void | null>(null);

  const worker = TimeWorkerManager.getInstance();

  worker.onmessage(e => {
    const secondsRemaining = e.data;

    
    if (secondsRemaining <= 0) {
      playBeepRef.current?.();
      playBeepRef.current = null;

      dispatch({ type: TaskActionTypes.COMPLETE_TASK });
      worker.terminate();
    } else {
      dispatch({
        type: TaskActionTypes.COUNT_DOWN,
        payload: { secondsRemaining },
      });
    }
  });
123
  useEffect(() => {
    if (!state.activeTask) {
      worker.terminate();
    }

    document.title = `${state.activeTask ? state.activeTask.name : 'Chronos Pomodoro'}`;
    worker.postMessage(state);
  }, [worker, state]);


  useEffect(() => {

    if (state.activeTask && playBeepRef.current === null) {
      playBeepRef.current = loadBeep();
    } else {
      playBeepRef.current = null;
    }
  }),
    [state.activeTask];
  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
