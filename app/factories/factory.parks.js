"use strict";

app.factory('forestFactory', function($q, $http, firebaseCredentials, AuthFactory){

	let getParks = () => {
        let parks = [];
        return $q((resolve, reject)=>{
            $http.get(`${firebaseCredentials.databaseURL}/forests.json`)
            .then((forestObject)=>{
                let forestCollection = forestObject.data;
                Object.keys(forestCollection).forEach((key)=> {
                    forestCollection[key].id = key;
                    parks.push(forestCollection[key]);
                });
                console.log("parks", parks);
                resolve(parks);
            })
            .catch((error)=>{
                reject(error);
            });
        });
    };

	let getFavoriteParks = (user) => {
        let favoriteParks = [];
        return $q((resolve, reject)=>{
            $http.get(`${firebaseCredentials.databaseURL}/visitor_favorites.json?orderBy="visitor"&equalTo="${user}"`)
            .then((forestObject)=>{
                let forestCollection = forestObject.data;
                Object.keys(forestCollection).forEach((key)=> {
                    forestCollection[key].id = key;
                    favoriteParks.push(forestCollection[key]);
                });
                resolve(favoriteParks);
            })
            .catch((error)=>{
                reject(error);
            });
        });
    };

    let addFavoriteParks = (park) => {
        let user = AuthFactory.getUser();
        let parkObject = {};
        let currentUser = AuthFactory.getUser();
        parkObject.visitor = currentUser;
        parkObject.forest = park;
        console.log("parkObject", parkObject);
        return $q((resolve, reject) => {
            $http.post(`${firebaseCredentials.databaseURL}/visitor_favorites.json`,
                angular.toJson(parkObject))
                .then((ObjectFromFirebase) => {
                    resolve(ObjectFromFirebase);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    let deleteFavoriteParks = (id) => {
        console.log("delete in factory", id);
        return $q((resolve, reject)=>{
            $http.delete(`${firebaseCredentials.databaseURL}/visitor_favorites/${id}.json`)
            .then((ObjectFromFirebase)=> {
                resolve(ObjectFromFirebase);
            });
        });
    };

    return {getParks, getFavoriteParks, addFavoriteParks, deleteFavoriteParks};
});