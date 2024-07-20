import {Model} from '@nozbe/watermelondb';
import {field, text, nochange, readonly, date} from '@nozbe/watermelondb/decorators';

export default class Allocation extends Model {
	static table = 'allocations';



	@field('income') income!: number;
	@readonly @date('created_at') createdAt!: Date;
}