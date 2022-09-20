import React from 'react'
import PropTypes from "prop-types";

export default function FormErrorMessage({ children }) {
  return <div className="form__errormessage">{children}</div>;
}

FormErrorMessage.propTypes = {
    children: PropTypes.node.isRequired,
};


