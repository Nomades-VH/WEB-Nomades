import styles from './styles.module.scss';

export default function Button({ children, onClick, disabled, className, type }) {
    return (
        <button type={type} className={`${styles.button} ${className || ''}`} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
}

Button.defaultProps = {
    label: 'Button',
    onClick: null,
    disabled: false,
};