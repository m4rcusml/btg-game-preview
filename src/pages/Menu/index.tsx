import { MenuButton } from '../../components/buttons/Menu';
import './style.css';

export function Menu() {
  return (
    <main id="menu">
      <div className="buttons">
        <MenuButton label='Play' />

        <div>
          <MenuButton label='Opt' />
          <MenuButton label='Lang' />
          <MenuButton label='Exit' />
        </div>
      </div>
    </main>
  )
}