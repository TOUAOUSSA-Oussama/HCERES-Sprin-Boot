import axios from "axios";
import MyGlobalVar from "../MyGlobalVar";

export const fetchListPlatforms = async () => {
    if (!MyGlobalVar.listePlatforms) {
        const url = "http://localhost:9000/Platforms";
        const response = await axios.get(url);
        MyGlobalVar.listePlatforms = response.data;
    }
    return MyGlobalVar.listePlatforms;
}

export const addPlatform  = async (data) => {
    const url = "http://localhost:9000/Platform/Create";
    return await axios.post(url, data).then(response => {
        if (MyGlobalVar.listePlatforms)
            // using method push will use same reference of table,
            // so it will not trigger change state, therefore creating copy of the array
            // using concat method
            MyGlobalVar.listePlatforms = MyGlobalVar.listePlatforms.concat([response.data])
        return response
    });
}

export const deletePlatform  = async (idActivity) => {
    const url = "http://localhost:9000/Platform/Delete/" + idActivity;
    return await axios.delete(url).then(response => {
        // change to a new reference => cause change state immediately
        MyGlobalVar.listePlatforms = MyGlobalVar.deleteActivity(MyGlobalVar.listePlatforms, idActivity)
        return response
    });
}