import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import './style.css';

export function Options() {
  const navigate = useNavigate();
  const [volume, setVolume] = useState(() => {
    return parseInt(localStorage.getItem('volume')!, 10) ?? 100;
  });

  useEffect(() => {
    localStorage.setItem('volume', volume.toString());
  }, [volume]);

  return (
    <main id='optContainer'>
      <div id="optBox">
        <button onClick={() => navigate(-1)}>Voltar para o menu</button>

        <div>
          <div className='field'>
            <label htmlFor="volume">Volume:</label>
            <input
              type="range"
              id='volume'
              min={0}
              max={100}
              value={volume}
              onChange={e => setVolume(parseInt(e.target.value, 10))}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
