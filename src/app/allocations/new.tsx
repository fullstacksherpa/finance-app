import {View, Text, StyleSheet, TextInput, Button} from 'react-native'
import {router, Stack} from 'expo-router'
import {useState} from 'react'
import database, {allocationsCollection} from '@/src/db'


export default function NewAllocationScreen() {
	const [income, setIncome] = useState('')

	const fetchAll = async () => {
		await database.write(async () => {
			const data = await allocationsCollection.query().fetch()
			console.log(data)
		})
	}

	const save = async () => {
		await database.write(async () => {
			allocationsCollection.create((newAllocation) => {
				newAllocation.income = Number.parseFloat(income);
			})
		})
		setIncome('')
		router.back()
	}
	return (
		<View style={styles.container}>
			<Stack.Screen options={{title: 'New Allocation'}} />

			<View style={styles.inputRow}>
				<Text style={styles.label}>Income</Text>
				<TextInput value={income} onChangeText={setIncome} placeholder='$5,000' style={styles.input} />
			</View>

			<Button title='save' onPress={save} />
			<Button title='fetchAll' onPress={save} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		gap: 10,
	},
	label: {
		fontWeight: 'bold',
		width: 100,
	},
	input: {
		backgroundColor: 'white',
		padding: 10,
		borderRadius: 5,
		flex: 1,
	},
	inputRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,

	}
})