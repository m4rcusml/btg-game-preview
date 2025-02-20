import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import './style.css';
import { MenuButton } from '../../components/buttons/Menu';

export function Options() {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<{ mainVolume: number, musicVolume: number }>(() => {
    const savedState = JSON.parse(localStorage.getItem('gameState')!);
    return savedState || { mainVolume: 100, musicVolume: 100 };
  });

  useEffect(() => {
    localStorage.setItem('gameState', JSON.stringify(gameState));
  }, [gameState]);

  return (
    <main id='optContainer'>
      <div id="optBox">
        <button onClick={() => navigate(-1)}>Voltar para o menu</button>

        <div>
          <div className='field'>
            <label htmlFor="mainVolume">Volume principal:</label>
            <input
              type="range"
              id='mainVolume'
              min={0}
              max={100}
              value={gameState.mainVolume}
              onChange={e => setGameState(prevState => ({
                ...prevState,
                mainVolume: parseInt(e.target.value, 10)
              }))}
            />
          </div>

          <div className='field'>
            <label htmlFor="musicVolume">Volume da música:</label>
            <input
              type="range"
              id='musicVolume'
              min={0}
              max={100}
              value={gameState.musicVolume}
              onChange={e => setGameState(prevState => ({
                ...prevState,
                musicVolume: parseInt(e.target.value, 10)
              }))}
            />
          </div>

          <div>
            <MenuButton label='Créditos' />
            <MenuButton label='Feedback' />
            <MenuButton label='Ajuda' />
          </div>
        </div>
      </div>
    </main>
  );
}

