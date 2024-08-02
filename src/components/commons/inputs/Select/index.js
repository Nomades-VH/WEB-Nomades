import styles from "./styles.module.scss"
import ReactSelect from 'react-select'
import makeAnimated from 'react-select/animated'

export default function Select({ label, options, onChange, placeholder='Selecione a opção', defaultValue}) {
    const animatedComponents = makeAnimated();
    
    return (
        <>
            <label className={styles.container}>
                <h5>{label}</h5>
                <ReactSelect
                    value={defaultValue}
                    onChange={onChange}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={options}
                    placeholder={placeholder}
                    noOptionsMessage={() => "Nenhuma opção disponível"} 
                    styles={{
                        multiValueContainer: (base) => ({
                          ...base,
                          display: 'flex',
                          overflowX: 'auto', // Habilita scroll horizontal
                          flexWrap: 'nowrap', // Evita quebra de linha para múltiplos itens
                          gap: '0',
                          width: '100%'
                        }),
                        multiValueRemove: (base) => ({
                            width: '20px',
                            alignSelf: 'center'
                        }),
                        valueContainer: (base) => ({
                          ...base,
                          height: '60px',
                          maxHeight: '60px', // Define a altura máxima para o container de valores
                          overflowY: 'auto', // Habilita scroll vertical
                          overflowX: 'hidden', // Evita scroll horizontal
                          fontSize: '10px',
                          margin: '0'
                        }),
                      }}
                />
            </label>
        </>

    )
}