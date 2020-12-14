import React from 'react';
import classes from './Content.module.scss';
import launchHome from '../../assets/img/launch-home.png';
import LaunchList from '../LaunchList/LaunchList';

const Content = () => {
  return (
        <div className={classes.Content}>
            <div className={classes.Img}>  
                <img src={launchHome} className={classes.Img} alt="launch-home" /> 
            </div>
            <LaunchList/>
        </div>    
  );
}

export default Content;