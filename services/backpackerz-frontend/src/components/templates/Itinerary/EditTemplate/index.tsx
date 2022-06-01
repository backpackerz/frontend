import * as React from "react";
import { useRouter } from "next/router";

import type { BackpackerzTypes } from "@backpackerz/core";
import { styles, styled, Modal, Timetable } from "@backpackerz/components";
import EditHeader from "./EditHeader";
import EditDrawer from "./EditDrawer";
import EditMap from "./EditMap";
import * as MODAL_KEYS from "variables/constants/modals";

type Props = {
	itinerary: BackpackerzTypes.Itinerary;
	onChange: (itinerary: BackpackerzTypes.Itinerary) => unknown;
	onClickSave: () => unknown;
	children?: never;
};

const drawerOpenWidth = 240;
const drawerCloseWidth = 80;

export default function ItineraryEditTemplate(props: Props) {
	const { itinerary, onChange, onClickSave } = props;

	const router = useRouter();
	const modal = Modal.useModal();

	const events = React.useMemo(
		() => [
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
		],
		[itinerary],
	);

	const handleOpenModalEventCreate = ({ start, end }: any) =>
		modal.show(
			{ type: MODAL_KEYS.MODAL_STORY_CREATE },
			{ slug: router.query.slug, start, end },
		);

	const TimeTable = () => (
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
	return (
		<Container>
			<EditHeader itinerary={itinerary} onChange={onChange} />
			<EditDrawer
				drawerOpenWidth={drawerOpenWidth}
				drawerCloseWidth={drawerCloseWidth}
			/>
			<BodyBlock>
				<EditMap />
			</BodyBlock>
		</Container>
	);
}

const Container = styled("div")`
	height: 100vh;
	display: flex;
	flex-direction: column;
	margin-left: ${drawerCloseWidth}px;
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
`;

const TimeEventTable = styled(Timetable)`
	margin-top: 1rem;
`;
