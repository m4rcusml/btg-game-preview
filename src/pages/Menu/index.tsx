import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MenuButton } from '../../components/buttons/Menu';
import logo from '../../assets/logo/logoGame.png';
import './style.css';

export function Menu() {
  const navigate = useNavigate();
  const [isPortuguese, setIsPortuguese] = useState(true);

  function handleChangeIcon() {
    setIsPortuguese(!isPortuguese);
  }

  return (
    <main id="menu">
      <img className="logo" src={logo} alt="Logo" />

      <div className="buttons">
        <MenuButton icon='../src/assets/icons/playIcon.png'/>
        
        <div className='bottom'>
          <MenuButton icon='../src/assets/icons/optionsIcon.png' squared onClick={() => navigate('options')} />
          <MenuButton icon={isPortuguese ? '../src/assets/icons/portIcon.png' : '../src/assets/icons/engIcon.png'} squared onClick={handleChangeIcon} />
          <MenuButton icon='../src/assets/icons/leaveIcon.png' squared onClick={() => window.close()} />
        </div>
      </div>
    </main>
  )
}