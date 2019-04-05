import React, { Component } from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import ReadContacts from "./app/components/ReadContact/ReadContact.js";
import NetworkStatus from "./app/components/NetworkStatus/NetworkStatus.js";

export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <NetworkStatus />
        <ReadContacts />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#292B33"
  },

});
