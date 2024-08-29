import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import styles from './styles.module.scss'
import PoomsaeService from '../../services/poomsae'
import { useEffect, useState } from 'react';

export default function Tests() {
    const animatedComponents = makeAnimated();
    const [gettedPoomsaes, setGettedPoomsaes] = useState([]);

    const options = [
        {label: 'Saju Dirugui', value: '0cd69455-b366-4f51-b3ee-1ca7afcae059'},
        {label: 'Saju Ap-Tchagui', value: '0039bbc9-21fc-4932-a395-c68eec7893cb'}
      ]

    const loadPomsaes = async () => {
      try {
          const result = await PoomsaeService.get();
          if (result) {
              setGettedPoomsaes(result)
          } else {
              setGettedPoomsaes([])
          }
      } catch (error) {
          setGettedPoomsaes([])
      }
    }

    useEffect(() => {
      loadPomsaes()
    }, [])
    
    return (
        <div className={styles.container}>
            <label >
                <h1>Doces</h1>
                <Select
                    onChange={(e) => {
                        e.map((option) => (console.log(option)))
                        console.log(options)
                    }}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    defaultValue={options}
                    options={gettedPoomsaes?.map((poomsae) => ({
                      label: poomsae.name,
                      value: poomsae.id
                  }))}
                    placeholder='Selecione'
                    styles={{
                        multiValueContainer: (base) => ({
                          ...base,
                          display: 'flex',
                          overflowX: 'auto', // Habilita scroll horizontal
                          flexWrap: 'nowrap', // Evita quebra de linha para múltiplos itens
                        }),
                        valueContainer: (base) => ({
                          ...base,
                          maxHeight: '48px', // Define a altura máxima para o container de valores
                          overflowY: 'auto', // Habilita scroll vertical
                          overflowX: 'hidden', // Evita scroll horizontal
                        }),
                      }}
                />
            </label>
        </div>
        
    )
}
