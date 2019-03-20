import React, {Component} from 'react';
import {StyleSheet,SafeAreaView} from 'react-native';
import OfflineNotice from './app/networkConnection';
import ReadContacts from './app/readContacts';

export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
         <OfflineNotice/>
         <ReadContacts/>        
    </SafeAreaView>
    );
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
   }
});
