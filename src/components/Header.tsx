import { useRef } from 'react';
import Button from '@/components/Button';
import Modal, { ModalRef } from '@/components/Modal';
import { useSessionsContextVals } from '@/contexts/sessions-context';

function formatNavName(name: string): string {
  let nameArr = name.toLowerCase().split(' ');
  return nameArr
    .map((_word) => _word.charAt(0).toUpperCase() + _word.slice(1))
    .join(' ');
}

function Header() {
  const modalRef = useRef<ModalRef>(null);
  const sessionsCtx = useSessionsContextVals();

  const handleButtonClick = () => {
    modalRef.current?.open();
  };

  const handleCloseClick = () => {
    modalRef.current?.close();
  };

  const handleCancelSession = (id: string) => () => {
    sessionsCtx.deleteSession(id);
  };

  const navItems = [
    { children: 'our mission', to: '/', isText: true },
    { children: 'browse sessions', to: '/sessions', isText: true },
    { children: 'upcoming sessions', onClick: handleButtonClick },
  ];

  return (
    <>
      <header id='main-header'>
        <h1>ReactMentoring</h1>
        <nav>
          <ul>
            {navItems.map((_item) => (
              <li key={_item.children}>
                <Button {..._item}>{formatNavName(_item.children)}</Button>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <Modal ref={modalRef}>
        <h3>Upcoming Session</h3>
        {sessionsCtx.bookedSessions.length > 0 && (
          <ul>
            {sessionsCtx.bookedSessions.map((_session) => (
              <li key={_session.id}>
                <div className='upcoming-session'>
                  <div>
                    <h3>{_session.title}</h3>
                    <p>{_session.summary}</p>
                    <time>{_session.date}</time>
                  </div>
                  <div className='actions'>
                    <Button
                      onClick={handleCancelSession(_session.id)}
                      isText={true}
                    >
                      cancel
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className='actions'>
          <Button onClick={handleCloseClick}>Close</Button>
        </div>
      </Modal>
    </>
  );
}

export default Header;
