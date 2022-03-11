import httpClient from '../http-common'

const getAll = () => {
    return httpClient.get('/Awards');
}

const create = (data) => {
    return httpClient.post("/SrAwards", data);
}

const get = id =>{
     return httpClient.get('/Awards/${id}');

}

const update = (data) =>{
    return httpClient.put('/updateSrAward', data);
}
const remove = id => {
    return httpClient.delete(`/deleteSrAward/${id}`);

}
export default {getAll,create, get, update, remove} ;