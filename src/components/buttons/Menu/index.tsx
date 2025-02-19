import './style.css';

type Props = {
  label: string;
  onClick?(): void;
}

export function MenuButton({ label, onClick }: Props) {
  return (
    <button id='menuBtn' onClick={onClick}>
      <p>{label}</p>
    </button>
  )
}