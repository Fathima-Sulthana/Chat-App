import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';

const clerkFrontendApi = "pk_test_c2tpbGxlZC1zcXVpcnJlbC00NS5jbGVyay5hY2NvdW50cy5kZXYk"; 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <ClerkProvider publishableKey={clerkFrontendApi}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ClerkProvider>,
  </StrictMode>
);

