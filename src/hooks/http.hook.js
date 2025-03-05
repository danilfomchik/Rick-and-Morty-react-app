import {useCallback, useState} from 'react';

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const request = useCallback(async (url, method = 'GET', signal = null, body = null, headers = {}) => {
        setLoading(true);

        try {
            const options = {method, signal};

            if (body && method !== 'GET') {
                options.body = JSON.stringify(body);
                options.headers = {'Content-Type': 'application/json', ...headers};
            }

            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();

            setLoading(false);

            return data;
        } catch (e) {
            setLoading(false);

            if (e.name === 'AbortError') {
                return;
            }

            setError(e.message);
            throw e;
        }
    }, []);

    const clearError = useCallback(() => setError(null), []);

    return {loading, request, error, clearError};
};
