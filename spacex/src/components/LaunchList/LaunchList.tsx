import React from 'react';
import selectIcon from '../../assets/icon/select.png';
import sortIcon from '../../assets/icon/sort.png';
import Loader from '../../ui/Loader/Loader';
import Button from '../../ui/Button/Button';
import ButtonDropDown from '../../ui/ButtonDropdown/ButtonDropdown';
import classes from './LaunchList.module.scss';
import { LaunchesContext } from '../../context/launches-context';
import Launch from './Launch/Launch';

const LaunchList = () => {
    const launchesContext = React.useContext(LaunchesContext);
    const currentYear = new Date().getFullYear();
    const yearList: string[] = ['All'];
    for (let i=-15; i<5; i++){
        yearList.push(String(+currentYear + i));
    }

    const onFilterByYear = (year: string) => {
        let queryString = '';
        if(year === 'All'){
            launchesContext.filterHandler('');
        }else {
            launchesContext.filterHandler(year);
            queryString = 'launch_year=' + year;
        }
        launchesContext.sortHandler('asc');
        launchesContext.updateQueryString(queryString);
    };

    const onSort = () => {
        let queryString = '';
        let order = '';
        if(launchesContext.sortOrder === 'asc'){
            launchesContext.sortHandler('desc');
            order = 'desc';
        } else {
            launchesContext.sortHandler('asc');
            order = 'asc';
        }
        queryString = 'sort=launch_date_utc&order=' + order;
        if(launchesContext.filterYear){
            queryString = queryString + '&launch_year=' + launchesContext.filterYear;
        }
        launchesContext.updateQueryString(queryString);
    };

    const launchList = launchesContext.launchData.map((launchData, index) => {
        return <Launch key={index} launchData={launchData} />
    });

  return (
    <div className={classes.List}>
        <div className={classes.Filter}>
            <ButtonDropDown filterByYear={onFilterByYear} selected={launchesContext.filterYear} icon={selectIcon} iconText="select-icon" data={yearList}/> 
            <Button onButtonClick={onSort} icon={sortIcon} iconText="sort-icon" class={classes.Button}>
                Sort {launchesContext.sortOrder === 'asc' ? 'Descending' : 'Ascending'}
            </Button>
        </div>
        <div className={classes.Data}>
            { launchesContext.isLoading ? <Loader /> : launchesContext.error ? launchesContext.error : launchList.length > 0 ? launchList : 'No Data Found!' }
        </div>
    </div>
  );
}

export default LaunchList;