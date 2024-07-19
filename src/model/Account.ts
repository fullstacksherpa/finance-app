// A models binds a javascript class to a database table. Models are used to CRUD operation in the database. It represents the structure of your data and the logic for interacting with it.


//sepcial note: All modifications to the database (like creating, updating, and deleting records) must be done in a Writer, either by wrapping your work in database.write() or by using special decorators in the model (see documentation). We have to provide a callback function which will receive an object that needs to be updated with the data to be saved.

import {Model} from '@nozbe/watermelondb';
import {field, text, nochange, readonly, date} from '@nozbe/watermelondb/decorators';

export default class Account extends Model {
	static table = 'accounts';



	@text('name') name!: string;
	@field('cap') cap!: number;
	@field('tap') tap!: number;
}