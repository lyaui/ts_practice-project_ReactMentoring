import {
  useState,
  forwardRef,
  useImperativeHandle,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: ReactNode;

  onClose?: () => void;
}

export interface ModalRef {
  open: () => void;
  close: () => void;
}

const Modal = forwardRef<ModalRef, ModalProps>(({ children, onClose }, ref) => {
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
      {children}
    </dialog>,
    element,
  );
});

export default Modal;
