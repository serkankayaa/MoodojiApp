import {StyleSheet, Dimensions} from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    offlineContainer: {
      backgroundColor: '#efcf1c',
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom:10,
      width,
    },
    offlineText: { color: '#fff' }
  });