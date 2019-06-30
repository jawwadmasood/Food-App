// import firebase from '../config/firebase';
// const db = firebase.database();

const update_user = (user) => {
    // console.log(user)
    return {
        type: "SET_USER",
        data: user
    }
}

const remove_user = () => {
    return {
        type: "REMOVE_USER"
    }
}

// const update_todos = () => {
//     return (dispatch) => {
//         db.collection('todo').onSnapshot(snapshot => {
//             const temp = [];
    
//             snapshot.forEach(doc => {
//                 const obj = {id: doc.id, ...doc.data()}
//                 temp.push(obj);
//             })
//             console.log('getRealtimeTodo ===>', temp);
//             dispatch({
//                 type: 'UPDATE_TODOS',
//                 payload: temp
//             })
//         })
//     }
// }

export {
    update_user,
    remove_user,
    // update_todos
}