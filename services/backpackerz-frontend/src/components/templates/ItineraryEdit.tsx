import React from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { ko } from "date-fns/locale";

import { Types } from "@backpackerz/core";
import {
	Input,
	Select,
	Button,
	Tab,
	Modal,
	Timetable,
} from "@backpackerz/components";
import { Editor } from "@backpackerz/components";
import { DateRangePicker } from "@backpackerz/datepicker";
import { mq } from "styles/mediaQuery";
import * as MODAL_KEYS from "variables/constants/modals";
import * as UI_VARIABLES from "variables/constants/user-interface";

type Props = {
	itinerary: Types.Itinerary;
	onChange: (itinerary: Types.Itinerary) => unknown;
	onClickSave: () => unknown;
	children?: never;
};

const defaultProps = {};

export default function ItineraryEditTemplate(props: Props) {
	const { itinerary, onChange, onClickSave } = { ...defaultProps, ...props };

	const [tab, setTab] = React.useState(0);
	const router = useRouter();
	const modal = Modal.useModal();

	const handleOpenModalEventCreate = ({ start, end }: any) => {
		modal.show(
			{ type: MODAL_KEYS.MODAL_STORY_CREATE },
			{ slug: router.query.slug, start, end },
		);
	};
	const events = [
		itinerary.stories.map((story) => {
			return {
				id: story.id,
				title: story.title,
				type: story.type,
				description: story.description,
				body: story.body,
				startTime: new Date(story.startTime),
				endTime: new Date(story.endTime),
			};
		}),
	];

	return (
		<Container>
			<HeaderBlock>
				<TitleInput
					value={itinerary.title}
					maxLength={80}
					onChange={(value) =>
						onChange({
							...itinerary,
							title: value,
						})
					}
				/>
				<div>
					<StateSelect
						options={UI_VARIABLES.STATE_OPTIONS}
						selectedOption={
							UI_VARIABLES.STATE_OPTIONS.find(
								({ value }) => value == itinerary.state,
							)?.value
						}
						onSelected={(value: any) =>
							onChange({
								...itinerary,
								state: value,
							})
						}
					/>
					<PersonnelSelect
						options={UI_VARIABLES.PERSONNEL_OPTIONS}
						selectedOption={itinerary.personnel}
						onSelected={(value: any) =>
							onChange({
								...itinerary,
								personnel: value,
							})
						}
					/>
					<DateRangePicker
						locale={ko}
						ranges={[
							{
								startDate: new Date(itinerary.departureDate),
								endDate: new Date(itinerary.arrivalDate),
								key: "selection",
							},
						]}
						onChange={(item: any) => {
							onChange({
								...itinerary,
								departureDate: item.selection.startDate,
								arrivalDate: item.selection.endDate,
							});
						}}
						showSelectionPreview={true}
						moveRangeOnFirstSelection={false}
						months={1}
						direction="horizontal"
						preventSnapRefocus={true}
						calendarFocus="backwards"
						isToggleCalendarBox
					/>
				</div>
			</HeaderBlock>
			<BodyBlock>
				<AsideBlock>
					<Button onClick={() => router.back()}>뒤로가기</Button>
					<SaveButton onClick={onClickSave}>저장하기</SaveButton>
				</AsideBlock>
				<DetailBlock>
					<DescriptionInput
						placeholder="여행을 간단하게 설명해주세요"
						value={itinerary.description}
						onChange={(value) =>
							onChange({
								...itinerary,
								description: value,
							})
						}
					/>
					<BodyEditor
						placeholder="여행을 간단하게 설명해주세요"
						value={itinerary.body}
						onChange={(value) =>
							onChange({
								...itinerary,
								body: value,
							})
						}
					/>
					<Tab.Tabs value={tab} onChange={setTab}>
						<Tab value={0}>스토리</Tab>
						<Tab value={1}>일정표</Tab>
					</Tab.Tabs>
					<div>
						<Tab.TabPannel index={0} value={tab}>
							타임라인
						</Tab.TabPannel>
						<Tab.TabPannel index={1} value={tab}>
							<TimeEventTable
								arrivalDate={new Date(itinerary.arrivalDate)}
								departureDate={
									new Date(itinerary.departureDate)
								}
								events={events}
								onClickSlot={handleOpenModalEventCreate}
								onClickEvent={({ event }) => {
									console.log(event);
								}}
							/>
						</Tab.TabPannel>
					</div>
				</DetailBlock>
			</BodyBlock>
		</Container>
	);
}

const Container = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
`;
const HeaderBlock = styled.header`
	display: flex;
	flex-wrap: wrap;
	padding: 2.4em;
	background-color: ${(props) => props.theme.palette.gray3};
	z-index: 1;
`;
const TitleInput = styled(Input)`
	width: 100rem;
	margin: 0.833rem;
	${mq("xs", "lg")} {
		width: 100%;
	}
`;
const StateSelect = styled(Select)`
	margin: 0.833rem;
`;
const PersonnelSelect = styled(Select)`
	margin: 0.833rem;
`;
const SaveButton = styled(Button)`
	margin: 0.833rem 0.833rem 0.833rem auto;
`;

const BodyBlock = styled.div`
	& {
		flex: 1;
		display: flex;
		gap: 1em;
		overflow: scroll;
	}
	&::-webkit-scrollbar {
		display: none;
	}
	-ms-overflow-style: none;
	scrollbar-width: none;
	${mq("xs", "lg")} {
		flex-direction: column;
	}
`;
const AsideBlock = styled.aside`
	flex-shrink: 0;
	height: min-content;
	width: 332px;
	margin: 0.833em;
	padding: 0.833em;
	box-shadow: 0 2px 2px rgb(125 125 125 / 20%);
	${mq("xs", "lg")} {
		width: auto;
	}
`;

const DetailBlock = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	overflow: scroll;
`;

const DescriptionInput = styled(Input)`
	width: 100%;
	margin-top: 1rem;
`;

const BodyEditor = styled(Editor.BPEditor)`
	width: 100%;
	margin-top: 1rem;
`;

const TimeEventTable = styled(Timetable)`
	margin-top: 1rem;
`;
