import { useNavigate } from 'react-router';
import './style.css';

export function Options() {
  const navigate = useNavigate();

  return (
    <main id='optContainer'>
      <div id="optBox">
        <button onClick={() => navigate(-1)}>Voltar para o menu</button>

        <div>
          <label htmlFor="volume">Volume:</label>
          <input type="range" id='volume' min={0} max={100} />
        </div>
      </div>
    </main>
  )
}