import { useEffect, useState } from "react";
import FormEdit from "../../../components/commons/Forms/FormEdit";
import { useParams } from "react-router-dom";
import KibonDonjakService from "../../../services/kibon_donjak";
import KibonDonjakForm from "../../../components/KibonDonjak/Form";

export default function EditKibonDonjak() {
    const {id} = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const loadKibonDonjak = async (id) => {
            const kibonDonjak = await KibonDonjakService.get_by_id(id);

            if (kibonDonjak) {
                setName(kibonDonjak.name)
                setDescription(kibonDonjak.description)
            }
        }

        loadKibonDonjak(id)
    }, [])

    const defaultInputs = async () => {
        setName('')
        setDescription('')
    }

    return (
        <FormEdit data={{id, name, description}} defaultInputs={defaultInputs} serviceEdit={KibonDonjakService.update}
                    titlePage={"Editar kibonDonjak"} messageSuccess={"kibonDonjak editado com sucesso"}
                    messageError={"Erro ao editar o kibonDonjak"} redirectTo={'/kibon_donjak'}>
            <KibonDonjakForm name={name} description={description} setName={setName} setDescription={setDescription} />
        </FormEdit>
    )
}