import * as React from "react";
import Link from "next/link";
import { styled } from "@mui/material";

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
const BrandBlock = styled("h1")<Required<Pick<Props, "area">>>`
	& {
		${(props) =>
			props.area == "header" &&
			`
            line-height: 3.4rem;
            a {
                font-size: 2.4rem;
                color: ${props.theme.palette.grey[900]};
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
                color: ${props.theme.palette.grey[900]};
                text-decoration: none;
                cursor: pointer;
            }
        `}
	}
`;
