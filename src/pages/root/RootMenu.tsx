import { Outlet } from 'react-router';
import ParallaxBackground from '../../components/ParallaxBackground';
import './style.css';

export function RootMenu() {
  return (
    <>
      <ParallaxBackground />
      <Outlet />
    </>
  )
}