import {useQuery} from '@apollo/client';
import React, {memo} from 'react';

import {DATA_STATISTICS} from '../../apollo/queries/dataStatistics';
import './footer.scss';

const Footer = memo(() => {
    const {data} = useQuery(DATA_STATISTICS);

    return (
        <div className="footer">
            {data && (
                <div className="footer__api-info">
                    {Object.keys(data).map(item => (
                        <div className="footer__api-info__count" key={item}>
                            {item.toUpperCase()}: <span>{data[item].info.count}</span>
                        </div>
                    ))}
                </div>
            )}

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
