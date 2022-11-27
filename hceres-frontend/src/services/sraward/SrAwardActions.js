import axios from "axios";
import MyGlobalVar from "../MyGlobalVar";

export const fetchListSrAwards = async () => {
    if (!MyGlobalVar.listeSrAwards) {
        const url = "http://localhost:9000/SrAwards";
        const response = await axios.get(url);
        MyGlobalVar.listeSrAwards = response.data;
    }
    return MyGlobalVar.listeSrAwards;
}

export const addSrAward  = async (data) => {
    const url = "http://localhost:9000/SrAward/Create";
    return await axios.post(url, data).then(response => {
        if (MyGlobalVar.listeSrAwards)
            // using method push will use same reference of table,
            // so it will not trigger change state, therefore creating copy of the array
            // using concat method
            MyGlobalVar.listeSrAwards = MyGlobalVar.listeSrAwards.concat([response.data])
        return response
    });
}

export const deleteSrAward  = async (idActivity) => {
    const url = "http://localhost:9000/SrAward/Delete/" + idActivity;
    return await axios.delete(url).then(response => {
        // change to a new reference => cause change state immediately
        MyGlobalVar.listeSrAwards = MyGlobalVar.deleteActivity(MyGlobalVar.listeSrAwards, idActivity)
        return response
    });
}