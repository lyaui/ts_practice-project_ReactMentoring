import { createContext, useContext, type ReactNode } from 'react';
import { type Session } from '@/components/SessionItem';

export interface BookedSession extends Session {
  name: string;
  email: string;
}

interface SessionsContextValues {
  bookedSessions: BookedSession[];
  addSession: (val: BookedSession) => void;
  deleteSession: () => void;
}

interface SessionsProviderProps {
  children: ReactNode;
}

const initialStates: SessionsContextValues = {
  bookedSessions: [],
  addSession: () => {},
  deleteSession: () => {},
};

const SessionsContext = createContext<SessionsContextValues>(initialStates);

const SessionsProvider = ({ children }: SessionsProviderProps) => {
  const value: SessionsContextValues = {
    bookedSessions: [],
    addSession: (val) => {},
    deleteSession: () => {},
  };

  return (
    <SessionsContext.Provider value={value}>
      {children}
    </SessionsContext.Provider>
  );
};

export default SessionsProvider;

export const useSessionsContextVals = () => useContext(SessionsContext);
