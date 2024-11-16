import { Image } from 'react-bootstrap';
import styles from './styles.module.scss';

export default function InputImage({ name, label, placeholder, value, onChange, onBlur, className, previewUrl, required=false }) {
    return (
        <>
            <label className={`${styles.container} ${className || ''}`}>
                <h5>{label}</h5>
                <div className={styles.items}>
                    <input
                        type='file'
                        name={name}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        accept="image/*"
                        required={required}
                    />
                    {previewUrl && <Image className={className || styles.image} src={previewUrl} />}
                </div>
            </label>
        </>
    );
}
