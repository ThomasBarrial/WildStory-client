import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
// import io from 'socket.io-client';
import Layout from './views/Layout';

// const socket = io('http://localhost:5000');
function App(): JSX.Element {
  const queryClient = new QueryClient();
  // useEffect(() => {
  //   socket.emit('connection', { room: 'toto', user: 'data' });
  // }, []);

  // useEffect(() => {
  //   socket.emit('join', {
  //     roomName:
  //       'f917ab77-7e47-441d-be46-27801a443442_fe896be5-d3b6-404b-b9e5-e92c0b5ffced',
  //     user: { firstname: 'qsd', id: 'kjqhsd' },
  //   });

  //   socket.on('message', (m) => console.log(m));
  // }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="bg-black">
          <Layout />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
