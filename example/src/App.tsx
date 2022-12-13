import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { CheckIp, getIp } from 'react-native-check-ip';

export default function App() {
  const [firstResult, setFirstResult] = React.useState<CheckIp | undefined>();

  async function getContent() {
    const first = await getIp();
    setFirstResult(first);
  }

  React.useEffect(() => {
    getContent();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text>IP: {firstResult?.ipv4}</Text>
      </View>
      <View style={styles.box}>
        <Text>IS Public IP: {firstResult?.isPublicIp ? 'YES' : 'NO'}</Text>
      </View>
      <View style={styles.box}>
        <Text>IS LOCAL IP: {firstResult?.isLocalIp ? 'YES' : 'NO'}</Text>
      </View>
      <View style={styles.box}>
        <Text>Message: {firstResult?.message}</Text>
      </View>
      <View style={styles.box}>
        <Text>Origin: {firstResult?.origin}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    marginHorizontal: 40,
    padding: 10,
  },
});
