import {View, Text, StatusBar, StyleSheet} from 'react-native';
import {Link, Stack} from 'expo-router';
import AllocationList from '@/src/components/AllocationsList';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: 'Allocations'}} />
      <Link href='/allocations/new' asChild><Text style={styles.button}>Go to new page</Text></Link>
      <AllocationList />
      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: 'green',
    color: 'white',
    margin: 10,
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    borderRadius: 5,
    overflow: 'hidden',
  }
})
