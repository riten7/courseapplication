import React from 'react';
import { Alert } from 'antd';

const AlertMessage = (props) => {
  return (
    <Alert
          message={props.message}
          description={props.description}
          type="error"
          showIcon
        />
  );
}

export default AlertMessage;