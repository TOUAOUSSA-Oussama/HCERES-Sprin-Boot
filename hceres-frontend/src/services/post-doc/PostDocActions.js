import axios from "axios";
import MyGlobalVar from "../MyGlobalVar";

export const fetchListPostDocs = async () => {
    if (!MyGlobalVar.listePostDocs) {
        const response = await axios.get("http://localhost:9000/PostDocs");
        MyGlobalVar.listePostDocs = response.data;
    }
    return MyGlobalVar.listePostDocs;
}

export const addPostDoc  = async (data) => {
    return await axios.post("http://localhost:9000/PostDoc/Create", data).then(response => {
        if (MyGlobalVar.listePostDocs)
            // using method push will use same reference of table,
            // so it will not trigger change state, therefore creating copy of the array
            // using concat method
            MyGlobalVar.listePostDocs = MyGlobalVar.listePostDocs.concat([response.data])
        return response
    });
}

export const deletePostDoc  = async (idActivity) => {
    return await axios.delete("http://localhost:9000/PostDoc/Delete/" + idActivity).then(response => {
        // change to a new reference => cause change state immediately
        MyGlobalVar.listePostDocs = MyGlobalVar.deleteActivity(MyGlobalVar.listePostDocs, idActivity)
        return response
    });
}