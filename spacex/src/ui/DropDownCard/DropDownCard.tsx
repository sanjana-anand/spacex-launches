import React from 'react';
import classes from './DropDownCard.module.scss';

const DropDownCard = (props: any) => {
  return (
        <div className={classes.Card}>
            <ul>
                {props.data.map((year: string, index: number) => (
                    <li key={year} className={year !== 'All' && year === props.selectedYear ? classes.Selected : ''} onClick={() => props.setSelectedYear(year)}>{year}</li>
                ))}
            </ul>
        </div> 
  );
}

export default DropDownCard;