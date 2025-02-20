import { useNavigate } from 'react-router';
import { MenuButton } from '../../components/buttons/Menu';
import logo from '../../assets/logo/logoGame.png';
import './style.css';

export function Menu() {
  const navigate = useNavigate();

  return (
    <main id="menu">
      <img className="logo" src={logo} alt="Logo" />

      <div className="buttons">
        <MenuButton label='Play' />

        <MenuButton label='Opt' onClick={() => navigate('options')} />

        <MenuButton label='Lang' />
        <MenuButton label='Exit' />
      </div>
    </main>
  )
}