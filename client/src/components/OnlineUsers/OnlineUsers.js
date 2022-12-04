import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

const OnlineUsers = ({ users, room }) => (
  <div>
    {
      users
        ? (
          <div>
            <h1 className='font-bold text-2xl'>Пользователи онлайн в комнате {room}</h1>
            <div>
              <h2>
                {users.map(({name}) => (
                  <div key={name} className='activeItem flex items-center text-lg'>
                    <img className='h-[6px] w-[6px] mr-2' alt='' src={onlineIcon}/>
                    {name}
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default OnlineUsers;