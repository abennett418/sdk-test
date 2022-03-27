// @ts-check
import React, { useMemo, useContext, useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import { init, Session } from '@decisively-io/interview-sdk';

const host = "https://d3wgmmamgynplx6j2odgsv3aj4.apigateway.ap-sydney-1.oci.customer-oci.com";
const env = 'test';
const project = '715417E434AE41DF98AA76508152C7BE';
/**
 * @type React.Context<Session>
 */
const SessionContext = React.createContext(null);

const sessionProvider = init(host, env);

const InterviewSession = () => {
  const session = useContext(SessionContext);

  return (
    <div>
      {session
      ? (
        <div>
          <h3>{session.id}</h3>
          {JSON.stringify(session, null, 2)}
        </div>
      ) : "No session"
      }
    </div>
  )
};

function App() {
  const [state, setState] = useState(null);
  
  const createSession = async () => {
    try {
      const res = await sessionProvider.load(project, '3');
      setState(res);
    } catch (err) {
      console.log('load failed', err);
    }
  };

  return (
    <SessionContext.Provider value={state}>
      <div className="App">
        <button onClick={createSession}>load</button>
        <InterviewSession/>
      </div>
    </SessionContext.Provider>
  );
}

export default App;
