import {useCallback, useState} from 'react';

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const request = useCallback(
        async (url, method = 'GET', body = null, signal = null, headers = {'Content-Type': 'application/json'}) => {
            setLoading(true);

            try {
                const response = await fetch(url, {method, body, headers, signal});

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
        },
        [],
    );

    const clearError = useCallback(() => setError(null), []);

    return {loading, request, error, clearError};
};
