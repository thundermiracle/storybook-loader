/* eslint-disable react/prop-types */
import React from 'react';

export default function DivReact({ content, ...props }) {
  return <div {...props}>{content}</div>;
}
