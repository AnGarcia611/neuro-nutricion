import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './components/Index';
import Inicio from './components/Inicio';
import NeuroNutricion from './components/NeuroNutricion';
import TestEmocional from './components/TestEmocional';
import Psicobioticos from './components/Psicobioticos';
import Contactanos from './components/Contactanos';
import './App.css';
import './styles/footer.css';
import './styles/sound-toggle.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/neuro-nutricion" element={<NeuroNutricion />} />
          <Route path="/test-emocional" element={<TestEmocional />} />
          <Route path="/psicobioticos" element={<Psicobioticos />} />
          <Route path="/contactanos" element={<Contactanos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
