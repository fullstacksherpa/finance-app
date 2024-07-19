import {FlatList} from 'react-native'
import AccountListItem from './AccountListItem'
import {accountsCollection} from '../db'
import {useEffect, useState} from 'react'
import Account from '../model/Account'
import {withObservables} from '@nozbe/watermelondb/react'

function AccountList({accounts}: {accounts: Account[]}) {
	return (
		<>
			<FlatList data={accounts} renderItem={({item}) => <AccountListItem account={item} />} contentContainerStyle={{gap: 5}} />
		</>
	)
}


const enhance = withObservables([], () => ({
	accounts: accountsCollection.query(),
}))

const EnhancedAccountsList = enhance(AccountList)
export default EnhancedAccountsList

