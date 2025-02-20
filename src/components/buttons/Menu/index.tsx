import './style.css';

type Props = {
  label?: string;
  icon?: string;
  onClick?(): void;
}

export function MenuButton({ label, icon, onClick }: Props) {
  return (
    <button className='menuBtn' onClick={onClick}>
      {icon && <img src={icon} alt='icon' />}
      {label && <p>{label}</p>}
    </button>
  )
}