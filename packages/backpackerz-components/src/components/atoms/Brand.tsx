import * as React from "react";
import Link from "next/link";
import styled from "@emotion/styled";

import { palette } from "@backpackerz/components/styles/theme";

type Props = React.ComponentPropsWithoutRef<"h1"> & {
	area?: "header" | "footer";
};
export default function Brand(props: Props) {
	const { area = "header" } = props;
	return (
		<BrandBlock area={area} {...props}>
			<Link href="/">
				<a>Backpackerz</a>
			</Link>
		</BrandBlock>
	);
}
const BrandBlock = styled.h1<Required<Pick<Props, "area">>>`
	& {
		${(props) =>
			props.area == "header" &&
			`
            line-height: 3.4rem;
            a {
                font-size: 2.4rem;
                color: ${palette.gray9};
                text-decoration: none;
                cursor: pointer;
            }
        `}
		${(props) =>
			props.area == "footer" &&
			`
            margin: 0.433rem;
            line-height: 2.8rem;
            a {
                font-size: 1.8rem;
                color: ${palette.gray9};
                text-decoration: none;
                cursor: pointer;
            }
        `}
	}
`;
