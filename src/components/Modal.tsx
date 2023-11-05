import { forwardRef, useRef, useImperativeHandle, type ReactNode } from 'react';
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
  const modalRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      open() {
        modalRef.current?.showModal();
      },
      close() {
        if (onClose) {
          onClose();
        }
        modalRef.current?.close();
      },
    }),
    [],
  );

  const element = window.document.getElementById('modal-root') as HTMLElement;

  return createPortal(
    <dialog ref={modalRef} className='modal' open={modalRef.current?.open}>
      {children}
    </dialog>,
    element,
  );
});

export default Modal;
