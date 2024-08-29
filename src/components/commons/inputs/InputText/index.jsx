import styles from './styles.module.scss';

export default function InputText({ name, label, placeholder, value, onChange, onBlur, error, className, required }) {
    return (
        <>
            <label className={`${styles.container} ${className || ''}`}>
                <h5>{label}</h5>
                <input
                    type='text'
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    required={required}
                />
            </label>
        </>
    );
}

InputText.defaultProps = {
    required: false,
};