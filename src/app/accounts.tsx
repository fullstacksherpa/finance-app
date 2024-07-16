import {View, Text, StyleSheet, TextInput, Button} from 'react-native'
import AccountList from '../components/AccountList'
import {Entypo} from '@expo/vector-icons'

export default function AccountsScreen() {

	const createAccount = () => {
		console.warn('create account')
	}
	return (
		<View style={{gap: 5, padding: 5}}>
			<View style={styles.header}>
				<Text>Name</Text>
				<Text>CAP</Text>
				<Text>TAP</Text>
			</View>
			<AccountList />
			<View style={styles.inputRow}>
				<TextInput placeholder='Name' style={styles.input} />
				<TextInput placeholder='CAP %' style={styles.input} />
				<TextInput placeholder='TAP %' style={styles.input} />
			</View>
			<Button title="Add account" onPress={createAccount} />
		</View>
	)
}
const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 10,
	},
	inputRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 10,
		backgroundColor: 'white'
	},
	input: {
		flex: 1
	}
})