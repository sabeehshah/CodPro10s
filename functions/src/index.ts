import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

admin.initializeApp(functions.config().firebase);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.updatePlayerStats = functions.firestore.document("series/{seriesID}/maps/{mapID}/teams/{teamID}/players/{pID}")
    .onUpdate((change, context) => {
        const newValue = change.after.data();
        const oldValue = change.before.data();

        const oldKills = oldValue.kills
        const newKills = newValue.kills

        const oldDeaths = oldValue.deaths
        const newDeaths = newValue.deaths

        const oldDamage = oldValue.damage
        const newdamage = newValue.damage


        return admin.firestore().doc(`players/${newValue.playerID}`)
            .get().then(snapshot => {

                return snapshot;
            }).then(val => {
                var newTotalKills
                var newTotalDeaths
                var newTotalDamage

                const kills = val.data().kills
                const deaths = val.data().deaths
                const damage = val.data().totalDamage
                if (kills == 0) {
                    newTotalKills = 0 + newKills
                } else {
                    newTotalKills = (kills) - (oldKills) + (newKills)
                }

                if(deaths == 0){
                    newTotalDeaths = 0 + newDeaths
                }else{
                    newTotalDeaths = (deaths) - (oldDeaths) + (newDeaths)
                }

                if(damage == 0){
                    newTotalDamage = 0 + newdamage
                }else{
                    newTotalDamage = (damage) - (oldDamage) + (newdamage)
                }
                

               // console.log("total kills: " + newTotalKills + "old kills: " + oldKills + "newKills: " + newKills)

                return admin.firestore().doc(`players/${newValue.playerID}`).set({kills:newTotalKills, deaths:newTotalDeaths, totalDamage:
                newTotalDamage},{merge:true})
                .then(res=>{
                  return console.log(res)
                })
                // .then((res)=>{
                //     return console.log(res)
                // }).catch((err)=>{
                //     console.log(err)
                // })
            }).catch(err => {
               return console.log(err)
            })
    })
