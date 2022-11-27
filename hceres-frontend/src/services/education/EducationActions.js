import axios from "axios";
import MyGlobalVar from "../MyGlobalVar";

export const fetchListEducations = async () => {
    if (!MyGlobalVar.listeEducations) {
        const url = "http://localhost:9000/Educations";
        const response = await axios.get(url);
        MyGlobalVar.listeEducations = response.data;
    }
    return MyGlobalVar.listeEducations;
}

export const addEducation  = async (data) => {
    const url = "http://localhost:9000/Education/Create";
    return await axios.post(url, data).then(response => {
        if (MyGlobalVar.listeEducations)
            // using method push will use same reference of table,
            // so it will not trigger change state, therefore creating copy of the array
            // using concat method
            MyGlobalVar.listeEducations = MyGlobalVar.listeEducations.concat([response.data])
        return response
    });
}

export const deleteEducation  = async (idActivity) => {
    const url = "http://localhost:9000/Education/Delete/" + idActivity;
    return await axios.delete(url).then(response => {
        // change to a new reference => cause change state immediately
        MyGlobalVar.listeEducations = MyGlobalVar.deleteActivity(MyGlobalVar.listeEducations, idActivity)
        return response
    });
}