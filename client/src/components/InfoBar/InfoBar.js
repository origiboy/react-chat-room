import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';


const InfoBar = ({ room }) => (
  <div className="flex justify-between items-center h-16 bg-cyan-700 px-5">
    <div className="flex items-center">
      <img className="h-[6px] w-[6px] mr-2" src={onlineIcon} alt="online icon" />
      <h3 className="text-white font-semibold">{room}</h3>
    </div>
    <div className="">
      <a href="/"><img src={closeIcon} alt="close icon" /></a>
    </div>
  </div>
);

export default InfoBar;