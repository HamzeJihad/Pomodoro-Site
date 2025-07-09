import React from 'react';
import { TaskContext } from './TaskContext';

export function useTaskContext() {
  const context = React.useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskContextProvider');
  }
  return context;
}
