import * as React from "react";
import { createPortal } from "react-dom";
import { TransitionGroup } from "react-transition-group";

import {
	POSITIONS,
	TRANSITIONS,
	TYPES,
} from "@backpackerz/components/variables/constants/alert";
import DefaultContext from "./Context";
import Wrapper from "../../components/Wrapper";
import Transition from "../../components/Transition";
import AlertTemplate, {
	Props as TemplateProps,
} from "../../components/Template";
import { groupBy } from "@backpackerz/components/utils";
import type { Alert } from "@backpackerz/components/types";

export type Props = {
	children?: React.ReactNode;
	offset: string;
	position: typeof POSITIONS[keyof typeof POSITIONS];
	timeout: number;
	type?: typeof TYPES[keyof typeof TYPES];
	transition?: typeof TRANSITIONS[keyof typeof TRANSITIONS];
	containerStyle?: React.CSSProperties;
	template: React.ComponentType<TemplateProps>;
	Context?: typeof DefaultContext;
};

export default function Provider(props: Props) {
	const {
		children = null,
		offset = "10px",
		position = POSITIONS.TOP_CENTER,
		timeout = 3000,
		type = TYPES.INFO,
		transition = TRANSITIONS.FADE,
		containerStyle = {
			zIndex: 9999,
		},
		template: AlertComponent = AlertTemplate,
		Context = DefaultContext,
		...rest
	} = props;
	const root = React.useRef<HTMLDivElement>();
	const alertContext = React.useRef<Alert.Context>();
	const timersId = React.useRef<NodeJS.Timeout[]>([]);
	const [alerts, setAlerts] = React.useState<Alert.AlertType[]>([]);

	React.useEffect(() => {
		root.current = document.createElement("div");
		root.current.id = "__react-alert__";
		document.body.appendChild(root.current);
		const timersIdRef = timersId.current;

		return () => {
			timersIdRef.forEach(clearTimeout);
			if (root.current) document.body.removeChild(root.current);
		};
	}, []);

	const remove = React.useCallback((alert: Alert.AlertType) => {
		setAlerts((currentAlerts) => {
			const lengthBeforeRemove = currentAlerts.length;
			const filteredAlerts = currentAlerts.filter(
				(a) => a.id !== alert.id,
			);

			if (
				lengthBeforeRemove > filteredAlerts.length &&
				alert.options.onClose
			) {
				alert.options.onClose();
			}

			return filteredAlerts;
		});
	}, []);

	const removeAll = React.useCallback(() => {
		if (!(alertContext.current && alertContext.current.alerts)) return;
		alertContext.current.alerts.forEach(remove);
	}, [remove]);

	const show = React.useCallback(
		(message = "", options: Alert.Options = {}) => {
			const id = Math.random().toString(36).substr(2, 9);

			const alertOptions = {
				position: options.position || position,
				timeout,
				type,
				...options,
			};

			const alert = {
				id,
				message,
				options: alertOptions,
			} as Alert.AlertType;

			alert.close = () => remove(alert);

			if (alert.options.timeout) {
				const timerId = setTimeout(() => {
					remove(alert);

					timersId.current.splice(
						timersId.current.indexOf(timerId),
						1,
					);
				}, alert.options.timeout);

				timersId.current.push(timerId);
			}

			setAlerts((state) => state.concat(alert));
			if (alert.options.onOpen) alert.options.onOpen();

			return alert;
		},
		[position, remove, timeout, type],
	);

	const success = React.useCallback(
		(message = "", options: Alert.Options = {}) => {
			options.type = TYPES.SUCCESS;
			return show(message, options);
		},
		[show],
	);

	const error = React.useCallback(
		(message = "", options: Alert.Options = {}) => {
			options.type = TYPES.ERROR;
			return show(message, options);
		},
		[show],
	);

	const info = React.useCallback(
		(message = "", options: Alert.Options = {}) => {
			options.type = TYPES.INFO;
			return show(message, options);
		},
		[show],
	);

	alertContext.current = {
		alerts,
		show,
		remove,
		removeAll,
		success,
		error,
		info,
	};

	const alertsByPosition = groupBy(
		alerts,
		(alert: Alert.AlertType) => alert.options.position,
	);

	return (
		<Context.Provider value={alertContext}>
			{children}
			{root.current &&
				createPortal(
					<>
						{Object.entries(POSITIONS).map(([_, position]) => {
							return (
								<TransitionGroup
									appear
									key={position}
									options={{ position, containerStyle }}
									component={Wrapper}
									{...rest}
								>
									{alertsByPosition[position]
										? alertsByPosition[position].map(
												(alert: Alert.AlertType) => (
													<Transition
														type={transition}
														key={alert.id}
													>
														<AlertComponent
															style={{
																margin: offset,
																pointerEvents:
																	"all",
															}}
															{...alert}
														/>
													</Transition>
												),
										  )
										: null}
								</TransitionGroup>
							);
						})}
					</>,
					root.current,
				)}
		</Context.Provider>
	);
}
