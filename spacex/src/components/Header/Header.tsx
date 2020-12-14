import React from 'react';
import logo from '../../assets/spacex-logo.png';
import refreshIcon from '../../assets/icon/refresh.png';
import classes from './Header.module.scss';
import Button from '../../ui/Button/Button';
import { LaunchesContext } from '../../context/launches-context';

const Header = () => {
  const launchesContext = React.useContext(LaunchesContext);
  const onReload = () => {
    launchesContext.updateQueryString('reload');
  }
  return (
    <div className={classes.Header}>
        <div className={classes.Logo}>
            <img src={logo} className={classes.Img} alt="spacex-logo" />
            <span className={classes.Text}>LAUNCHES</span>
        </div>
        <Button onButtonClick={onReload} icon={refreshIcon} iconText="refresh-icon" class={classes.Button}>
            Reload Data
        </Button>
    </div>
  );
}

export default Header;
