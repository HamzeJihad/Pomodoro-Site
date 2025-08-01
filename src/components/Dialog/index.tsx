import { DefaultButton } from '../DefaultButton';
import { ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';

import styles from './style.module.css';
import type { ToastContentProps } from 'react-toastify';

export function Dialog({ closeToast, data }: ToastContentProps<string>) {
  return (
    <>
      <div className={styles.container}>
        <p>{data}</p>

        <div className={styles.buttonsContainer}>
          <DefaultButton
            style={{ flex: 1, width: 'auto' }}
            onClick={() => closeToast(true)}
            icon={<ThumbsUpIcon />}
            aria-label='Confirmar ação e fechar'
            title='Confirmar ação e fechar'
          />
          <DefaultButton
            style={{ flex: 1, width: 'auto' }}
            onClick={() => closeToast(false)}
            icon={<ThumbsDownIcon />}
            color='red'
            aria-label='Cancelar ação e fechar'
            title='Cancelar ação e fechar'
          />
        </div>
      </div>
    </>
  );
}
