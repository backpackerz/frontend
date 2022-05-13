import * as React from "react";
import Link, { LinkProps } from "next/link";
import { format } from "date-fns";

import { styles, styled, Editor } from "@backpackerz/components";

export type Props = LinkProps & {
	heading: string;
	description: string;
	body: string;
	author: string;
	updatedAt: Date;
};

export default function ItineraryCard(props: Props) {
	const { heading, description, body, author, updatedAt, ...htmlProps } =
		props;

	const formatBody = `${Editor.parseText(body).slice(0, 100)}...`;
	const formatUpdatedAt = `${format(
		new Date(updatedAt),
		"MMM d, yyyy",
	)}에 수정 됨`;

	return (
		<CardBlock>
			<Heading>
				<Link {...(htmlProps as LinkProps)}>
					<a>{heading}</a>
				</Link>
			</Heading>
			<Description>{description}</Description>
			<Body>{formatBody}</Body>
			<Author>{author}</Author>
			<UpdatedAt>{formatUpdatedAt}</UpdatedAt>
		</CardBlock>
	);
}

const CardBlock = styled("article")`
	display: inline-flex;
	flex-direction: column;
	height: 100%;
`;
const Heading = styled("h3")`
	margin: 0.833rem 0;
	line-height: 2.4rem;
	font-size: 2rem;
	font-weight: 600;
	color: ${(props) => props.theme.palette.primary.dark};
	cursor: pointer;
	a {
		&:hover {
			color: ${(props) => props.theme.palette.primary.dark};
		}
		${styles.ellipsis(1)}
	}
`;
const Description = styled("p")`
	margin: 0;
	line-height: 1.4rem;
	font-size: 1.4rem;
	color: ${(props) => props.theme.palette.primary.dark};
`;
const Body = styled("p")`
	flex: 1;
	margin: 1.666rem 0;
	line-height: 2.2rem;
	font-size: 1.4rem;
	text-indent: 0.7rem;
	word-break: keep-all;
	color: ${(props) => props.theme.palette.primary.dark};
`;
const Author = styled("p")`
	margin: 0.833rem 0;
	text-align: right;
	color: ${(props) => props.theme.palette.primary.dark};
`;
const UpdatedAt = styled("p")`
	margin: 0.833rem 0;
	text-align: right;
	color: ${(props) => props.theme.palette.primary.dark};
`;
