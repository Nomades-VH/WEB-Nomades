import styles from './styles.module.scss';

export default function Button({ label, onClick, disabled, className }) {
    return (
        <button className={`${styles.button} ${className || ''}`} onClick={onClick} disabled={disabled}>
            {label}
        </button>
    );
}

Button.defaultProps = {
    label: 'Button',
    onClick: null,
    disabled: false,
};