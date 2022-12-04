import React from 'react';

const Input = ({ setMessage, sendMessage, message }) => (
  <form className=" flex h-[50px] border-t-2 border-cyan-700">
    <input
      className="grow pl-8 outline-none"
      type="text"
      placeholder="Сообщение..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <button className="px-8 bg-cyan-700 text-white " onClick={e => sendMessage(e)}>Отправить</button>
  </form>
)

export default Input;