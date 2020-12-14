import React, { useEffect } from 'react';

const LaunchesContextState = {
    filterYear:'',
    sortOrder: 'asc',
    launchData: [],
    isLoading: false,
    error: '',
    filterHandler: (year: string) => {},
    sortHandler: (order: string) => {},
    updateQueryString: (queryString: string) => {}
}

export const LaunchesContext = React.createContext(LaunchesContextState);

const LaunchesContextProvider = (props: any) => {
    const [selectedYear, setSelectedYear] = React.useState('');
    const [selectedSortOrder, setSelectedSortOrder] = React.useState('');
    const [launchData, setLaunchData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const [queryString, setQueryString] = React.useState('');
    
    const filterHandler = React.useCallback((year: string) => {
        setSelectedYear(year);
    }, []);
    const sortHandler = React.useCallback((order: string) => {
        setSelectedSortOrder(order);
    }, []);
    const updateQueryString = React.useCallback((queryString: string) => {
        setQueryString(queryString);
    }, []);

    useEffect(() => {
        const abortCtrl = new AbortController();
        const opts = { signal: abortCtrl.signal };
        if(queryString === 'reload') {
            setQueryString('');
        }else{
            setIsLoading(true);
            setLaunchData([]);
            setError('');
            let baseUrl = 'https://api.spacexdata.com/v3/launches';
            if(!queryString) {
                setSelectedYear('');
                setSelectedSortOrder('asc');
            }else {
                baseUrl = baseUrl + '?' + queryString;
            }
            console.log('in fetch')
            fetch(baseUrl, opts)
            .then (response => {
                return response.json();
            }).then (responseData => {
                setLaunchData(responseData);
                setIsLoading(false);
            }).catch(error => {
                if (error.name === 'AbortError') {
                    console.log('request was cancelled');
                } else {
                    setError('Something went wrong!');
                    setIsLoading(false);
                }
            });
        }
        return () => abortCtrl.abort();
    }, [queryString])

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
            updateQueryString: updateQueryString
            }}>
			{props.children}
		</LaunchesContext.Provider>
	)
}
export default LaunchesContextProvider;
