import React, { useState } from 'react';
import { Link } from "react-router-dom";

export default function SignIn() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className="container mx-auto py-10 text-center">
      <div className="max-w-lg mx-auto rounded-xl border-4 border-cyan-700 p-10">
        <h1 className="text-4xl font-bold mb-10">Вход</h1>
        <div>
          <input placeholder="Ваше имя" className="w-full mb-10 bg-slate-100 p-5 rounded-sm" type="text" onChange={(event) => setName(event.target.value)} />
          <input placeholder="Идентификатор комнаты" className="w-full mb-10 bg-slate-100 p-5 rounded-sm" type="text" onChange={(event) => setRoom(event.target.value)} />
        </div>
        <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
          <button className='bg-cyan-700 p-5 rounded-lg mx-auto text-white text-xl' type="submit">Присоединиться</button>
        </Link>
      </div>
    </div>
  );
}
