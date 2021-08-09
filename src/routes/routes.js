import BigCalendar from '../Calendar/Calendar';
import Register from '../Register/Register';
import LogIn from '../LogIn/LogIn';

export const routes = [
  {
    path: '/',
    component: BigCalendar,
    exact: true,
  },
  {
    path: '/register/',
    component: Register,
    exact: true,
  },
  {
    path: '/login/',
    component: LogIn,
    exact: true,
  },
]
