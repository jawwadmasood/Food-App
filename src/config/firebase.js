import * as firebase from 'firebase';
import 'firebase/storage';


// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAPL_eEr1n4Bz043g8olfA0ylhkWsQcyMI",
    authDomain: "food-delivery-app-865d0.firebaseapp.com",
    databaseURL: "https://food-delivery-app-865d0.firebaseio.com",
    projectId: "food-delivery-app-865d0",
    storageBucket: "food-delivery-app-865d0.appspot.com",
    messagingSenderId: "834669992468",
    appId: "1:834669992468:web:ee042cb933eca4c2"

};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.database();
var auth = firebase.auth();
var storage = firebase.storage();
const fbAuthProvider = new firebase.auth.FacebookAuthProvider();
// var uid = firebase.auth().currentUser.uid;
// console.log(uid)

// function getRealtimeTOdo() {
//     return new Promise((resolve, reject) => {
//         //one time data retreive
//         // get array

//         // db.collection('todo').get().then(snapshot => {
//         // console.log(snapshot)
//         //.get().then is used for one time data retreive

//         //for real time data retreive
//         db.collection('todo').onSnapshot(snapshot => {

//             const temp = [];
//             // forEach for loop to get child data
//             snapshot.forEach(doc => {
//                 //    console.log('data===>>', doc.data());
//                 //    console.log('data id===>>', doc.id);
//                 const obj = { id: doc.id, ...doc.data() }
//                 temp.push(obj);
//             })
//             console.log('temp ===>>>', temp);
//             resolve(temp);
//         })
//     })
// }





export default firebase;
export {
    auth,
    db,
    storage,
    fbAuthProvider,
}