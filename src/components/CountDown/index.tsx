import styles from './styles.module.css';
import {  useTaskContext } from '../../contexts/TaskContext';

export function CountDown() {
  const {state} = useTaskContext();
  return <div className={styles.countDown}>{state.formattedSecondsRemaining}</div>;
}
