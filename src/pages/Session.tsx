import { useRef } from 'react';
import { useParams } from 'react-router-dom';

import { SESSIONS } from '../dummy-sessions.ts';
import Button from '@/components/Button';
import Modal, { type ModalRef } from '@/components/Modal';

export default function SessionPage() {
  const modalRef = useRef<ModalRef>(null);
  const params = useParams<{ id: string }>();

  const sessionId = params.id;
  const loadedSession = SESSIONS.find((session) => session.id === sessionId);

  const handleOpenClick = () => {
    modalRef.current?.open();
  };

  const handleCloseClick = () => {
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
      <Modal
        ref={modalRef}
        title='Book Session'
        actions={
          <>
            <Button onClick={handleCloseClick} isText={true}>
              Cancel
            </Button>
            <Button onClick={handleCloseClick}>Book Session</Button>
          </>
        }
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, dolorem
        maiores ut non expedita consequatur reiciendis, soluta officiis omnis
        veniam neque maxime consequuntur architecto nam nostrum. Expedita
        dignissimos tempore temporibus.
      </Modal>
    </>
  );
}
