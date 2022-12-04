import React from 'react';


import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message/Message';


const Messages = ({ messages, name, creationTime }) => (
  <ScrollToBottom className="h-[500px] p-5">
    {messages.map((message, i) => <div key={i}><Message message={message} name={name} creationTime={creationTime}/></div>)}
  </ScrollToBottom>
);

export default Messages;