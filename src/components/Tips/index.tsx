import { useTaskContext } from '../../contexts/TaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';

export function Tips() {
  const { state } = useTaskContext();
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  const tipsForWhenActiveTask = {
    workTime: <span>Foque por {state.config.workTime} min </span>,
    shortBreakTime: (
      <span>Descanse por {state.config.shortBreakTime} min </span>
    ),
    longBreakTime: <span>Próximo descanso será longo2</span>,
  };

  const tipsForNoActiveTask = {
    workTime: <span>Próximo ciclo é de {state.config.workTime} min </span>,
    shortBreakTime: (
      <span>Próximo descanso é de {state.config.shortBreakTime} min </span>
    ),
    longBreakTime: <span>Próximo descanso será longo1</span>,
  };

  return (
    <>
      {state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
      {!state.activeTask && tipsForNoActiveTask[nextCycleType]}
    </>
  );
}
