import error404 from './404.png';

const ErrorMessage = () => {
    return (
        <img
            src={error404}
            style={{
                display: 'block',
                width: '50%',
                objectFit: 'contain',
                margin: '0px auto 20px',
            }}
            alt="404 error"
        />
    );
};

export default ErrorMessage;
