import type { TaskModel } from "../models/TaskModels";

export function getNextCycleType(currentCycle: number):TaskModel['type'] {
  if(currentCycle > 0 &&  currentCycle  % 8 === 0) return 'longBreakTime';
  else if(currentCycle > 0 && currentCycle % 2 === 0) return 'shortBreakTime';
  else return 'workTime';
}