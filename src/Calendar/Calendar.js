import React from 'react';
import {useState} from "react";
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/ru';
import {Link, Redirect} from 'react-router-dom';

import './Calendar.css';

const BigCalendar = () => {


  const [token, setToken] = useState(localStorage.getItem('token'));
  const [admin, setAdmin] = useState(localStorage.getItem('admin'));
  const newConst = 0;
  const [myEvents, setMyEvents] = useState([
    {
      start: '',
      end: ' ',
      title: ''
    }
  ]);

  const handleSelect = ({ start, end }) => {
    const title =  prompt('New Event name');
    if (title) {
      let newEvent = {
        start: start,
        end: end,
        title: title
      }
      setMyEvents([...myEvents, newEvent]);
    }
  };

  const islogout = () => {
    localStorage.setItem('token', JSON.stringify([]))
    localStorage.setItem('admin', JSON.stringify([]))
    localStorage.removeItem('token', JSON.stringify([]))
    localStorage.removeItem('admin', JSON.stringify([]))
    window.location.reload();
  };

  const localizer = momentLocalizer(moment);

  const moveEvent = ({ event, start, end }) => {
    const thisEvent = event;

    const nextEvents = myEvents.map((existingEvent) => {
      return existingEvent.id == event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });
    setMyEvents(nextEvents);
  };

  return (
    <div>

      <div className="header_buttons">
        <div className="button_register">
          <Link to='/register/'>
            Зарегистрировать новый аккаунт
          </Link>
        </div>
        <div className="button_login">
          <button
            onClick={islogout}
          >
            Выйти из аккаунта
          </button>
        </div>
      </div>
      {admin == 1?
        (
          <div>
            <button onClick={handleSelect}>Create event</button>
          </div>
        )
        :
        ''
      }
      <Calendar
        localizer={localizer}
        events={myEvents}
        startAccessor="start"
        endAccessor="end"
        style={{height: 500}}
        messages={{
          next: ">",
          previous: "<",
          today: "Сегодня",
          month: "Месяц",
          week: "Неделя",
          day: "День",
        }}
        views={['day', 'week', 'month']}
        onSelectSlot={handleSelect}
        popup={true}
        tooltipAccessor={(e) => e.title}

      />
      {!token && <Redirect to="/login/"/>}
    </div>
  );
}

export default BigCalendar;
