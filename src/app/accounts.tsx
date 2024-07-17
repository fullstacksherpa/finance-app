import {View, Text, StyleSheet, TextInput, Button} from 'react-native'
import AccountList from '../components/AccountList'
import {useState} from 'react';
import database, {accountsCollection} from '../db';


export default function AccountsScreen() {
	const [name, setName] = useState('');
	const [cap, setCap] = useState('');
	const [tap, setTap] = useState('');

	const createAccount = () => {
		console.warn('create account')
	}

	const onRead = async () => {
		const accounts = await accountsCollection.query().fetch();
		console.log(accounts)

		// await database.write(async () => {
		// 	await accountsCollection.create(account => {
		// 		account.name = 'test12';
		// 		account.cap = 12;
		// 		account.tap = 12
		// 	})
		// })
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
				<TextInput placeholder='Name' value={name} onChangeText={setName} style={styles.input} />
				<TextInput placeholder='CAP %' value={cap} onChangeText={setCap} style={styles.input} />
				<TextInput placeholder='TAP %' value={tap} onChangeText={setTap} style={styles.input} />
			</View>
			<Button title="Add account" onPress={createAccount} />
			<Button title="Read" onPress={onRead} />
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