import {Link} from 'react-router-dom';

import ErrorMessage from '../../errorMessage/ErrorMessage';
import ReturnButton from '../../returnButton/ReturnButton';
import './404.scss';

const Page404 = () => {
    return (
        <div className="error__page">
            <ErrorMessage />

            <div className="error__page__controls">
                <ReturnButton title={'Return Back'} />
                <Link className="return-back__btn" to="/">
                    Go back to main page
                </Link>
            </div>
        </div>
    );
};

export default Page404;
