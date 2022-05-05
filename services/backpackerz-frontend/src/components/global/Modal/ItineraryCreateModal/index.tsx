import * as React from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { addDays } from "date-fns";
import { ko } from "date-fns/locale";

import { Itinerary } from "@backpackerz/core";
import {
	Button,
	Input,
	Select,
	Label,
	Alert,
	Modal,
} from "@backpackerz/components";
import { DateRangePicker } from "@backpackerz/datepicker";

import ModalComponent from "../base/BaseModal";
import * as MESSAGES from "variables/constants/messages";
import * as UI_VARIABLES from "variables/constants/user-interface";

export default React.forwardRef<HTMLDivElement, Modal.ModalProps>(
	function ModalItineraryCreate(props, ref) {
		const { onOverlayClick, onClose } = props;

		const [title, setTitle] = React.useState("");
		const [date, setDate] = React.useState<
			{
				startDate: Date;
				endDate: Date | null;
				key: string;
				autoFocus?: boolean;
			}[]
		>([
			{
				startDate: new Date(),
				endDate: addDays(new Date(), 7),
				key: "selection",
			},
		]);
		const [state, setState] = React.useState(
			UI_VARIABLES.STATE_OPTIONS[0].value,
		);
		const [personnel, setPersonnel] = React.useState(
			UI_VARIABLES.PERSONNEL_OPTIONS[0].value,
		);
		const router = useRouter();
		const alert = Alert.useAlert();

		const handleCreateItinerary = async (e: React.MouseEvent) => {
			if (!date[0].endDate) return;
			try {
				e.preventDefault();
				const { slug } = await Itinerary.service.createItinerary({
					title: title,
					departureDate: date[0].startDate,
					arrivalDate: date[0].endDate,
					personnel: personnel,
				});
				alert.show(MESSAGES.ITINERARY_CREATE_SUCCEED);
				onClose();
				router.push(`/itinerary/edit/${slug}`);
			} catch (error) {
				error instanceof Error && alert.show(error.message);
			}
		};

		return (
			<ItineraryCreateModalBlock
				heading="새로운 여행 일정"
				onOverlayClick={onOverlayClick}
				onClose={onClose}
				ref={ref}
			>
				<div className="modal-itinerary__create">
					<form>
						<Label htmlFor="title">제목</Label>
						<TitleInput
							id="title"
							placeholder={"예: 5박 6일 유럽 명소 여행"}
							value={title}
							onChange={setTitle}
						/>
						<Label htmlFor="period">기간</Label>
						<DateRangePicker
							id="period"
							locale={ko}
							onChange={(item: any) => setDate([item.selection])}
							showSelectionPreview={true}
							moveRangeOnFirstSelection={false}
							months={1}
							ranges={date}
							direction="horizontal"
							preventSnapRefocus={true}
							calendarFocus="backwards"
							isToggleCalendarBox
						/>
						<Label htmlFor="period">상태</Label>
						<StateSelect
							options={UI_VARIABLES.STATE_OPTIONS}
							defaultValue={state}
							onChange={setState}
						/>
						<Label htmlFor="period">인원</Label>
						<PersonnelSelect
							options={UI_VARIABLES.PERSONNEL_OPTIONS}
							defaultValue={personnel}
							onChange={setPersonnel}
						/>
						<Button
							className="btn-submit"
							onClick={handleCreateItinerary}
						>
							여행을 시작합니다.
						</Button>
					</form>
				</div>
			</ItineraryCreateModalBlock>
		);
	},
);

const ItineraryCreateModalBlock = styled(ModalComponent)`
	.modal__container {
		max-width: 40rem;
		.modal-itinerary__create {
			height: 100%;
			width: 100%;
			margin: 0;
			form {
				display: flex;
				flex-wrap: wrap;
				.state,
				.personnel {
					flex-grow: 1;
					margin-top: 1.2rem;
				}
				.personnel {
					margin-left: 1.2rem;
				}
				.btn-submit {
					width: 100%;
					margin-top: 1.2rem;
				}
			}
		}
	}
`;
const TitleInput = styled(Input)`
	width: 100%;
	flex-shrink: 0;
`;
const StateSelect = styled(Select)`
	flex-grow: 1;
	margin-top: 1.2rem;
`;
const PersonnelSelect = styled(Select)`
	flex-grow: 1;
	margin-top: 1.2rem;
`;
