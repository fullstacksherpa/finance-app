import {View, Text, StyleSheet, TextInput, Button} from 'react-native'
import AccountList from '../components/AccountList'
import {useState} from 'react';
import database, {accountsCollection} from '../db';



export default function AccountsScreen() {

	const [name, setName] = useState('');
	const [cap, setCap] = useState('');
	const [tap, setTap] = useState('');

	const createAccount = async () => {
		await database.write(async () => {
			await accountsCollection.create((account) => {
				account.name = name;
				account.cap = Number.parseFloat(cap)
				account.tap = Number.parseFloat(tap)
			})
		});
		setName('');
		setCap('');
		setTap('');
	}

	// const onTest = async () => {
	// 	await database.write(async () => {
	// 		const accounts = await accountsCollection.query().fetch();
	// 		const account = accounts[0];
	// 		account.update((updatedAccount) => {
	// 			updatedAccount.name = "from onTest final"
	// 		})
	// 	})
	// }

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
			<Button onPress={createAccount} title='Add account' />
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