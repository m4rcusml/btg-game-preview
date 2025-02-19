import { useNavigate } from 'react-router';
import { MenuButton } from '../../components/buttons/Menu';
import './style.css';

export function Menu() {
  const navigate = useNavigate();

  return (
    <main id="menu">
      <div className="buttons">
        <MenuButton label='Play' />

        <MenuButton label='Opt' onClick={() => navigate('options')} />

        <MenuButton label='Lang' />
        <MenuButton label='Exit' />
      </div>
    </main>
  )
}