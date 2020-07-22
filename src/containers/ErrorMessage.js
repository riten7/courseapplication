import React from "react";
import { Result } from "antd";
const ErrorMessage = (props) => {
  return (
    <Result
      className="courseError"
      status="error"
      title={props.title}
    />)
}

export default ErrorMessage;