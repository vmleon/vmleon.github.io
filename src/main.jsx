import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import World from './World';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <World />
  </StrictMode>
);
