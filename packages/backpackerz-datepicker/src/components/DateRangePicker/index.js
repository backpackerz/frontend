import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import DateRange from "../DateRange";
import DefinedRange from "../DefinedRange";
import { findNextRangeIndex, generateStyles } from "../../utils";
import coreStyles from "../../styles";

class DateRangePicker extends Component {
	constructor(props) {
		super(props);
		this.state = {
			focusedRange: [findNextRangeIndex(props.ranges), 0],
		};
		this.styles = generateStyles([coreStyles, props.classNames]);
	}
	render() {
		const { focusedRange } = this.state;
		return (
			<div
				className={classnames(
					this.styles.dateRangePickerWrapper,
					this.props.className,
				)}
			>
				{this.props.showDefined && (
					<DefinedRange
						focusedRange={focusedRange}
						onPreviewChange={(value) =>
							this.dateRange.updatePreview(
								value
									? this.dateRange.calcNewSelection(
											value,
											typeof value === "string",
									  )
									: null,
							)
						}
						{...this.props}
						range={this.props.ranges[focusedRange[0]]}
						className={undefined}
					/>
				)}
				<DateRange
					onRangeFocusChange={(focusedRange) =>
						this.setState({ focusedRange })
					}
					focusedRange={focusedRange}
					{...this.props}
					ref={(t) => (this.dateRange = t)}
					className={undefined}
				/>
			</div>
		);
	}
}

DateRangePicker.defaultProps = {
	showDefined: false,
};

DateRangePicker.propTypes = {
	id: PropTypes.string,
	...DateRange.propTypes,
	...DefinedRange.propTypes,
	className: PropTypes.string,
	showDefined: PropTypes.bool,
};

export default DateRangePicker;
