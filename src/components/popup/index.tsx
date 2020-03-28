import React, { useState } from 'react';
import Popover from 'react-tiny-popover'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

export interface PopupProps {
  children: React.ReactNode
  onSuccess: () => void
}

const Popup = (props: PopupProps) => {
  const [visible, handleVisible] = useState(false);

  const onOk = () => {
    props.onSuccess ? props.onSuccess() : null;
    handleVisible(!visible)
  };

  return <Popover
    isOpen={visible}
    position={'left'}
    padding={10}
    disableReposition
    onClickOutside={() => handleVisible(!visible)}
    content={() => (
      <div className='popover-content'>
        <div className='icon-pop'><FontAwesomeIcon icon={faExclamationTriangle} /></div>
        <label>Confirm delete</label>
        <div className='buttons'>
          <button onClick={onOk}>Ok</button>
          <button onClick={() => handleVisible(!visible)}>Cancel</button>
        </div>
      </div>
    )}
  >
    <div onClick={() => handleVisible(!visible)}>
      { props.children }
    </div>
  </Popover>
};

export default Popup;