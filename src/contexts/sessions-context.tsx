import { createContext, useContext, useReducer, type ReactNode } from 'react';
import { type Session } from '@/components/SessionItem';

export interface BookedSession extends Session {
  name: string;
  email: string;
}

interface SessionsContextValues {
  bookedSessions: BookedSession[];
  addSession: (val: BookedSession) => void;
  deleteSession: (id: string) => void;
}

interface SessionsProviderProps {
  children: ReactNode;
}

interface AddSessionAction {
  type: 'ADD_SESSION';
  payload: BookedSession;
}

interface deleteSessionAction {
  type: 'DELETE_SESSION';
  id: string;
}

type Action = AddSessionAction | deleteSessionAction;

const sessionsReducer = (state: BookedSession[], action: Action) => {
  if (action.type === 'ADD_SESSION') {
    const { payload } = action;
    const sessionIdx = state.findIndex(
      (_session) => _session.id === payload.id,
    );

    if (sessionIdx > -1) {
      return state;
    }

    return [...state, payload];
  }

  if (action.type === 'DELETE_SESSION') {
    const { id } = action;
    const sessionIdx = state.findIndex((_session) => _session.id === id);

    if (sessionIdx > -1) {
      return state.splice(sessionIdx, 1);
    }

    return state;
  }
  return state;
};

const initialStates: SessionsContextValues = {
  bookedSessions: [],
  addSession: () => {},
  deleteSession: () => {},
};

const SessionsContext = createContext<SessionsContextValues>(initialStates);

const SessionsProvider = ({ children }: SessionsProviderProps) => {
  const [bookedSessions, dispatch] = useReducer(
    sessionsReducer,
    initialStates.bookedSessions,
  );
  const value: SessionsContextValues = {
    bookedSessions: bookedSessions,
    addSession: (val) => {
      dispatch({ type: 'ADD_SESSION', payload: val });
    },
    deleteSession: (id) => {
      dispatch({ type: 'DELETE_SESSION', id });
    },
  };

  return (
    <SessionsContext.Provider value={value}>
      {children}
    </SessionsContext.Provider>
  );
};

export default SessionsProvider;

export const useSessionsContextVals = () => useContext(SessionsContext);
