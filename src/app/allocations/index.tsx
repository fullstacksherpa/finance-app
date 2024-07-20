import {View, Text} from 'react-native';
import {Link} from 'expo-router';

export default function HomeScreen() {
  return (
    <View><Text>Index page of alocation</Text>
      <Link href='/allocations/new'>Go to new page</Link>
    </View>
  );
}
