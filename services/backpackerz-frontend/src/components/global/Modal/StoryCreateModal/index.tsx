import * as React from "react";

import { Story } from "@backpackerz/core";
import type { BackpackerzTypes } from "@backpackerz/core";
import { styled, Types } from "@backpackerz/components";

import BaseModal from "../base/BaseModal";
import StepSelectType from "./Step.select.type";
import StepSelectTransit from "./Step.select.transit";
import StepEditTransit from "./Step.edit.transit";

export type Props = Types.Modal.DefaultProps & {
	slug: string;
	start: Date;
	end: Date;
};

export default React.forwardRef<HTMLDivElement, Props>(
	function ModalEventCreate(props: Props, ref) {
		const { onOverlayClick, onClose, slug, start, end } = props;

		const [step, setStep] = React.useState<number>(0);
		const [story, setStory] = React.useState<{
			itinerarySlug: string;
			type?: BackpackerzTypes.Story["type"];
			title: string;
			description: string;
			body: string;
			startTime: Date;
			endTime: Date;
			transit?: BackpackerzTypes.Story["transit"];
			startPoint: string;
			destination: string;
		}>({
			itinerarySlug: slug,
			type: undefined,
			title: "",
			description: "",
			body: "",
			startTime: start,
			endTime: end,
			transit: undefined,
			startPoint: "",
			destination: "",
		});

		React.useEffect(() => {
			if (story.type) setStep(1);
			if (story.transit) setStep(2);
		}, [story]);

		const handleSubmit = async () => {
			await Story.service.createStory({
				itinerarySlug: slug,
				type: story.type!,
				title: story.title,
				description: story.description,
				body: "body",
				startTime: start,
				endTime: end,
				startPoint: story.startPoint,
				destination: story.destination,
			});
		};

		return (
			<EventCreateModalBlock
				heading="스토리 만들기"
				onOverlayClick={onOverlayClick}
				onClose={onClose}
				ref={ref}
			>
				{slug}
				{`${start.toString()} ~ ${end.toString()}`}
				{(() => {
					switch (step) {
						case 0:
							return (
								<StepSelectType
									onChange={([key, value]) => {
										setStory((story) => ({
											...story,
											[key]: value,
										}));
									}}
								/>
							);
						case 1:
							return (
								<StepSelectTransit
									onChange={([key, value]) => {
										setStory((story) => ({
											...story,
											[key]: value,
										}));
									}}
								/>
							);
						case 2:
							return (
								<StepEditTransit
									value={story}
									onSubmit={handleSubmit}
									onChange={([key, value]) => {
										setStory((story) => ({
											...story,
											[key]: value,
										}));
									}}
								/>
							);
						default:
							return null;
					}
				})()}
			</EventCreateModalBlock>
		);
	},
);

const EventCreateModalBlock = styled(BaseModal)`
	.modal__container {
		max-width: 40rem;
		margin: 0;
	}
`;
