import * as React from "react";
import styled from "@emotion/styled";
import SelectUnstyled, {
	SelectUnstyledProps,
	selectUnstyledClasses,
	SelectUnstyledPopperSlotProps,
} from "@mui/base/SelectUnstyled";
import OptionUnstyled, {
	OptionUnstyledProps,
	optionUnstyledClasses,
} from "@mui/base/OptionUnstyled";
import PopperUnstyled from "@mui/base/PopperUnstyled";

import { palette } from "@backpackerz/components/styles/palette";

const StyledButton = styled("button")`
	font-size: 1.275rem;
	font-family: IBM Plex Sans, sans-serif;
	font-weight: 400;
	box-sizing: border-box;
	min-height: calc(1.5em + 22px);
	min-width: 320px;
	background: ${palette.gray0};
	border: 1px solid ${palette.gray6};
	border-radius: 0.4rem;
	padding: 12px;
	text-align: left;
	line-height: 1.5;
	color: ${palette.gray8};

	&:hover,
	&[aria-expanded="true"] {
		background: ${palette.gray0};
		border-color: ${palette.gray8};
	}

	&.${selectUnstyledClasses.focusVisible} {
		outline: 3px solid ${palette.gray4};
		border-color: ${palette.gray8};
	}

	&.${selectUnstyledClasses.expanded} {
		&::after {
			content: "▴";
		}
	}

	&::after {
		content: "▾";
		float: right;
	}
`;

const StyledListbox = styled("ul")`
	font-family: IBM Plex Sans, sans-serif;
	font-size: 1.275rem;
	box-sizing: border-box;
	margin: 1rem 0 0 0;
	padding: 5px;
	min-width: 320px;
	background: ${palette.gray0};
	border: 1px solid ${palette.gray6};
	border-radius: 0.75em;
	color: ${palette.gray8};
	overflow: auto;
	outline: 0px;
`;

const StyledOption = styled(OptionUnstyled)`
	list-style: none;
	padding: 8px;
	cursor: default;
	color: ${palette.gray9};

	& + & {
		margin: 0.4rem 0 0 0;
	}

	&:last-of-type {
		border-bottom: none;
	}

	&.${optionUnstyledClasses.selected} {
		font-weight: 600;
		color: ${palette.gray9};
	}

	&.${optionUnstyledClasses.highlighted} {
		font-weight: 600;
		color: ${palette.gray9};
	}

	&.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
		font-weight: 600;
		color: ${palette.gray9};
	}

	&.${optionUnstyledClasses.disabled} {
		color: ${palette.gray9};
	}

	&:hover:not(.${optionUnstyledClasses.disabled}) {
		font-weight: 600;
		color: ${palette.gray9};
	}
`;

const StyledPopper = styled(PopperUnstyled)`
	z-index: 1;
`;

const CustomSelect = React.forwardRef(function CustomSelect<TValue>(
	props: SelectUnstyledProps<TValue>,
	ref: React.ForwardedRef<HTMLUListElement>,
) {
	const components: SelectUnstyledProps<TValue>["components"] = {
		Root: StyledButton,
		Listbox: StyledListbox,
		Popper: StyledPopper as React.ComponentType<
			SelectUnstyledPopperSlotProps<TValue>
		>,
		...props.components,
	};

	return <SelectUnstyled {...props} ref={ref} components={components} />;
}) as <TValue>(
	props: SelectUnstyledProps<TValue> & React.RefAttributes<HTMLUListElement>,
) => JSX.Element;

export type Props<TValue> = SelectUnstyledProps<TValue> & {
	options: OptionUnstyledProps<TValue>[];
	defaultValue: TValue;
};
// Props<TValue>["options"][number]["value"]
export default function Select(props: Props<any>) {
	const { options, defaultValue, ...htmlProps } = props;
	return (
		<CustomSelect defaultValue={defaultValue} {...htmlProps}>
			{options.map((option) => (
				<StyledOption {...option}>{option.label}</StyledOption>
			))}
		</CustomSelect>
	);
}
