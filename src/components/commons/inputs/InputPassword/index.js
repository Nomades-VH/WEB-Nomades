import { TbEyeOff, TbEye } from 'react-icons/tb';
import styles from './styles.module.scss';
import { useState } from 'react';

export default function InputPassword({ name, label, placeholder, value, onChange, onBlur, error, toggleMask, ...props }) {
    const [mask, setMask] = useState(true);

    return (
        <>
            <label className={styles.container}>
                {label}
                <div className={styles.inputWrapper}>
                    <input
                        type={mask ? 'password' : 'text'}
                        name={name}
                        placeholder={placeholder}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        {...props}
                    />
                    {toggleMask && (
                        <button className={styles.button} type='button' onClick={() => setMask(!mask)}>
                            {mask ? <TbEyeOff className={styles.icon} /> : <TbEye className={styles.icon} />}
                        </button>
                    )}
                </div>
            </label>
        </>
    );
}

InputPassword.defaultProps = {
    placeholder: '',
    onChange: null,
    onBlur: null,
    error: null,
    toggleMask: true,
};