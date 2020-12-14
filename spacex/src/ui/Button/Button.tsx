import React from 'react';
import classes from './Button.module.scss';

interface ButtonProps {
  class?: string,
  icon: string,
  iconText: string,
  onButtonClick: React.MouseEventHandler<HTMLButtonElement>
  children: React.ReactNode
}
const Button = (props: ButtonProps) => {
    const btnClass = props.class + ' ' + classes.Button;
  return (
        <button className={btnClass} onClick={props.onButtonClick}>
           {props.children}
            <span className={classes.Icon}><img src={props.icon} alt={props.iconText} /></span>
        </button>
  );
}

export default Button;
