import { public_full_user_view } from '../../../schema';
import { ReadonlyRepo } from '../base';

export class PublicFullUserViewRepo extends ReadonlyRepo<
	typeof public_full_user_view
> {
	constructor() {
		super(public_full_user_view);
	}
}
export const publicFullUserViewRepo = new PublicFullUserViewRepo();
