import { Container } from '../../components/Container';
import { DefaultInput } from '../../components/DefaultInput';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';
import '../../styles/global.css';
import { DefaultButton } from '../../components/DefaultButton';
import { SaveAll } from 'lucide-react';
import React from 'react';
import { useTaskContext } from '../../contexts/TaskContext';
import { showMessage } from '../../adapters/showMessage';

export function Settings() {
  const { state } = useTaskContext();
  const workTimeIputRef = React.useRef<HTMLInputElement>(null);
  const shortBreakTimeInputRef = React.useRef<HTMLInputElement>(null);
  const longBreakTimeInputRef = React.useRef<HTMLInputElement>(null);

  function handleSaveSettings(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); 
    showMessage.dismiss();

    const workTime = Number(workTimeIputRef.current?.value);
    const shortBreakTime = Number(shortBreakTimeInputRef.current?.value);
    const longBreakTime = Number(longBreakTimeInputRef.current?.value);

    if(isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime)) {
      showMessage.error('Por favor, insira valores numéricos válidos.');
      return;
    }

    if(!workTime || !shortBreakTime || !longBreakTime) {
      showMessage.error('Por favor, preencha todos os campos.');
      return;
    }

    if(workTime < 1 || shortBreakTime < 1 || longBreakTime < 1 || workTime > 99 || shortBreakTime > 99 || longBreakTime > 99) {
      showMessage.error('Os valores devem estar entre 1 e 99 minutos.');
      return;
    }
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>Configurações</Heading>
      </Container>

      <Container>
        <p style={{ textAlign: 'center' }}>
          Modifique as configurações para tempo de foco, descanso curto e
          desacanso logo
        </p>
      </Container>

      <Container>
        <form onSubmit={handleSaveSettings} action='' className='form'>
          <div className='formRow'>
            <DefaultInput
              id='workTime'
              labelText='Foco'
              ref={workTimeIputRef}
              defaultValue={state.config.workTime.toString()}
            ></DefaultInput>
          </div>
          <div className='formRow'>
            <DefaultInput
              id='shortBreakTime'
              labelText='Descanso curto'
              ref={shortBreakTimeInputRef}
              defaultValue={state.config.shortBreakTime.toString()}
            ></DefaultInput>
          </div>

          <div className='formRow'>
            <DefaultInput
              id='longBreakTime'
              labelText='Descanso Longo'
              ref={longBreakTimeInputRef}
              defaultValue={state.config.longBreakTime.toString()}
            ></DefaultInput>
          </div>

          <div className='formRow'>
            <DefaultButton
              icon={<SaveAll></SaveAll>}
              aria-label='Salvar configurações'
              title='Salvar configurações'
            ></DefaultButton>
          </div>
        </form>
      </Container>
    </MainTemplate>
  );
}
