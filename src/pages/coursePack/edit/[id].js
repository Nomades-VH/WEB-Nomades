import React, {useEffect, useState} from "react";
import BandService from "../../../services/band";
import KibonDonjakService from "../../../services/kibon_donjak";
import KickService from "../../../services/kick";
import PoomsaeService from "../../../services/poomsae";
import BandForm from "../../../components/Band/Form";
import FormEdit from "../../../components/commons/Forms/FormEdit";
import { useParams } from "react-router-dom";

export default function EditBand() {
    const {id} = useParams();
    const [gub, setGub] = useState('');
    const [name, setName] = useState('');
    const [meaning, setMeaning] = useState('');
    const [theory, setTheory] = useState('');
    const [breakdown, setBreakdown] = useState('');
    const [stretching, setStretching] = useState('');
    const [kibonDonjaks, setKibonDonjaks] = useState([]);
    const [poomsaes, setPoomsaes] = useState([]);
    const [kicks, setKicks] = useState([]);

    useEffect(() => {
        const loadBand = async (id) => {
            BandService.get_by_id(id).then((response) => {

                setGub(response.gub);
                setName(response.name);
                setMeaning(response.meaning);
                setTheory(response.theory);
                setBreakdown(response.breakdown);
                setStretching(response.stretching);
                setPoomsaes(response.poomsaes.map((poomsae) => poomsae.id));
                setKicks(response.kicks.map((kick) => kick.id))
                setKibonDonjaks(response.kibon_donjaks.map((kibonDonjak) => kibonDonjak.id))

            })
        }
        
        if (id) loadBand(id)
    }, [])

    const defaultInputs = async () => {
        setGub('')
        setName('');
        setMeaning('');
        setTheory('');
        setBreakdown('');
        setStretching('');
        setKibonDonjaks([]);
        setPoomsaes([]);
        setKicks([]);
    }

    return (
        <FormEdit data={{
            id,
            gub,
            name,
            meaning,
            theory,
            breakdown,
            stretching,
            poomsaes,
            kibonDonjaks,
            kicks
        }}
                    titlePage={"Editar Faixa"} messageSuccess={"Faixa editada com sucesso"}
                    messageError={"Erro ao editar faixa."} serviceEdit={BandService.update}
                    defaultInputs={defaultInputs}
                    redirectTo={"/apostilas"}
        >
            <BandForm 
            preloadGub={gub} 
            preloadName={name} 
            preloadMeaning={meaning} 
            preloadTheory={theory} 
            preloadBreakdown={breakdown} 
            preloadStretching={stretching} 
            preloadKibonDonjaks={kibonDonjaks} 
            preloadPoomsaes={poomsaes} 
            preloadKicks={kicks} 
            setGub={setGub} 
            setName={setName} 
            setMeaning={setMeaning} 
            setTheory={setTheory} 
            setBreakdown={setBreakdown} 
            setStretching={setStretching} 
            setKibonDonjaks={setKibonDonjaks} 
            setPoomsaes={setPoomsaes} 
            setKicks={setKicks} 
            KibonDonjakService={KibonDonjakService} 
            PoomsaeService={PoomsaeService} 
            KickService={KickService} />
        </FormEdit>
    )
}