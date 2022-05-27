import * as React from "react";
import { useRouter } from "next/router";
import { ko } from "date-fns/locale";

import type { BackpackerzTypes } from "@backpackerz/core";
import { ItineraryState } from "@backpackerz/core/variables/enums";
import {
	styles,
	styled,
	Input,
	Select,
	Button,
	Map,
	Tabs,
	Modal,
	Timetable,
	Editor,
	useCurrentLocation,
} from "@backpackerz/components";
import { DateRangePicker } from "@backpackerz/datepicker";
import EditDrawer from "../EditDrawer";
import * as MODAL_KEYS from "variables/constants/modals";
import * as UI_VARIABLES from "variables/constants/user-interface";
import ConditionallyRender from "components/global/ConditionallyRender";

type Props = {
	itinerary: BackpackerzTypes.Itinerary;
	onChange: (itinerary: BackpackerzTypes.Itinerary) => unknown;
	onClickSave: () => unknown;
	children?: never;
};

const defaultProps = {};

const MapPanel = () => {
	const { location: currentLocation, error: currentError } =
		useCurrentLocation({
			enableHighAccuracy: true,
			timeout: 1000 * 60 * 1,
			maximumAge: 1000 * 3600 * 24,
		});
	const [center, setCenter] = React.useState({
		lat: 0,
		lng: 0,
	});
	const [markers, setMarkers] = React.useState<google.maps.LatLng[]>([]);

	React.useEffect(() => {
		setCenter({
			lat: currentLocation?.latitude || 0,
			lng: currentLocation?.longitude || 0,
		});
	}, [currentLocation]);

	const onClick = (event: google.maps.MapMouseEvent) => {
		console.log(event);
		setMarkers([...markers, event.latLng!]);
	};
	return (
		<div style={{ height: "100%", width: "100%" }}>
			<ConditionallyRender client>
				{markers.map((marker) => (
					<button
						onClick={() =>
							setMarkers(markers.filter((m) => m != marker))
						}
					>
						{JSON.stringify(marker)}
					</button>
				))}
				<Map
					apiKey={process.env.GOOGLE_MAP_API_KEY!}
					defaultZoom={15}
					defaultCenter={center}
					markers={markers}
					onClick={onClick}
				/>
			</ConditionallyRender>
		</div>
	);
};

export default function ItineraryEditTemplate(props: Props) {
	const { itinerary, onChange, onClickSave } = { ...defaultProps, ...props };

	const router = useRouter();
	const modal = Modal.useModal();

	const dateRanges = [
		{
			startDate: new Date(itinerary.departureDate),
			endDate: new Date(itinerary.arrivalDate),
			key: "selection",
		},
	];
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
	const defaultValueState = React.useMemo(
		() =>
			UI_VARIABLES.STATE_OPTIONS.find(
				({ value }) => value == itinerary.state,
			)?.value,
		[itinerary.state],
	);

	const TimeTablePanel = () => (
		<TimeEventTable
			arrivalDate={new Date(itinerary.arrivalDate)}
			departureDate={new Date(itinerary.departureDate)}
			events={events}
			onClickSlot={handleOpenModalEventCreate}
			onClickEvent={({ event }) => {
				console.log(event);
			}}
		/>
	);

	const handleOpenModalEventCreate = ({ start, end }: any) => {
		modal.show(
			{ type: MODAL_KEYS.MODAL_STORY_CREATE },
			{ slug: router.query.slug, start, end },
		);
	};
	const handleChangeTitle = (value: string) => {
		onChange({
			...itinerary,
			title: value,
		});
	};
	const handleChangeDescription = (value: string) => {
		onChange({
			...itinerary,
			description: value,
		});
	};
	const handleChangeBody = (value: string) => {
		onChange({
			...itinerary,
			body: value,
		});
	};
	const handleChangeState = (value: ItineraryState) => {
		onChange({
			...itinerary,
			state: value,
		});
	};
	const handleChangePersonnel = (value: number) => {
		onChange({
			...itinerary,
			personnel: value,
		});
	};
	const handleChangeDateRange = ({ selection }: any) => {
		onChange({
			...itinerary,
			departureDate: selection.startDate,
			arrivalDate: selection.endDate,
		});
	};
	return (
		<Container>
			<HeaderBlock>
				<TitleInput
					value={itinerary.title}
					maxLength={UI_VARIABLES.TITLE_MAX_LENGTH}
					onChange={handleChangeTitle}
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

			<EditDrawer>예산</EditDrawer>
			<BodyBlock>
				<MapPanel />
				{/* <AsideBlock>
					<Button onClick={() => router.back()}>뒤로가기</Button>
					<SaveButton onClick={onClickSave}>저장하기</SaveButton>
				</AsideBlock> */}
				{/* <DetailBlock>
					<DescriptionInput
						placeholder={
							UI_VARIABLES.ITINERARY_DESCRIPTION_PLACEHOLDER
						}
						value={itinerary.description}
						onChange={handleChangeDescription}
					/>
					<BodyEditor
						placeholder={UI_VARIABLES.ITINERARY_BODY_PLACEHOLDER}
						value={itinerary.body}
						onChange={handleChangeBody}
					/>
					<Tabs
						tabs={[
							{
								label: "일정표",
								render: TimeTablePanel,
							},
							{
								label: "지도",
								render: MapPanel,
							},
						]}
					/>
				</DetailBlock> */}
			</BodyBlock>
		</Container>
	);
}

const Container = styled("div")`
	height: 100vh;
	display: flex;
	flex-direction: column;
`;
const HeaderBlock = styled("header")`
	display: flex;
	flex-wrap: wrap;
	padding: 0.8rem;
	background-color: ${(props) => props.theme.palette.grey[50]};
	z-index: 1;
	margin-left: 64px;
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
const SaveButton = styled(Button)`
	margin: 0.833rem 0.833rem 0.833rem auto;
`;

const BodyBlock = styled("div")`
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
	${styles.mediaQuery("xs", "lg")} {
		flex-direction: column;
	}
	margin-left: 64px;
`;
const AsideBlock = styled("aside")`
	flex-shrink: 0;
	height: min-content;
	width: 332px;
	margin: 0.833em;
	padding: 0.833em;
	box-shadow: 0 2px 2px rgb(125 125 125 / 20%);
	${styles.mediaQuery("xs", "lg")} {
		width: auto;
	}
`;

const DetailBlock = styled("div")`
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
