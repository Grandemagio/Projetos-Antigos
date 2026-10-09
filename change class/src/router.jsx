import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './pages/app/App.js';
import Contato from './pages/contato/index.jsx';
import Contador from './pages/contador/index.jsx';
import Formulario from './pages/formulario';
import NaoEncontrado from './pages/naoencontrado/index.jsx';
import Ale from './pages/ale/index.jsx';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/contador" element={<Contador />} />
        <Route path="/ale" element={<Ale />} />
        <Route path="/formulario" element={<Formulario />} />
        <Route path="*" element={<NaoEncontrado />} />
      </Routes>
    </BrowserRouter>
  );
}