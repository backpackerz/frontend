import * as React from "react";
import styled from "@emotion/styled";

import { Props as TabProps } from "components/molecules/Tab/Tab";

export type Props = Omit<React.ComponentPropsWithoutRef<"div">, "onChange"> & {
	value?: any;
	onChange?: (value: any) => unknown;
};

export default function Tabs(props: Props) {
	const {
		children: childrenProp,
		value,
		onChange,
		"aria-label": ariaLabel,
		"aria-labelledby": ariaLabelledBy,
		key,
		...htmlProps
	} = props;
	let childIndex = 0;
	const children = React.Children.map(childrenProp, (child) => {
		if (!React.isValidElement(child)) {
			return null;
		}
		const childValue =
			child.props.value === undefined ? childIndex : child.props.value;
		const selected = childValue === value;
		childIndex += 1;
		return React.cloneElement(child, {
			selected,
			value: childValue,
			onChange,
			...(childIndex === 1 && value === false && !child.props.tabIndex
				? { tabIndex: 0 }
				: {}),
		} as TabProps);
	});

	return (
		<div id={`tab-${key}`} aria-controls={`tabpanel-${key}`} {...htmlProps}>
			<FlexContainer
				role="tablist"
				aria-label={ariaLabel}
				aria-labelledby={ariaLabelledBy}
			>
				{children}
			</FlexContainer>
		</div>
	);
}

const FlexContainer = styled.div`
	display: flex;
`;
