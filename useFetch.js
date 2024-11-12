import { useEffect, useState } from "react"

const localCache = {};

export const useFetch = (url) => {

    const [state, setState] = useState({
        data: null,
        loading: true,
        hasError: false,
        error: null,
    });

    const setLoadingState = () => {
        setState({
            data: null,
            loading: true,
            hasError: false,
            error: null,
        });
    }

    const getFetch = async () => {

        if(localCache[url]) {
            // console.log('Usando cache');
            setState({
                data: localCache[url],
                loading: false,
                hasError: false,
                error: null,
            });
            return;
        }

        setLoadingState();

        const response = await fetch(url);

        // sleep
        await new Promise(resolve => setTimeout(resolve, 1500));

        if(!response.ok) {
            setState({
                data: null,
                loading: false,
                hasError: true,
                error: {
                    code: response.status,
                    message: response.statusText,
                }
            });
            return;
        }

        const data = await response.json();
        setState({
            data,
            loading: false,
            hasError: false,
            error: null,
        });

        // Manejo del cache
        localCache[url] = data;
    }

    useEffect(() => {
        getFetch();
    }, [ url ]);

    return {
        data: state.data,
        isLoading: state.loading,
        hasError: state.hasError,
    }
}
