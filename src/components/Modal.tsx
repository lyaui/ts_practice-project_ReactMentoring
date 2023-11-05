import {
  useState,
  forwardRef,
  useImperativeHandle,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  title?: string;
  children: ReactNode;
  actions?: ReactNode;
  onClose?: () => void;
}

export interface ModalRef {
  open: () => void;
  close: () => void;
}

const Modal = forwardRef<ModalRef, ModalProps>(
  ({ title, children, onClose, actions }, ref) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useImperativeHandle(
      ref,
      () => ({
        open() {
          setIsModalOpen(true);
        },
        close() {
          if (onClose) {
            onClose();
          }
          setIsModalOpen(false);
        },
      }),
      [],
    );

    const element = window.document.getElementById('modal-root') as HTMLElement;

    return createPortal(
      <dialog className='modal' open={isModalOpen}>
        {title && <h3>{title}</h3>}
        <p>{children}</p>
        {actions && <div className='actions'>{actions}</div>}
      </dialog>,
      element,
    );
  },
);

export default Modal;
