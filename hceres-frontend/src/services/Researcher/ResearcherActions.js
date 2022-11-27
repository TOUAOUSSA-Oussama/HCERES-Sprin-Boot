import axios from "axios";
import MyGlobalVar from "../MyGlobalVar";

export const fetchListResearchers = async function fetchData() {
    if (!MyGlobalVar.listeChercheurs) {
        const url = "http://localhost:9000/Researchers";
        const response = await axios.get(url);
        MyGlobalVar.listeChercheurs = response.data;
    }
    return MyGlobalVar.listeChercheurs;
}

// currently not caching activities to facilitate its update on changes
// otherwise create a global map as {researcherId:[listActivities]}
export const fetchResearcherActivities = async function fetchData(researcherId) {
    const url = "http://localhost:9000/Researcher/" + researcherId + "/Activities";
    const response = await axios.get(url);
    return response.data
}

