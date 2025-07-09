import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import { useRef } from 'react';
import type { TaskModel } from '../../models/TaskModels';
import { useTaskContext } from '../../contexts/TaskContext';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';
import { Tips } from '../Tips';
import { getNextCycle } from '../../utils/getNextCycle';
import { showMessage } from '../../adapters/showMessage';

export function MainForm() {
  const { state, dispatch } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);
  const lastTaskName = state.tasks[state.tasks.length - 1]?.name || '';

  const nextCycle = getNextCycle(state.currentCycle);

  const nextCycleType = getNextCycleType(nextCycle);

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    showMessage.dismiss();
    if (taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim();
    if (!taskName) {
      showMessage.warning('Digite o nome da tarefa');
      return;
    }

    const newTask: TaskModel = {
      id: Math.random().toString(36).substring(2, 9),
      name: taskName,
      completeDate: null,
      interruptDate: null,
      startDate: Date.now(),
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };

    dispatch({
      type: TaskActionTypes.START_TASK,
      payload: newTask,
    });
    showMessage.success('Tarefa iniciada com sucesso!');
  }
  function handleInterruptTask() {
    dispatch({
      type: TaskActionTypes.INTERRUPT_TASK,
      payload: state.activeTask as TaskModel,
    });

    showMessage.success('Tarefa interrompida');
  }

  return (
    <form onSubmit={handleCreateNewTask} action='' className='form'>
      <div className='formRow'>
        <DefaultInput
          id='input'
          type='text'
          labelText='Task'
          placeholder='Digite algo'
          ref={taskNameInput}
          disabled={!!state.activeTask}
          defaultValue={lastTaskName}
        ></DefaultInput>
      </div>

      <div className='formRow'>
        <Tips></Tips>
      </div>
      {state.currentCycle > 0 && (
        <div className='formRow'>
          <Cycles></Cycles>
        </div>
      )}
      <div className='formRow'>
        {!state.activeTask && (
          <DefaultButton
            icon={<PlayCircleIcon />}
            color='green'
            type='submit'
            aria-label='Iniciar tarefa'
            title='Iniciar tarefa'
            key='botao_submit'
          ></DefaultButton>
        )}

        {!!state.activeTask && (
          <DefaultButton
            icon={<StopCircleIcon />}
            color='red'
            type='button'
            aria-label='Parar tarefa'
            title='Parar tarefa'
            key='botao_button'
            onClick={handleInterruptTask}
          ></DefaultButton>
        )}
      </div>
    </form>
  );
}
