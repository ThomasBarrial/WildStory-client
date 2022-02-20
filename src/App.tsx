import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';

import Layout from './views/Layout';

function App(): JSX.Element {
  const queryClient = new QueryClient();

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
