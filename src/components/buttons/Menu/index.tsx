import './style.css';

type Props = {
  label?: string;
  icon?: string;
  squared?: boolean;
  onClick?(): void;
}

export function MenuButton({ label, icon, squared, onClick }: Props) {
  return (
    <button className='menuBtn' style={squared ? {aspectRatio: 1} : undefined} onClick={onClick}>
      {icon && <img src={icon} alt='icon' />}
      {label && <p>{label}</p>}
    </button>
  )
}