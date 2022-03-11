import httpClient from '../http-common'

const getAll = () => {
    return httpClient.get('/EssaiClinique');
}

const create = (data) => {
    return httpClient.post("/EssaiClinique", data);
}

const get = id =>{
     return httpClient.get('/EssaiClinique/${id}');

}

const update = (data) =>{
    return httpClient.put('/updateEssaiClinique', data);
}
const remove = id => {
    return httpClient.delete('/deleteEssaiClinique/${id}');

}
export default {getAll,create, get, update, remove} ;