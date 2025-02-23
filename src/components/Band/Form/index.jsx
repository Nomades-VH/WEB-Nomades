import { useEffect, useState } from "react";
import InputText from "../../commons/inputs/InputText"
import Select from "../../commons/inputs/Select"
import styles from "./styles.module.scss"

export default function BandForm({
    setGub, 
    preloadPoomsaes, 
    preloadGub, 
    preloadName, 
    preloadKicks, 
    preloadKibonDonjaks, 
    preloadMeaning, 
    preloadTheory, 
    preloadBreakdown, 
    preloadStretching, 
    setTheory, 
    setMeaning, 
    setName, 
    setBreakdown, 
    setStretching, 
    setPoomsaes, 
    setKibonDonjaks, 
    setKicks, 
    PoomsaeService, 
    KibonDonjakService, 
    KickService
}) {
    const [gettedKicks, setGettedKicks] = useState([]);
    const [gettedKibonDonjaks, setGettedKibonDonjaks] = useState([]);
    const [gettedPoomsaes, setGettedPoomsaes] = useState([]);
    const [defaultValuePoomsaes, setDefaultValuePoomsaes] = useState("");
    const [defaultValueKicks, setDefaultValueKicks] = useState("");
    const [defaultValueKibonDonjaks, setDefaultValueKibonDonjaks] = useState("");

    useEffect(() => {
        if (
            (preloadPoomsaes && preloadKibonDonjaks && preloadKicks) && 
            (gettedPoomsaes && gettedKibonDonjaks && gettedKicks)
        ) {
            const defaultPoomsaes = [];
            preloadPoomsaes.map((id) => {
                const poomsae = gettedPoomsaes?.find((poomsae) => poomsae.id === id);
                defaultPoomsaes.push(poomsae ? {label: poomsae.name, value: poomsae.id} : null)
            }).filter(Boolean);

            const defaultKicks = [];
            preloadKicks.map((id) => {
                const kick = gettedKicks?.find((kick) => kick.id === id);
                defaultKicks.push(kick ? { label: kick.name, value: kick.id } : null);
            }).filter(Boolean);

            const defaultKibonDonjaks = [];
            preloadKibonDonjaks.map((id) => {
                const kibonDonjak = gettedKibonDonjaks?.find((kibonDonjak) => kibonDonjak.id === id);
                defaultKibonDonjaks.push(kibonDonjak ? {label: kibonDonjak.name, value: kibonDonjak.id} : null);
            }).filter(Boolean)

            setDefaultValuePoomsaes(defaultPoomsaes);
            setDefaultValueKicks(defaultKicks);
            setDefaultValueKibonDonjaks(defaultKibonDonjaks)
        }

    }, [preloadPoomsaes, preloadKicks, preloadKibonDonjaks, gettedPoomsaes, gettedKicks, gettedKibonDonjaks]);

    useEffect(() => {
        const loadKibonDonjaks = async () => {
            try {
                const result = await KibonDonjakService.get();
                if (result) {
                    setGettedKibonDonjaks(result);
                } else {
                    setGettedKibonDonjaks([])
                }
            } catch (error) {
                setGettedKibonDonjaks([])
            }
        }
    
        const loadKicks = async () => {
            try {
                const result = await KickService.get();
                if (result) {
                    setGettedKicks(result)
                } else {
                    setGettedKibonDonjaks([])
                }
            } catch (error) {
                setGettedKicks([])
            }
        }
    
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

        loadKibonDonjaks();
        loadKicks();
        loadPomsaes()
    }, [KibonDonjakService, KickService, PoomsaeService]);

    return (
        <div>
            <section className={styles.inputs}>
                <InputText
                    type="text"
                    placeholder="Gub (Somente número)"
                    required={true}
                    label={"Gub da Faixa"}
                    value={preloadGub}
                    onChange={(e) => setGub(e.target.value)}
                />
                <InputText
                    type="text"
                    placeholder="Nome"
                    required={true}
                    label={"Nome da Faixa"}
                    value={preloadName}
                    onChange={(e) => setName(e.target.value)}
                />
                <InputText
                    type="text"
                    placeholder="Quebramento"
                    required={true}
                    label={"Quebramento da Faixa"}
                    value={preloadBreakdown}
                    onChange={(e) => setBreakdown(e.target.value)}
                />
            </section>

            <section className={styles.inputs}>
                <Select label={"Poomsaes"} 
                defaultValue={defaultValuePoomsaes}
                onChange={(e) => {
                    const listPoomsaes = [];
                    e?.map((poomsae) => {
                        listPoomsaes.push(poomsae.value)
                    })
                    setPoomsaes(listPoomsaes)
                }}
                        options={gettedPoomsaes?.map((poomsae) => ({
                            label: poomsae.name,
                            value: poomsae.id
                        }))}>
                </Select>

                <Select label={"Kibon Donjaks"}
                defaultValue={defaultValueKibonDonjaks}
                onChange={(e) => {
                    const listKibonDonjaks = [];
                    e?.map((kibonDonjak) => {
                        listKibonDonjaks.push(kibonDonjak.value)
                    })
                    setKibonDonjaks(listKibonDonjaks)
                }}
                        options={gettedKibonDonjaks?.map((kibonDonjak) => ({
                            label: kibonDonjak.name,
                            value: kibonDonjak.id
                        }))} />
                        
                <Select label={"Chutes"} 
                defaultValue={defaultValueKicks}
                onChange={(e) => {
                    const listKicks = [];
                    e?.map((kick) => {
                        listKicks.push(kick.value)
                    })
                    setKicks(listKicks)
                }}
                        options={gettedKicks?.map((kick) => ({
                            label: kick.name,
                            value: kick.id
                        }))} />
            </section>
            <section className={styles.containerTextArea}>
                    <h5>Teoria</h5>
                    <textarea
                        rows={2}
                        placeholder="Descreva a Teoria da Faixa"
                        required={true}
                        value={preloadTheory}
                        onChange={(e) => setTheory(e.target.value)}
                    />
                    <h5>Significado</h5>
                    <textarea
                        rows={2}
                        placeholder="Qual o Significado da Faixa"
                        required={true}
                        value={preloadMeaning}
                        onChange={(e) => setMeaning(e.target.value)}
                    />
                    <h5>Flexibilidade</h5>
                    <textarea
                        rows={2}
                        placeholder="Quais os Movimentos de Flexibilidade"
                        required={true}
                        value={preloadStretching}
                        onChange={(e) => setStretching(e.target.value)}
                    />
            </section>
        </div>
    )
}