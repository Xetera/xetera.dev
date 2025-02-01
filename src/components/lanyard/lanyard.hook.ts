import { useCallback, useEffect, useRef, useState } from "react";

const MAX_FAILED_CONNECTIONS = 5;

export function useLanyard(discordId: string) {
	const heartBeatInterval = useRef<NodeJS.Timeout | undefined>();
	const socket = useRef<WebSocket | undefined>();
	const reconnectAttempts = useRef<number>(0);
	const [data, setData] = useState({});

	const attemptConnect = useCallback(() => {
		const ws = new WebSocket("wss://api.lanyard.rest/socket");
		ws.addEventListener("close", attemptReconnect);
		ws.addEventListener("message", messageListener);
		ws.addEventListener("open", open);
		return ws;
	}, []);

	const open = useCallback(() => {
		console.log("Connected to lanyard");
		reconnectAttempts.current = 0;
	}, []);

	const attemptReconnect = useCallback(() => {
		if (reconnectAttempts.current > MAX_FAILED_CONNECTIONS) {
			console.warn(
				`Could not establish connection after ${MAX_FAILED_CONNECTIONS} attempts`,
			);
			return;
		}
		console.log("Attempting to reconnect to lanyard");
		reconnectAttempts.current++;
		setTimeout(() => {
			socket.current = attemptConnect();
		}, 200);
	}, [attemptConnect]);

	const messageListener = useCallback(
		(message: MessageEvent<string>) => {
			const incoming = JSON.parse(message.data);
			if (incoming.op === 1) {
				const msg = {
					op: 2,
					d: { subscribe_to_id: discordId },
				};
				if (!socket.current) {
					throw Error(
						`Socket not initialized for message receive ${JSON.stringify(
							incoming,
						)}`,
					);
				}
				socket.current.send(JSON.stringify(msg));
				heartBeatInterval.current = setInterval(() => {
					try {
						socket.current?.send(JSON.stringify({ op: 3 }));
					} catch (err) {
						console.error("Couldn't send heartbeat, exiting");
						console.error(err);
						if (socket.current) {
							cleanup(socket.current);
						}
					}
				}, incoming.d.heartbeat_interval);
				return;
			}
			setData(incoming.d);
		},
		[discordId],
	);

	const cleanup = useCallback(
		(socket: WebSocket) => {
			if (heartBeatInterval.current) {
				clearInterval(heartBeatInterval.current);
			}
			socket.removeEventListener("message", messageListener);
			socket.removeEventListener("close", attemptReconnect);
			socket.removeEventListener("open", open);
		},
		[messageListener, attemptReconnect, open],
	);

	useEffect(() => {
		socket.current = attemptConnect();
		return () => {
			if (socket.current) {
				return cleanup(socket.current);
			}
		};
	}, [attemptConnect, cleanup]);

	return {
		...data,
		discordId,
	};
}
