import React from 'react';

const LaunchesContextState = {
    filterYear:'',
    sortOrder: 'asc',
    launchData: [],
    isLoading: false,
    error: '',
    filterHandler: (year: string) => {},
    sortHandler: (order: string) => {},
    fetchLaunchData: (queryParams: string) => {}
}

export const LaunchesContext = React.createContext(LaunchesContextState);

const LaunchesContextProvider = (props: any) => {
    const [selectedYear, setSelectedYear] = React.useState('');
    const [selectedSortOrder, setSelectedSortOrder] = React.useState('');
    const [launchData, setLaunchData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const filterHandler = React.useCallback((year: string) => {
        setSelectedYear(year);
    }, []);
    const sortHandler = React.useCallback((order: string) => {
        setSelectedSortOrder(order);
    }, []);
    const fetchData = React.useCallback((queryParams: string) => {
        
    }, []);
	return (
        <LaunchesContext.Provider 
            value={{
            filterYear: selectedYear, 
            sortOrder: selectedSortOrder, 
            launchData: launchData, 
            isLoading: isLoading, 
            error: error, 
            filterHandler: filterHandler, 
            sortHandler: sortHandler,
            fetchLaunchData: fetchData}}>
			{props.children}
		</LaunchesContext.Provider>
	)
}
export default LaunchesContextProvider;
