import * as React from "react";
import styled from "@emotion/styled";
import { v4 as uuidv4 } from "uuid";

import SelectOption, { OptionType } from "./Option";

import useOutsideClick from "../../../hooks/useOutsideClick";
import { palette } from "../../../styles/palette";

export type Props = React.PropsWithChildren<
	Pick<React.HTMLProps<HTMLDivElement>, "aria-labelledby"> & {
		className?: string;
		options: OptionType[];
		selectedOption: OptionType["value"];
		onSelected:
			| ((value: OptionType["value"]) => void)
			| React.Dispatch<React.SetStateAction<OptionType>>;
	}
>;

const defaultProps: Required<{}> = {};

// function measureTextWidth(text: string, font: string) {
// 	const canvas = document.createElement("canvas");
// 	const context: CanvasRenderingContext2D = canvas.getContext("2d")!;

// 	context.font = font || getComputedStyle(document.body).font;

// 	return context.measureText(text).width;
// }

function getMaxText(strArr: string[]) {
	return Math.max(...strArr.map((value) => value.length));
}

export default function Select(props: Props) {
	const {
		className,
		options,
		selectedOption,
		onSelected,
		children,
		...htmlProps
	} = { ...defaultProps, ...props };
	const selectedOptionIndex = options.findIndex(
		({ value }) => value == selectedOption,
	);
	const [isFocused, setIsFocused] = React.useState(false);
	const [isPopupExpanded, setIsPopupExpanded] =
		React.useState<boolean>(false);
	const [focusedOptionIndex, setFocusedOptionIndex] = React.useState(() => {
		return options.findIndex(({ value }) => value == selectedOption);
	});

	let labelId = htmlProps["aria-labelledby"];
	React.useEffect(() => {
		if (!labelId) labelId = uuidv4();
	}, []);

	const handleClickOutsideTargetRef = useOutsideClick<HTMLDivElement>(() => {
		setIsPopupExpanded(false);
	});
	const maxTextLength = getMaxText(options.map(({ label }) => label));

	const handleFocus: React.FocusEventHandler = () => {
		setIsFocused(true);
		setFocusedOptionIndex(selectedOptionIndex);
	};
	const handleBlur: React.FocusEventHandler = (event) => {
		setIsFocused(false);
		setFocusedOptionIndex(selectedOptionIndex);
	};
	const handleOptionMouseOver = (index: number) => () => {
		setFocusedOptionIndex(index);
	};
	const handleKeyDown: React.KeyboardEventHandler = (event) => {
		event.preventDefault();
		const key = event.key || event.keyCode;
		switch (key) {
			case "ArrowDown":
			case "40":
				if (!isPopupExpanded) setIsPopupExpanded(true);
				else {
					setFocusedOptionIndex((idx) => {
						return idx >= options.length - 1 ? 0 : idx + 1;
					});
				}
				break;
			case "ArrowUp":
			case 38:
				if (isPopupExpanded) {
					setFocusedOptionIndex((idx) => {
						return idx == 0 ? options.length - 1 : idx - 1;
					});
				}
				break;
			case "Enter":
			case 13:
				if (isPopupExpanded) {
					onSelected(options[focusedOptionIndex].value);
					setIsPopupExpanded(false);
				}
				break;
			case "Tab":
			case 9:
				setIsPopupExpanded(false);
				break;
		}
	};
	const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = (
		event,
	) => {
		event.preventDefault();
		setIsPopupExpanded((preventState) => !preventState);
	};
	const handleSelectOption = (option: OptionType) => () => {
		onSelected(option.value);
		setIsPopupExpanded(false);
	};
	const optionElements = options.map((option, index) => (
		<SelectOption
			key={option.value}
			isFocus={focusedOptionIndex === index}
			value={option.value}
			label={option.label}
			onMouseOver={handleOptionMouseOver(index)}
			onClick={handleSelectOption(option)}
		/>
	));
	return (
		<SelectBlock
			className={className}
			maxTextLength={maxTextLength}
			onFocus={handleFocus}
			onBlur={handleBlur}
			onKeyDown={handleKeyDown}
			ref={handleClickOutsideTargetRef}
			{...(htmlProps as any)}
		>
			<SelectButton
				onClick={handleButtonClick}
				aria-haspopup="listbox"
				aria-labelledby={labelId}
				aria-expanded={isPopupExpanded}
				role="button"
			>
				<div className="pseudo-value" id={labelId}>
					{options[selectedOptionIndex].label}
				</div>
			</SelectButton>
			<SelectList
				visible={isPopupExpanded}
				maxTextLength={maxTextLength}
				aria-activedescendant=""
				data-cached-selected={options[selectedOptionIndex].label}
				role="listbox"
			>
				{optionElements}
			</SelectList>
		</SelectBlock>
	);
}

const SelectBlock = styled.span<{ maxTextLength: number }>`
	display: inline-flex;
	position: relative;
	height: 3.4em;
	min-width: ${(props) => Number(props.maxTextLength) * 1.4 + 2}em;
`;

const SelectButton = styled.button`
	height: 2.5em;
	width: 100%;
	min-width: 7.6rem;
	line-height: 2.5em;

	padding: 1px 2px;
	border: 1px solid transparent;
	border-radius: 0.4em;
	background-color: #ffffff;
	font-size: 1.4em;
	user-select: none;
	box-shadow: 0 1px 2px 0 rgb(35 57 66 / 21%);
	cursor: pointer;
	color: #7d888d;
	&:hover,
	&:focus {
		outline: none;
		box-shadow: 0 1px 2px 0 ${(props) => palette.gray7};
		transition: border-color 0.2s;
	}
	&::after {
		position: absolute;
		right: 2px;
		top: 0px;
		font-size: 1em;
		content: ${(props) => (props["aria-expanded"] ? `"△"` : `"▽"`)};
	}
	.pseudo-value {
		margin-right: 1.4em;
	}
`;

const SelectList = styled.ul<{ visible: boolean; maxTextLength: number }>`
	position: absolute;
	top: 100%;
	display: ${(props) => (props.visible ? "block" : "none")};
	width: 100%;
	min-width: ${(props) => Number(props.maxTextLength) * 1.4 + 3}em;
	margin: 0.4em 0 0 0;
	padding: 0;
	background-color: #fff;
	border: 1px solid ${(props) => palette.gray3};
	border-radius: 0.4em;
	z-index: 1;
`;
