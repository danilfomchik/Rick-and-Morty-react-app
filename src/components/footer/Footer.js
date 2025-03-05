import React, {memo, useCallback, useEffect, useState} from 'react';

import useApi from '../../services/useApi';
import './footer.scss';

const Footer = memo(() => {
    const [data, setData] = useState([
        {
            name: 'characters',
            value: 0,
        },
        {
            name: 'episodes',
            value: 0,
        },
        {
            name: 'locations',
            value: 0,
        },
    ]);

    const {getDataCount} = useApi();

    const getInitialData = useCallback(async () => {
        const responseData = await Promise.allSettled([
            getDataCount('character'),
            getDataCount('episode'),
            getDataCount('location'),
        ]);

        setData(prevData =>
            prevData.map((item, index) => ({
                ...item,
                value: responseData[index].status === 'fulfilled' ? responseData[index].value : item.value,
            })),
        );
    }, [getDataCount]);

    useEffect(() => {
        getInitialData();
    }, [getInitialData]);

    return (
        <div className="footer">
            <div className="footer__api-info">
                {data.map(item => (
                    <div className="footer__api-info__count" key={item.name}>
                        {item.name.toUpperCase()}: <span>{item.value}</span>
                    </div>
                ))}
            </div>
            <div className="footer__social-medias">
                <ul className="footer__social-medias__list">
                    <li className="social-list_li">
                        <a href="https://www.linkedin.com/in/danilfomchik/" target="_blanck" className="menu-item">
                            <i className="fab fa-linkedin"></i>
                        </a>
                    </li>
                    <li className="social-list_li">
                        <a href="https://github.com/danilfomchik" target="_blanck" className="menu-item">
                            <i className="fab fa-github"></i>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="footer__developed-by">
                <svg
                    width={20}
                    height={20}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
                    />
                </svg>
                <span>by</span>
                <a href="https://github.com/danilfomchik" target="_blank" className="developer-name">
                    <span>Daniil Fomenko</span>
                </a>
                <span>{new Date().getFullYear()}</span>
            </div>
        </div>
    );
});

export default Footer;
