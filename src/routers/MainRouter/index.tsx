import { BrowserRouter, Route, Routes, useLocation } from 'react-router';
import { NotFound } from '../../pages/NotFound';
import { AboutPomodoro } from '../../pages/AboutPomodoro';
import { Home } from '../../pages/Home';
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

export function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>

        <Route
          path='/about-pomodoro'
          element={<AboutPomodoro></AboutPomodoro>}
        ></Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>
      </Routes>
      <ScrollToTop></ScrollToTop>
    </BrowserRouter>
  );
}
