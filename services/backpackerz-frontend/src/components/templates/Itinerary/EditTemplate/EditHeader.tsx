import * as React from "react";
import { ko } from "date-fns/locale";

import type { BackpackerzTypes } from "@backpackerz/core";
import { ItineraryState } from "@backpackerz/core/variables/enums";
import { styles, styled, Input, Select, Editor } from "@backpackerz/components";
import { DateRangePicker } from "@backpackerz/datepicker";
import useItineraryMutate from "hooks/use-Itinerary-mutate";
import * as UI_VARIABLES from "variables/constants/user-interface";

type Props = {
	itinerary: BackpackerzTypes.Itinerary;
};
export default function EditHeader(props: Props) {
	const { itinerary } = props;

	const [dateRanges, setDateRanges] = React.useState([
		{
			startDate: new Date(itinerary.departureDate),
			endDate: new Date(itinerary.arrivalDate),
			key: "selection",
		},
	]);

	const mutation = useItineraryMutate();

	const mutateItinerary = (
		key: keyof Backpackerz.ItineraryUpdateProps,
		value: Backpackerz.ItineraryUpdateProps[typeof key],
	) =>
		mutation.mutate({
			...itinerary,
			[key]: value,
		});

	const handleSaveTitle: React.FocusEventHandler<HTMLInputElement> = (
		event,
	) => mutateItinerary("title", event.target.value);

	const handleSaveDescription: React.FocusEventHandler<HTMLInputElement> = (
		event,
	) => mutateItinerary("description", event.target.value);

	const handleSaveBody: React.FocusEventHandler<HTMLInputElement> = (event) =>
		mutateItinerary("body", event.target.value);

	const handleSaveState = (value: ItineraryState) => {
		mutateItinerary("state", value);
	};

	const handleSavePersonnel = (value: number) =>
		mutateItinerary("personnel", value);

	const defaultValueState = React.useMemo(
		() =>
			UI_VARIABLES.STATE_OPTIONS.find(
				({ value }) => value == itinerary.state,
			)?.value,
		[itinerary.state],
	);

	// const handleChangeDateRange = ({ selection }: any) =>
	// 	onChange({
	// 		...itinerary,
	// 		departureDate: selection.startDate,
	// 		arrivalDate: selection.endDate,
	// 	});
	return (
		<HeaderBlock>
			<TitleInput
				defaultValue={itinerary.title}
				maxLength={UI_VARIABLES.TITLE_MAX_LENGTH}
				onBlur={handleSaveTitle}
			/>
			<DescriptionInput
				defaultValue={itinerary.description}
				placeholder={UI_VARIABLES.ITINERARY_DESCRIPTION_PLACEHOLDER}
				onBlur={handleSaveDescription}
			/>
			<BodyEditor
				placeholder={UI_VARIABLES.ITINERARY_BODY_PLACEHOLDER}
				value={itinerary.body}
			/>
			<div>
				<StateSelect
					options={UI_VARIABLES.STATE_OPTIONS}
					defaultValue={defaultValueState}
					onChange={handleSaveState}
				/>
				<PersonnelSelect
					options={UI_VARIABLES.PERSONNEL_OPTIONS}
					defaultValue={itinerary.personnel}
					onChange={handleSavePersonnel}
				/>
				<DatePicker
					locale={ko}
					ranges={dateRanges}
					// onChange={handleChangeDateRange}
					moveRangeOnFirstSelection={false}
					months={1}
					direction="horizontal"
					preventSnapRefocus={true}
					calendarFocus="backwards"
					isToggleCalendarBox
				/>
			</div>
		</HeaderBlock>
	);
}

const HeaderBlock = styled("header")`
	display: flex;
	flex-wrap: wrap;
	padding: 0.8rem;
	background-color: ${(props) => props.theme.palette.grey[50]};
	z-index: 1;
`;
const TitleInput = styled(Input)`
	width: 100rem;
	margin: 0.833rem;
	${styles.mediaQuery("xs", "lg")} {
		width: 100%;
	}
`;
const StateSelect = styled(Select)`
	margin: 0.833rem;
`;
const PersonnelSelect = styled(Select)`
	margin: 0.833rem;
`;
const DatePicker = styled(DateRangePicker)`
	margin: 0.833rem;
`;

const DescriptionInput = styled(Input)`
	width: 100%;
	margin-top: 1rem;
`;

const BodyEditor = styled(Editor.BPEditor)`
	width: 100%;
	margin-top: 1rem;
`;
