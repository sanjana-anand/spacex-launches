import React, { useEffect } from 'react';
import ListCard from '../../../ui/ListCard/ListCard';
import classes from './Launch.module.scss';

export interface LaunchData {
  flight_number: string,
  mission_name: string,
  launch_date_utc: string,
  launch_year: string,
  rocket: {
    rocket_name: string
  }
}

const Launch = (props: {launchData: LaunchData}) => {

  const formatDate = (date: string) => {
    let formattedDate: string;
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    formattedDate = new Date(date).toLocaleDateString(undefined, options);
    const dateArray = formattedDate.split(' ');
    const dateOrdinal  = (dom: number) => {
        if (dom === 31 || dom === 21 || dom === 1) return dom + "st";
        else if (dom === 22 || dom === 2) return dom + "nd";
        else if (dom === 23 || dom === 3) return dom + "rd";
        else return dom + "th";
    };
    dateArray[0] = dateOrdinal(+dateArray[0]);
    formattedDate = dateArray.join(' ');
    return formattedDate;
  };

  return (
    <ListCard>
        <div className={classes.Number}>#{props.launchData.flight_number}</div>
        <div className={classes.Name}><span>{props.launchData.mission_name}</span></div>
        <div className={classes.Description}>
            <div className={classes.Date}>{formatDate(props.launchData.launch_date_utc)}</div>
            <div className={classes.Rocket}>{props.launchData.rocket.rocket_name}</div>
        </div>
    </ListCard>
  );
}

export default Launch;