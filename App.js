import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import GameController from './components/GameController';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <GameController />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
});
