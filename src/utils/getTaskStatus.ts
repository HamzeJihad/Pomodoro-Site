import type { TaskModel } from "../models/TaskModels";

export function getTaskStatus(task: TaskModel, activeTask: TaskModel | null): string {
  if (task.interruptDate) {
    return "Interrompida";
  }

  if (task.completeDate) {
    return "Completa";
  }

  if (task.id === activeTask?.id) {
    return "Em andamento";
  }

  return "Abandonada";
}