import httpClient from '../http-common'

const getAll = () => {
    return httpClient.get('/ScientificExpertise');
}

const create = (data) => {
    return httpClient.post("/ScientificExpertise", data);
}

const get = id =>{
     return httpClient.get('/ScientificExpertise/${id}');

}

const update = (data) =>{
    return httpClient.put('/updateScientificExpertise', data);
}
const remove = id => {
    return httpClient.delete('/deleteScientificExpertise/${id}');

}
export default {getAll,create, get, update, remove} ;