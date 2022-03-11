import httpClient from '../http-common'

const getAll = () => {
    return httpClient.get('/IncomingMobility');
}

const create = (data) => {
    return httpClient.post("/IncomingMobility", data);
}

const get = id =>{
     return httpClient.get('/IncomingMobility/${id}');

}

const update = (data) =>{
    return httpClient.put('/updateIncomingMobility', data);
}
const remove = id => {
    return httpClient.delete('/deleteIncomingMobility/${id}');

}
export default {getAll,create, get, update, remove} ;