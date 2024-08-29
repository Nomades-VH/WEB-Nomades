
import React, {useEffect, useState} from "react";
import CrudForm from "../CrudForm";


function FormEdit({children, data, titlePage, messageError, messageSuccess, serviceEdit, defaultInputs, redirectTo}) {
    return (
        <CrudForm 
            data={data} 
            titlePage={titlePage} 
            messageError={messageError} 
            messageSuccess={messageSuccess} 
            crudService={serviceEdit} 
            defaultInputs={defaultInputs} 
            redirectTo={redirectTo}
            isUpdate={true}
        >{children}</CrudForm>
    )
}

export default FormEdit;