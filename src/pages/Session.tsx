import { useRef, type FormEvent } from 'react';
import { useParams } from 'react-router-dom';

import { SESSIONS } from '../dummy-sessions.ts';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Modal, { type ModalRef } from '@/components/Modal';
import {
  useSessionsContextVals,
  type Session,
} from '@/contexts/sessions-context';

export default function SessionPage() {
  const modalRef = useRef<ModalRef>(null);
  const params = useParams<{ id: string }>();
  const sessionId = params.id;

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const sessionsCtx = useSessionsContextVals();

  const loadedSession: Session | undefined = SESSIONS.find(
    (session) => session.id === sessionId,
  );

  const handleOpenClick = () => {
    modalRef.current?.open();
  };

  const handleCloseClick = () => {
    modalRef.current?.close();
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!loadedSession) return;
    if (!nameRef.current || !emailRef.current) return;

    const name = nameRef.current.value || '';
    const email = emailRef.current.value || '';

    sessionsCtx.addSession({ name, email, ...loadedSession });

    nameRef.current.value = '';
    emailRef.current.value = '';

    modalRef.current?.close();
  };

  if (!loadedSession) {
    return (
      <main id='session-page'>
        <p>No session found!</p>
      </main>
    );
  }

  return (
    <>
      <main id='session-page'>
        <article>
          <header>
            <img src={loadedSession.image} alt={loadedSession.title} />
            <div>
              <h2>{loadedSession.title}</h2>
              <time dateTime={new Date(loadedSession.date).toISOString()}>
                {new Date(loadedSession.date).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </time>
              <p>
                <Button onClick={handleOpenClick}>Book Session</Button>
              </p>
            </div>
          </header>
          <p id='content'>{loadedSession.description}</p>
        </article>
      </main>
      <Modal ref={modalRef}>
        <form onSubmit={handleFormSubmit}>
          <h3>Book Session</h3>
          <Input label='your name' id='name' ref={nameRef} />
          <Input label='your email' id='email' type='email' ref={emailRef} />
          <div className='actions'>
            <Button onClick={handleCloseClick} isText={true}>
              Cancel
            </Button>
            <Button type='submit'>Book Session</Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
