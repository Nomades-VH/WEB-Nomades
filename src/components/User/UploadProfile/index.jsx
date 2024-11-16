import { useState } from "react"
import UserService from "../../../services/user"
import { useNavigate } from "react-router-dom";

export default function UploadProfile() {
    const [profile, setProfile] = useState();
    const navigate = new useNavigate();

    const onSubmit = async () => {
        const response = await UserService.upload_profile_image(profile)

        if (response) {
            navigate('/')
        } else {
            throw
        }
    }

    return (
        
    )
}