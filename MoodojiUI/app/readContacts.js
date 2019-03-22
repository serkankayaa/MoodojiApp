import React, { Component } from "react";
import {
  PermissionsAndroid,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Platform,
  Button,
} from "react-native";
import Contacts from "react-native-contacts";

export default class ReadContacts extends Component {
  constructor() {
    super();
    this.state = {
      hasPermission: false,
      data: [],
      showIndicator: true
    };
  }

  componentDidMount() {
    this.checkPermission();
  }

  //TODO - If user denies || If length is zero
  checkPermission() {
    if (Platform.OS === "android") {
      PermissionsAndroid.request("android.permission.READ_CONTACTS", {
        title: "Permission For Contacts",
        message: "We need to access your contacts to run this app",
        buttonPositive: "Ok"
      }).then(getPermission => {
        console.log("Permission : " + getPermission);
        if (getPermission === "denied") {
          console.log("Permission Denied");
        } else {
          this.setState({
            hasPermission: true
          });
          Contacts.getAll((err, contactlist) => {
            if (err === "denied") {
              console.log("Contacts denied");
            } else {
              setTimeout(() => {
                this.setState({
                  data: contactItem,
                  showIndicator: false
                });
              }, 1500);
            }
          }).catch(err => {
            console.log("Catched error: " + err);
          });
        }
      });
    } else if (Platform.OS === "ios") {
      Contacts.requestPermission((err, result) => {
        console.log(result);
        this.setState({
          hasPermission: true
        });
        if (result === "authorized") {
          Contacts.getAll((err, contactIOS) => {
            contactIOS.forEach((contactItem, index, contactArr) => {
              console.log(contactItem);
              setTimeout(() => {
                this.setState({
                  data: contactItem,
                  showIndicator: false
                });
              }, 1500);
            });
          });
        }
      });
    }
  }
  render() {
    var indicator = this.state.showIndicator ? (
      <View style={styles.centerContainer}>
        <ActivityIndicator animating={true} color="green" size="large" />
        <Text style={styles.textProps}>
          Contacts are loading. Please Wait 🤩
        </Text>
      </View>
    ) : null;

    if (this.state.hasPermission) {
      return <View style={styles.centerContainer}>{indicator}</View>;
    } else {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.textProps}>
            To use this app we need your contacts 🤔
          </Text>
          <Button title="Click here to give access 😎" />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textProps: {
    fontSize: 18
  }
});
