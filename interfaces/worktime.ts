import Day from "./day";

export default interface Worktime {
	week_start: string;
	week_number: number;
	name: string;
	email: string;

	monday: Day;
	tuesday: Day;
	wednesday: Day;
	thursday: Day;
	friday: Day;

	hours_done: number;
	hours_todo: number;
	need_justification: boolean;
	justification: string;
}
