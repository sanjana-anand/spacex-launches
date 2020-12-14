import React from 'react';
import classes from './DropDownCard.module.scss';

interface ButtonDropdownProps {
    data: string[],
    selectedYear: string,
    setSelectedYear: (year: string) => void,
  }
  
const DropDownCard = (props: ButtonDropdownProps) => {
  return (
        <div className={classes.Card}>
            <ul>
                {props.data.map((year: string) => (
                    <li key={year} className={year === props.selectedYear ? classes.Selected : ''} onClick={() => props.setSelectedYear(year)}>{year}</li>
                ))}
            </ul>
        </div> 
  );
}

export default DropDownCard;