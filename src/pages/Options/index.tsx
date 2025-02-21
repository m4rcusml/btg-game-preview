import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { MenuButton } from '../../components/buttons/Menu';
import './style.css';

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

        <div className='fields'>
          <div className='field'>
            <label htmlFor="mainVolume">Volume principal:</label>

            <div className="slider-container">
              <label className="slider">
                <input
                  type="range"
                  className="level"
                  id='mainVolume'
                  min={0}
                  max={100}
                  value={gameState.mainVolume}
                  onChange={e => setGameState(prevState => ({
                    ...prevState,
                    mainVolume: parseInt(e.target.value, 10)
                  }))}
                />
              </label>
            </div>
          </div>

          <div className='field'>
            <label htmlFor="musicVolume">Volume da música:</label>
            <div className="slider-container"> 
              <label className="slider">
                <input
                  type="range"
                  className="level"
                  id='musicVolume'
                  min={0}
                  max={100}
                  value={gameState.musicVolume}
                  onChange={e => setGameState(prevState => ({
                    ...prevState,
                    musicVolume: parseInt(e.target.value, 10)
                  }))}
                />
              </label>
            </div>
          </div>

          <div className='bottom'>
            <MenuButton label='Créditos' />
            <MenuButton label='Feedback' />
            <MenuButton label='Ajuda' />
          </div>
        </div>
      </div>
    </main>
  );
}
