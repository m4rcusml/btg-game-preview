import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MenuButton } from '../../components/buttons/Menu';

import logo from '../../assets/logo/logoGame.png';
import ParallaxBackground from '../../components/ParallaxBackground';
import optionsIcon from '../../assets/icons/optionsIcon.png';
import portIcon from '../../assets/icons/portIcon.png';
import engIcon from '../../assets/icons/engIcon.png';
import playIcon from '../../assets/icons/playIcon.png';
import leaveIcon from '../../assets/icons/leaveIcon.png';

import './style.css';

export function Menu() {
  const navigate = useNavigate();
  const [isPortuguese, setIsPortuguese] = useState(true);

  function handleChangeIcon() {
    setIsPortuguese(!isPortuguese);
  }

  return (
    <>
      <ParallaxBackground />
      <main id="menu">
        <img className="logo" src={logo} alt="Logo" />

        <div className="buttons">
          <MenuButton icon={playIcon} onClick={() => navigate('game')} />

          <div className='bottom'>
            <MenuButton icon={optionsIcon} squared onClick={() => navigate('options')} />
            <MenuButton icon={isPortuguese ? portIcon : engIcon} squared onClick={handleChangeIcon} />
            <MenuButton icon={leaveIcon} squared onClick={() => window.close()} />
          </div>
        </div>
      </main>
    </>
  )
}