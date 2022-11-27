class MyClass {
    constructor() {
        this.listeChercheurs = null;
        this.listeEducations = null;
    }

    deleteActivity(activityList, idActivity) {
        if (activityList) {
            activityList = activityList.filter(edu => edu.idActivity !== idActivity)
        }
        return activityList
    }
}

export default (new MyClass());