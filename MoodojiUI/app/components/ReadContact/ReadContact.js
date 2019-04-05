import React, { Component } from 'react'
import {PermissionsAndroid, View, Text, Platform, FlatList} from 'react-native';
import Contacts from 'react-native-contacts';
import {getAllUser} from './helper.js';
import {styles} from './index';

//Read User Contacts
export default class ReadContact extends Component{
    constructor(){
        super();
        this.state = {
            hasPermission : false,
            data : [],
            phoneNums : []
        };
    }

    componentWillMount(){
        this.checkPermission();
    }
    
    //Get User Permission for contacts
    checkPermission(){
        Platform.OS === 'android' ?
            PermissionsAndroid.request("android.permission.READ_CONTACTS",{
                title:"Contact Permission",
                message:"To Use this app, you need to give access to your contacts 🤓",
                buttonPositive: "Sure ! 😎",
            }).then(getPermission => {
                console.log(getPermission);
                if(getPermission === 'denied'){
                    console.log("Permission Denied");
                }else{
                    Contacts.getAll((err,contactList) => {
                        if(err === 'denied'){
                            console.log("Contact Access Error");
                        }else{
                            let contacts = contactList;
                            console.log(contacts);
                        }
                    })
                }
            }).catch(err => {
                console.log(err);
            })
            : Contacts.requestPermission((err,result) => {
                console.log(result);
                if(result === 'authorized'){
                    Contacts.getAll((err,contactList) =>{
                        if(contactList.length > 0){
                            console.log(contactList);
                            contactList.forEach((contactItem,index,contactArr) => {
                                  contactItem.phoneNumbers.forEach((phoneItem,index,phoneArr) =>{   
                                      if(phoneItem.label === 'mobile' || phoneItem.label === 'work'){
                                      this.state.phoneNums.push(phoneItem.number);                         
                                    }
                                });
                            });
                            console.log(this.state.phoneNums);
                            console.log(getAllUser);
                        }else{
                            console.log(err);
                        }
                    });
                }else{
                    console.log(err);
                }
            });
    }
    
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.readContact}>Hello World</Text>
                <FlatList/>
            </View>
        )
    }
}