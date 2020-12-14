import React from 'react';
import {useEffect, useState} from 'react';
import ListCard from '../../ui/ListCard/ListCard';
import classes from './Content.module.scss';
import launchHome from '../../assets/img/launch-home.png';
import Button from '../../ui/Button/Button';
import selectIcon from '../../assets/icon/select.png';
import sortIcon from '../../assets/icon/sort.png';
import ButtonDropDown from '../../ui/ButtonDropdown/ButtonDropdown';
import Loader from '../../ui/Loader/Loader';
import Header from '../Header/Header';
import LaunchesContext from '../../context/launches-context'

interface Launch {
    flight_number: number,
    mission_name: string,
    launch_date_utc: Date,
    launch_year: string,
    rocket: {
        rocket_name: string
    }
}

const Content = () => {
    const [launchData, setLaunchData] = useState<Launch[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<String>('');
    const [sort, setSort] = useState<String>('asc');
    const [filterYear, setFilterYear] = useState<String>('');
    const currentYear = new Date().getFullYear();
    const yearList: String[] = ['All'];
    for (let i=-15; i<5; i++){
        yearList.push(String(+currentYear + i));
    }
    useEffect(() => {
        setIsLoading(true);
        getSpacexData();
    }, []);

    const getSpacexData = (queryString: string = '') => {
        let baseUrl = 'https://api.spacexdata.com/v3/launches';
        if(queryString) {
            baseUrl = baseUrl + '?' + queryString;
        }
        fetch(baseUrl, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then (response => {
            return response.json();
        }).then (responseData => {
            setLaunchData(responseData);
            setIsLoading(false);
        }).catch(error => {
            setError('Something went wrong!');
            setIsLoading(false);
        });
    };

    const onFilterByYear = (year: string) => {
        setLaunchData([]);
        setError('');
        setIsLoading(true);
        setSort('asc');
        if(year === 'All'){
            setFilterYear('');
            getSpacexData();
        }else {
            const queryString = 'launch_year=' + year;
            setFilterYear(year);
            getSpacexData(queryString);
        }
    };

    const onSort = () => {
        let order = '';
        if(sort === 'asc'){
            setSort('desc');
            order = 'desc';
        } else {
            setSort('asc');
            order = 'asc';
        }
        setLaunchData([]);
        setError('');
        setIsLoading(true);
        let queryString = 'sort=launch_date_utc&order=' + order;
        if(filterYear){
            queryString = queryString + '&launch_year=' + filterYear;
        }
        getSpacexData(queryString);
    };

    const reloadData = () => {
        setLaunchData([]);
        setError('');
        setIsLoading(true);
        setSort('asc');
        setFilterYear('');
        getSpacexData();
    }

    const launchList = launchData.map((launch, index) => {
       return ( <ListCard key={index}
        flightNumber={launch.flight_number} 
        missionName={launch.mission_name} 
        launchDate={launch.launch_date_utc} 
        rocketName={launch.rocket.rocket_name}/>
       );
    });
  return (
    <React.Fragment>
        <Header onReload={reloadData}/>
        <div className={classes.Content}>
            <div className={classes.Img}>  
                <img src={launchHome} className={classes.Img} alt="launch-home" /> 
            </div>
            <div className={classes.List}>
                <div className={classes.Filter}>
                    <ButtonDropDown filterByYear={onFilterByYear} icon={selectIcon} iconText="select-icon" data={yearList}/> 
                    <Button onButtonClick={onSort} icon={sortIcon} iconText="sort-icon" class={classes.Button}>
                        Sort {sort === 'asc' ? 'Descending' : 'Ascending'}
                    </Button>
                </div>
                <div className={classes.Data}>
                    { isLoading ? <Loader /> : error ? error : launchList.length > 0 ? launchList : 'No Data Found!' }
                </div>
            </div>
        </div>
    </React.Fragment>
    
  );
}

export default Content;