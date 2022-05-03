import * as React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import classnames from "classnames";
import { format, parse, isValid } from "date-fns";

export type Props = Omit<
	React.HTMLProps<HTMLInputElement>,
	"value" | "onChange"
> & {
	className?: string;
	children?: never;
	value: number | Date;
	placeholder?: string;
	disabled?: boolean;
	readOnly?: boolean;
	dateOptions?: Parameters<typeof format>[2];
	dateDisplayFormat?: string;
	onChange?: (value: Date) => unknown;
	onBlur?: React.FocusEvent;
};

const defaultProps: Required<
	Pick<Props, "readOnly" | "disabled" | "dateDisplayFormat">
> = {
	readOnly: false,
	disabled: false,
	dateDisplayFormat: "yyyy-MM-d",
};

function formatDate({
	value,
	dateDisplayFormat,
	dateOptions,
}: {
	value: number | Date;
	dateDisplayFormat: string;
	dateOptions: Parameters<typeof format>[2];
}) {
	if (value && isValid(value)) {
		return format(value, dateDisplayFormat, dateOptions);
	}
	return "";
}

export default function DateInput(props: Props) {
	const {
		className,
		value,
		dateOptions,
		dateDisplayFormat,
		onBlur,
		onChange,
		onKeyDown,
		...htmlProps
	} = { ...defaultProps, ...props };

	const [invalid, setInvalid] = React.useState(false);
	const [changed, setChanged] = React.useState(false);
	const [tempValue, setTempValue] = React.useState(
		formatDate({ value, dateDisplayFormat, dateOptions }),
	);
	React.useEffect(() => {
		setTempValue(formatDate({ value, dateDisplayFormat, dateOptions }));
	}, [value]);

	const update = (value: ReturnType<typeof formatDate>) => {
		if (invalid || !changed || !value) {
			return;
		}
		const parsed = parse(
			value,
			dateDisplayFormat,
			new Date(),
			dateOptions as Parameters<typeof parse>[3],
		);

		if (isValid(parsed)) {
			setChanged(false);
			onChange && onChange(parsed);
		} else {
			setInvalid(true);
		}
	};
	const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
		event,
	) => {
		const key = event.key || event.keyCode;
		if (key === "Enter") {
			update(tempValue);
		}
		onKeyDown && onKeyDown(event);
	};

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
		event,
	) => {
		setInvalid(false);
		setChanged(true);
		setTempValue(event.target.value);
	};

	const handleBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
		update(tempValue);
		onBlur && onBlur(event);
	};
	return (
		<DateInputBlock
			className={classnames("rdrDateInput", className)}
			isInvalid={invalid}
		>
			<input
				value={tempValue}
				onKeyDown={handleKeyDown}
				onChange={handleChange}
				onBlur={handleBlur}
				{...(htmlProps as any)}
			/>
		</DateInputBlock>
	);
}
const DateInputBlock = styled.span<{ isInvalid: boolean }>`
	${(props) => props.isInvalid && `border: 1px solid red;`}
`;

DateInput.propTypes = {
	value: PropTypes.object,
	placeholder: PropTypes.string,
	disabled: PropTypes.bool,
	readOnly: PropTypes.bool,
	dateOptions: PropTypes.object,
	dateDisplayFormat: PropTypes.string,
	className: PropTypes.string,
	onFocus: PropTypes.func.isRequired,
	onBlur: PropTypes.func,
	onChange: PropTypes.func.isRequired,
};

DateInput.defaultProps = {
	readOnly: true,
	disabled: false,
	dateDisplayFormat: "MMM D, YYYY",
};
