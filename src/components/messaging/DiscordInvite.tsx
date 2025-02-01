import { useCallback, useEffect, useState } from "react";
import cls from "clsx";

export type DiscordInviteProps = {
	serverName: string;
	serverId: string;
	inviteCode: string;
	className?: string;
};

export type DiscordResponse = {
	approximate_presence_count: number;
	approximate_member_count: number;
	guild: {
		icon: string;
	};
};

const formatter = new Intl.NumberFormat();

export function DiscordInvite(props: DiscordInviteProps) {
	const [inviteCounts, setInviteCounts] = useState<DiscordResponse | null>(
		null,
	);

	const fetchCounts = useCallback(async () => {
		const res = await fetch(
			`https://discord.com/api/invites/${props.inviteCode}?with_counts=true`,
			{ cache: "force-cache" },
		);
		return await res.json();
	}, [props.inviteCode]);

	useEffect(() => {
		fetchCounts().then(setInviteCounts);
	}, [fetchCounts]);

	return (
		<div
			className={cls(
				"bg-discord-background p-4 text-sans max-w-md w-full rounded",
				props.className,
			)}
		>
			<h1 className="not-prose color-discord-primary-500 text-sm font-bold uppercase mb-4">
				You've been invited to join a server
			</h1>
			<div className="flex flex-wrap justify-between gap-5 items-center">
				<img
					alt="logo of the discord server"
					className="h-[56px] w-[56px] m-0 rounded-lg h-full aspect-square"
					src={
						inviteCounts
							? `https://cdn.discordapp.com/icons/${props.serverId}/${inviteCounts?.guild.icon}.webp`
							: "https://cdn.discordapp.com/embed/avatars/0.png"
					}
					height="56"
					width="56"
					loading="lazy"
				/>
				<div className="flex flex-col grow basis-auto">
					<h2 className="not-prose color-discord-text font-semibold text-lg">
						{props.serverName}
					</h2>
					<div className="flex gap-3 items-center color-text-500">
						<div className="flex gap-2 items-center">
							<div className="bg-green-700 w-2 h-2 rounded-full" />
							<p className="m-0 not-prose text-sm">
								{inviteCounts
									? formatter.format(inviteCounts?.approximate_presence_count)
									: "?"}{" "}
								Online
							</p>
						</div>
						<div className="flex gap-2 items-center">
							<div className="bg-gray-500 w-2 h-2 rounded-full" />
							<p className="m-0 not-prose text-sm">
								{inviteCounts
									? formatter.format(
											inviteCounts?.approximate_member_count ?? 0,
										)
									: "?"}{" "}
								Members
							</p>
						</div>
					</div>
				</div>
				<a
					className="bg-green-700 h-[40px] color-white external-link px-4 py-1 rounded self-center items-center text-base py-1 font-medium decoration-none inline-flex grow justify-center"
					target="_blank"
					rel="noreferrer noopener"
					href={`https://discord.gg/${props.inviteCode}`}
				>
					Join
				</a>
			</div>
		</div>
	);
}
