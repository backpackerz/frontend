import * as React from "react";
import Link from "next/link";
import styled from "@emotion/styled";

import { Types } from "@backpackerz/core";
import { Editor } from "@backpackerz/components";
import useStoreSelector from "hooks/use-store-selector";
import { mq } from "styles/mediaQuery";
import * as UI_VARIABLES from "variables/constants/user-interface";

type Props = {
	itinerary: Types.Itinerary;
	children?: never;
};

export default function ItineraryViewTemplate(props: Props) {
	const { itinerary } = props;

	const { entity: user } = useStoreSelector((state) => state.app.user);

	return (
		<>
			<BannerBlock>
				<div className="wrapper">
					<Title>{itinerary.title}</Title>
					<p className="tit-desc">
						<span>{itinerary.period}일</span>·
						<span>
							{
								UI_VARIABLES.STATE_OPTIONS.find(
									({ value }) => value == itinerary.state,
								)?.label
							}
						</span>
					</p>
				</div>
			</BannerBlock>
			<BodyBlock>
				<Aside>
					<div className="profile">
						<p className="email">{itinerary.user.email}</p>
						<p className="nickname">{itinerary.user.nickname}</p>
					</div>
					{user?.id == itinerary.user.id && (
						<Link href={`/itinerary/${itinerary.slug}/edit`}>
							수정
						</Link>
					)}
				</Aside>
				<Detail>
					<Summary>
						<Description>{itinerary.description}</Description>
						<Editor.BPEditor value={itinerary.body} readOnly />
						<p>
							<span>여행시작일: {itinerary.departureDate}</span>
							<span>여행종료일: {itinerary.arrivalDate}</span>
							<span>{itinerary.personnel}명</span>
							<span>{`처음 만든 날: ${itinerary.createdAt}`}</span>
							<span>{`마지막 수정한 날: ${itinerary.updatedAt}`}</span>
						</p>
						{itinerary.state}
					</Summary>
				</Detail>
			</BodyBlock>
			{JSON.stringify(itinerary as unknown as string)}
		</>
	);
}

const BannerBlock = styled.section`
	display: flex;
	flex-direction: column;
	height: 320px;
	background-color: ${(props) => props.theme.palette.gray3};
	.wrapper {
		align-items: center;
		width: 100%;
		max-width: 1200px;
		margin: auto;
		.tit-desc {
			font-size: 1.4rem;
			text-align: center;
			font-weight: 600;
		}
	}
`;

const Title = styled.h1`
	font-size: 2.2rem;
	text-align: center;
	font-weight: 600;
`;

const BodyBlock = styled.section`
	display: flex;
	max-width: 1200px;
	margin: auto;
	gap: 1rem;
	${mq("xs", "lg")} {
		flex-direction: column;
	}
`;

const Aside = styled.aside`
	height: 100%;
	width: 240px;
	padding: 1rem;
	box-shadow: 0 2px 2px rgb(125 125 125 / 20%);
`;

const Detail = styled.div`
	flex: 1;
	.body {
		width: 100%;
		margin-top: 1rem;
	}
	.state,
	.personnel {
		margin-top: 1rem;
	}
	.departure-date,
	.arrival-date {
		margin-top: 1rem;
	}
	.timetable {
		margin-top: 1rem;
	}
`;

const Summary = styled.div`
	padding: 1rem;
	box-shadow: 0 2px 2px rgb(125 125 125 / 20%);
`;

const Description = styled.p`
	width: 100%;
	margin-top: 1rem;
	font-size: 1.4rem;
`;
