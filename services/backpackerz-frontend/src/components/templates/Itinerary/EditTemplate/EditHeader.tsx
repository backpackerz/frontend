import * as React from "react";
import { ko } from "date-fns/locale";

import type { BackpackerzTypes } from "@backpackerz/core";
import { ItineraryState } from "@backpackerz/core/variables/enums";
import { styles, styled, Input, Select, Editor } from "@backpackerz/components";
import { DateRangePicker } from "@backpackerz/datepicker";
import * as UI_VARIABLES from "variables/constants/user-interface";
type Props = {
	itinerary: BackpackerzTypes.Itinerary;
	onChange: (itinerary: BackpackerzTypes.Itinerary) => unknown;
};
export default function EditHeader(props: Props) {
	const { itinerary, onChange } = props;

	const dateRanges = [
		{
			startDate: new Date(itinerary.departureDate),
			endDate: new Date(itinerary.arrivalDate),
			key: "selection",
		},
	];

	const defaultValueState = React.useMemo(
		() =>
			UI_VARIABLES.STATE_OPTIONS.find(
				({ value }) => value == itinerary.state,
			)?.value,
		[itinerary.state],
	);

	const handleChangeTitle = (value: string) =>
		onChange({
			...itinerary,
			title: value,
		});
	const handleChangeDescription = (value: string) =>
		onChange({
			...itinerary,
			description: value,
		});
	const handleChangeBody = (value: string) =>
		onChange({
			...itinerary,
			body: value,
		});
	const handleChangeState = (value: ItineraryState) =>
		onChange({
			...itinerary,
			state: value,
		});
	const handleChangePersonnel = (value: number) =>
		onChange({
			...itinerary,
			personnel: value,
		});
	const handleChangeDateRange = ({ selection }: any) =>
		onChange({
			...itinerary,
			departureDate: selection.startDate,
			arrivalDate: selection.endDate,
		});
	return (
		<HeaderBlock>
			<TitleInput
				value={itinerary.title}
				maxLength={UI_VARIABLES.TITLE_MAX_LENGTH}
				onChange={handleChangeTitle}
			/>
			<DescriptionInput
				placeholder={UI_VARIABLES.ITINERARY_DESCRIPTION_PLACEHOLDER}
				value={itinerary.description}
				onChange={handleChangeDescription}
			/>
			<BodyEditor
				placeholder={UI_VARIABLES.ITINERARY_BODY_PLACEHOLDER}
				value={itinerary.body}
				onChange={handleChangeBody}
			/>
			<div>
				<StateSelect
					options={UI_VARIABLES.STATE_OPTIONS}
					defaultValue={defaultValueState}
					onChange={handleChangeState}
				/>
				<PersonnelSelect
					options={UI_VARIABLES.PERSONNEL_OPTIONS}
					defaultValue={itinerary.personnel}
					onChange={handleChangePersonnel}
				/>
				<DatePicker
					locale={ko}
					ranges={dateRanges}
					onChange={handleChangeDateRange}
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
