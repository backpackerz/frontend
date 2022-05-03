import React, {
	Fragment,
	useState,
	useRef,
	useEffect,
	useCallback,
} from "react";
import { createPortal } from "react-dom";
import { TransitionGroup } from "react-transition-group";
import { POSITIONS, TRANSITIONS, TYPES } from "./constants";
import { groupBy } from "../../../utils";
import DefaultContext, { AlertContext } from "./Context";
import Wrapper from "./Wrapper";
import Transition from "./Transition";
import AlertTemplate, { Props as TemplateProps } from "./Template";
import { ValueOf, Alert, AlertOptions } from "./@types";

export type Props = {
	children?: React.ReactNode;
	offset: string;
	position: ValueOf<typeof POSITIONS>;
	timeout: number;
	type?: ValueOf<typeof TYPES>;
	transition?: ValueOf<typeof TRANSITIONS>;
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
	const root = useRef<HTMLDivElement>();
	const alertContext = useRef<AlertContext>();
	const timersId = useRef<NodeJS.Timeout[]>([]);
	const [alerts, setAlerts] = useState<Alert[]>([]);

	useEffect(() => {
		root.current = document.createElement("div");
		root.current.id = "__react-alert__";
		document.body.appendChild(root.current);
		const timersIdRef = timersId.current;

		return () => {
			timersIdRef.forEach(clearTimeout);
			if (root.current) document.body.removeChild(root.current);
		};
	}, []);

	const remove = useCallback((alert: Alert) => {
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

	const removeAll = useCallback(() => {
		if (!(alertContext.current && alertContext.current.alerts)) return;
		alertContext.current.alerts.forEach(remove);
	}, [remove]);

	const show = useCallback(
		(message = "", options: AlertOptions = {}) => {
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
			} as Alert;

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

	const success = useCallback(
		(message = "", options: AlertOptions = {}) => {
			options.type = TYPES.SUCCESS;
			return show(message, options);
		},
		[show],
	);

	const error = useCallback(
		(message = "", options: AlertOptions = {}) => {
			options.type = TYPES.ERROR;
			return show(message, options);
		},
		[show],
	);

	const info = useCallback(
		(message = "", options: AlertOptions = {}) => {
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
		(alert: Alert) => alert.options.position,
	);

	return (
		<Context.Provider value={alertContext}>
			{children}
			{root.current &&
				createPortal(
					<Fragment>
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
												(alert: Alert) => (
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
					</Fragment>,
					root.current,
				)}
		</Context.Provider>
	);
}
