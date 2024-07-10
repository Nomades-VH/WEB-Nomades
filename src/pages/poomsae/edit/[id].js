import { useEffect, useState } from "react";
import FormEdit from "../../../components/commons/Forms/FormEdit";
import PoomsaeService from "../../../services/poomsae";
import PoomsaeForm from "../../../components/Poomsae/Form";
import { useParams } from "react-router-dom";

export default function EditPoomsae() {
    const {id} = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const loadpoomsae = async (id) => {
            const poomsae = await PoomsaeService.get_by_id(id);

            if (poomsae) {
                setName(poomsae.name)
                setDescription(poomsae.description)
            }
        }

        loadpoomsae(id)
    }, [])

    const defaultInputs = async () => {
        setName('')
        setDescription('')
    }

    return (
        <FormEdit data={{id, name, description}} defaultInputs={defaultInputs} serviceEdit={PoomsaeService.update}
                    titlePage={"Editar Poomsae"} messageSuccess={"Poomsae editado com sucesso"}
                    messageError={"Erro ao editar o poomsae"} redirectTo={'/poomsae'}>
            <PoomsaeForm name={name} description={description} setName={setName} setDescription={setDescription} />
        </FormEdit>
    )
}