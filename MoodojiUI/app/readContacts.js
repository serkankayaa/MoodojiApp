import React, { Component } from 'react'
import {PermissionsAndroid,View,Text,ActivityIndicator,StyleSheet} from 'react-native'
import Contacts, { checkPermission } from 'react-native-contacts';

export default class ReadContacts extends Component {
    constructor(){
        super();
        this.state = {
            hasPermission : false,
        }
    }
    componentDidMount(){
        this.CheckPermission();
    }

    CheckPermission(){
        PermissionsAndroid.request("android.permission.READ_CONTACTS",{
            title: "Permission For Contacts",
            "message" : "We need to access your contacts to run this app",
            "buttonPositive" : "Ok"
        }).then(getPermission => {
            console.log("Permission : " + getPermission);
            if(getPermission === "denied"){
                console.log("Permission Denied");
                this.setState({
                    hasPermission : false
                });
            }else{
                this.setState({
                    hasPermission : true
                });
                console.log("Trying to access Contacts");
                Contacts.getAll((err,contactlist) => {
                        if(err === "denied"){
                            console.log("Contacts denied");
                        }else{
                            console.log(contactlist);
                        }
                });
            }
        }).catch(err => {
            console.log("Catched error: " + err);
        });     
    }
    render(){
        console.log("hasPermission " + this.state.hasPermission);
        if(this.state.hasPermission){
            return(
            <View style={styles.centerContainer}>
                <ActivityIndicator
                animating = {true}
                color = 'green'
                hidesWhenStopped = {this.state.hasPermission}
                size = "large"
                />
                <Text style={styles.textProps}>Contacts are loading. Please Wait 🤩</Text>
            </View>
            )        
        }else{
            return(
                <View style={styles.centerContainer}>
                    <Text style={styles.textProps}>To use this app we need to access your contacts 🤔</Text>
                </View> 
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    centerContainer : {
        flex:1,
        justifyContent:'center',
        alignItems : 'center'
    },
    textProps : {
        fontSize : 18,
        fontFamily : 'sans-serif'
    }
});

// Contacts.getAll((error,contacts) =>{
                //     if(contacts.length <= 0){
                //         console.log(contacts.length);
                //         this.setState({
                //             hasContacts : false,
                //             hasPermission : true
                //         });
                //     }else{
                //         this.setState({
                //             hasPermission : true
                //         });
                //     }