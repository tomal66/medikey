import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

function Logo({ size = "1em", ...props }) {
  return (
    <SvgIcon {...props} viewBox="0 0 308.02 430.81" style={{ width: size, height: size }}>
      <polygon fill={props.color || "#fff"} points="231.67 430.81 308.02 430.81 308.02 203.78 231.67 280.13 231.67 430.81" />
      <polygon fill={props.color || "#fff"} points="0 430.81 76.69 430.81 76.69 278.53 0 201.84 0 430.81" />
      <path fill={props.color || "#fff"} d="m154.77,0L1.5,153.22l153.28,153.28,153.25-153.25L154.77,0Zm0,224.93l-71.69-71.69,71.69-71.67,71.68,71.68-71.68,71.68Z" />
    </SvgIcon>
  );
}

export default Logo;
