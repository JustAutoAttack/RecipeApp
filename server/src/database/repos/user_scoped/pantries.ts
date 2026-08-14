import { pantries } from '../../schema';
import { UserScopedBaseRepo } from './base';

export class PantriesRepo extends UserScopedBaseRepo<typeof pantries> {
	constructor() {
		super(pantries);
	}
}
export const pantriesRepo = new PantriesRepo();
