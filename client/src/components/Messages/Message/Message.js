import React from 'react';

const Message = ({ message: { text, user }, name, creationTime }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim();

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="bg-blue-200 w-[300px] rounded-xl p-4 ml-auto mt-4">
          <span className="opacity-25 text-xs">{trimmedName}</span>
          <div className="">
            <span className="">{text}</span>
            <span className="w-full flex justify-end opacity-25 text-xs">{creationTime}</span>
          </div>
        </div>
        )
        : (
          <div className="bg-slate-200 w-[300px] rounded-xl p-4 mr-auto mt-4">
            <div className="">
              <span className="">{text}</span>
            </div>
            <span className="flex justify-end opacity-25 text-xs">{user}</span>
          </div>
        )
  );
}

export default Message;