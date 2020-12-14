import React from 'react';
import classes from './ListCard.module.scss';

const ListCard = (props: any) => {
    var options = { year: 'numeric', month: 'short', day: 'numeric' };
    let formattedDate = new Date(props.launchDate).toLocaleDateString(undefined, options);
    const dateArray = formattedDate.split(' ');
    const dateOrdinal  = (dom: number) => {
        if (dom === 31 || dom === 21 || dom === 1) return dom + "st";
        else if (dom === 22 || dom === 2) return dom + "nd";
        else if (dom === 23 || dom === 3) return dom + "rd";
        else return dom + "th";
    };
    dateArray[0] = dateOrdinal(+dateArray[0]);
    formattedDate = dateArray.join(' ');

  return (
        <div className={classes.Card}>
            <div className={classes.SerialNo}>#{props.flightNumber}</div>
            <div className={classes.Title}><span>{props.missionName}</span></div>
            <div className={classes.Details}>
                <div className={classes.Date}>{formattedDate}</div>
                <div className={classes.Description}>{props.rocketName}</div>
            </div>
        </div>
  );
}

export default ListCard;
//2018-01-31T21:25:00.000Z
//31st Mar 2018