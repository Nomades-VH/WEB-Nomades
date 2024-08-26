import { useEffect, useState } from "react";
import FormEdit from "../../../components/commons/Forms/FormEdit";
import KickService from "../../../services/kick";
import KickForm from "../../../components/Kick/Form";
import { useParams } from "react-router-dom";

export default function EditKick() {
    const {id} = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const loadKick = async (id) => {
            const kick = await KickService.get_by_id(id);

            if (kick) {
                setName(kick.name)
                setDescription(kick.description)
            }
        }

        loadKick(id)
    }, [id])

    const defaultInputs = async () => {
        setName('')
        setDescription('')
    }

    return (
        <FormEdit data={{id, name, description}} defaultInputs={defaultInputs} serviceEdit={KickService.update}
                    titlePage={"Editar Chute"} messageSuccess={"Chute editado com sucesso"}
                    messageError={"Erro ao editar o chute"} redirectTo={'/chute'}>
            <KickForm name={name} description={description} setName={setName} setDescription={setDescription} />
        </FormEdit>
    )
}