import {View, Text, StyleSheet} from 'react-native';
import Allocation from '../model/Allocation';

const AllocationListItem = ({allocation}: {allocation: Allocation}) => {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.date}>{allocation.createdAt.toLocaleDateString()}</Text>
				<Text style={styles.income}>$ {allocation.income}</Text>
			</View>

		</View>
	)
}

export default AllocationListItem;

const styles = StyleSheet.create({
	container: {
		borderRadius: 10,
		overflow: 'hidden',
	},
	header: {
		flexDirection: 'row',
		backgroundColor: 'gainsboro',
		justifyContent: 'space-between',
		padding: 10,
		alignItems: 'center'
	},
	income: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'green'
	},
	date: {},
})