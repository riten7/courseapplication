import React from 'react';
import { Button } from 'antd';
import "./Button.css";


const ButtonComponent = (props) => {
  const { className, buttonText, onButtonClick, disabled, type, htmlType } = props;
  return (
    <Button className={`courseBtn ${className}`}
      type={type}
      htmlType={htmlType || "button"}
      disabled={disabled}
      onClick={onButtonClick}>
      {buttonText}
    </Button>
  )
}

export default ButtonComponent;