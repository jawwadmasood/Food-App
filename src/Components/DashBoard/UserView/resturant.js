import React from 'react';
import { withRouter } from "react-router-dom";
// helper
import MaterialTable from 'material-table';

import firebase from '../../../config/firebase';

var db = firebase.database();
// var auth = firebase.auth();
class Resturant extends React.Component {
    state = {
        value: 0,
        text: '',
        search: false,

        //sort data
        columns: [
            { title: 'Name', field: 'name' },
            { title: 'Food Item', field: 'foodItem' },
            { title: 'City', field: 'city' },
            {
                title: 'Rating',
                field: 'rating',
                // lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
            },
        ],

        data: [

            {
                name: '',
                foodItem: '',
                city: '',
                rating: '',
                uid: '',

            },
        ],
        abc: []
    };

    componentDidMount() {

        // let localUid= localStorage.getItem("uid");
        // let uID= JSON.parse(localUid)
        // // console.log(uID)
        db.ref('users/').on('value', (user_data) => {
            // console.log(user_data)
            var UserData = user_data.val();
            console.log(UserData)
            // var objData=Object.entries(user_data.val())
            // // console.log('Object====>>', objData)
            let array = []

            for (var key in UserData) {

                UserData[key].keyId = key
                console.log(UserData[key].account.category)
                if (UserData[key].account.category === "restaurant") {
                    array.push(UserData[key].account)
                }
            }
            //     array.forEach((v, i ) => {
            //         // console.log(v)
            //           this.setState({
            //             abc: v
            //         })
            //     })
            // console.log(array)
            this.setState({
                data: array
            })
        })

    }




    render() {
        const { data } = this.state;
        console.log(data)
        return (
            <div >
                <MaterialTable
                    title="Available Restaurants"
                    columns={this.state.columns}
                    data={data}
                    actions={[
                        {
                            icon: 'more',
                            tooltip: 'Detail',
                            onClick: (event, rowData) => {
                                // console.log(event)
                                localStorage.setItem('restUid', JSON.stringify(rowData.uid))
                                //   localStorage.setItem('restUid', rowData.uid)
                                this.props.history.push("/DetailUserScreen")
                                // console.log(rowData)
                                console.log(rowData.uid)
                            }
                        }
                    ]}


                // editable={{
                //     onRowAdd: newData =>
                //         new Promise(resolve => {
                //             setTimeout(() => {
                //                 resolve();
                //                 const data = [...this.state.data];
                //                 data.push(newData);
                //                 this.setState({ ...this.state, data });
                //             }, 600);
                //         }),
                //     onRowUpdate: (newData, oldData) =>
                //         new Promise(resolve => {
                //             setTimeout(() => {
                //                 resolve();
                //                 const data = [...this.state.data];
                //                 data[data.indexOf(oldData)] = newData;
                //                 this.setState({ ...this.state, data });
                //             }, 600);
                //         }),
                //     onRowDelete: oldData =>
                //         new Promise(resolve => {
                //             setTimeout(() => {
                //                 resolve();
                //                 const data = [...this.state.data];
                //                 data.splice(data.indexOf(oldData), 1);
                //                 this.setState({ ...this.state, data });
                //             }, 600);
                //         }),
                // }}
                />

            </div>
        );
    }
}


export default withRouter(Resturant);