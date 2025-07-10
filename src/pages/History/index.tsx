import { TrashIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';
import styles from './styles.module.css';
import { useTaskContext } from '../../contexts/TaskContext';
import { formatDate } from '../../utils/formatDate';

export function History() {
  const {state} = useTaskContext();
  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>Histórico</span>
          <span className={styles.buttonContainer}>
            <DefaultButton
              color='red'
              aria-label='Apagar todo o histórico'
              title='Apagar todo o histórico'
              icon={<TrashIcon></TrashIcon>}
            ></DefaultButton>
          </span>
        </Heading>
      </Container>

      <Container>
        <div className={styles.responsiveTable}>
          <table>
            <thead>
              <tr>
                <th>Tarefa</th>
                <th>Duração</th>
                <th>Data</th>
                <th>Status</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {state.tasks.map(task  => (
                <tr key={task.id}>
                  <td>{task.name}</td>
                  <td>{task.duration}</td>
                  <td>{formatDate(task.startDate)}</td>
                  <td>{task.interruptDate}</td>
                  <td>{task.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </MainTemplate>
  );
}
