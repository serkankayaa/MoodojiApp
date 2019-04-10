import React, { Component } from "react";
import { PermissionsAndroid, View, Platform } from "react-native";
import axios from 'axios';
import Contacts from "react-native-contacts";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "react-native-elements";

import API from '../../config/index';
import { styles } from "./index";

//Read User Contacts
export default class ReadContact extends Component {
  constructor() {
    super();
    this.state = {
      hasPermission: false,
      data: [],
      phoneNums: [],
      userPhone:"",
      userName: ""
    };
  }

  componentWillMount() {
    this.checkPermission();
  }

  //Get User Permission for contacts
  checkPermission() {
    Platform.OS === "android"
      ? PermissionsAndroid.request("android.permission.READ_CONTACTS", {
          title: "Contact Permission",
          message:
            "To Use this app, you need to give access to your contacts 🤓",
          buttonPositive: "Sure ! 😎"
        })
          .then(getPermission => {
            if (getPermission === "denied") {
              console.log("Permission Denied");
            } else {
              Contacts.getAll((err, contactList) => {
                if (err === "denied") {
                  console.log("Contact Access Error");
                } else {
                  let contacts = contactList;
                }
              });
            }
          })
          .catch(err => {
            console.log(err);
          })
      : Contacts.requestPermission((err, result) => {
          if (result === "authorized") {
            Contacts.getAll((err, contactList) => {
              if (contactList.length > 0) {
                contactList.forEach((contactItem, index, contactArr) => {
                  contactItem.phoneNumbers.forEach(
                    (phoneItem, index, phoneArr) => {
                      if (
                        phoneItem.label === "mobile" ||
                        phoneItem.label === "work"
                      ) {
                        this.state.phoneNums.push(phoneItem.number);
                      }
                    }
                  );
                });
              } else {
                console.log(err);
              }
            });
          } else {
            console.log(err);
          }
        });
  }
  shouldComponentUpdate(nextprops,nextState){
      console.log(nextState);
      return true;
  }
  //TO-DO Status text'e göre hatayı ekrana
  postUser(){
    console.log("Sending User data");
    axios.post(`${API}/postUser`,{
        user_name : this.state.userName,
        phone_number : this.state.userPhone
    }).then(result => {
        console.log(result)
    }).catch(err => {
        console.log(`Catched Error: ${err}`)
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Input
            inputStyle={{color:'#fff'}}
            placeholder="Username"
            placeholderTextColor="#fff"
            leftIcon={{
              type: "font-awesome",
              name: "chevron-left",
              color: "#fff",
              marginRight: 10
            }}
            onChangeText={(nameInput) => this.setState({userName: nameInput})}
            style={{color:'#fff'}}
          />
          <Input
            inputStyle={{color:'#fff'}}
            placeholder="Phone number"
            placeholderTextColor="#fff"
            onChangeText={(phoneInput) => this.setState({userPhone: phoneInput})}
            leftIcon={
              <Icon
                name="user"
                size={24}
                color="#fff"
                style={{ marginRight: 10 }}
              />
            }
          />
        </View>
        <View
          style={{
            width: 250,
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 60,
            marginTop:15
          }}
        >
          <Button
            icon={<Icon name="sign-in" size={15} color="white" style={{marginRight:10}}/>}
            title="Register"
            onPress={this.postUser.bind(this)}
          />
        </View>
      </View>
    );
  }
}
