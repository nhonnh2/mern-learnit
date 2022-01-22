import React from 'react';
import { Alert } from 'antd';

function AlertMessage({ info, ...rest }) {
  return (
    <>
      {info ? (
        <Alert {...rest} message={info.message} type={info.type} showIcon />
      ) : null}
    </>
  );
}

export default AlertMessage;
