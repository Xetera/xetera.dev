import type { PropsWithChildren } from "react";
import {
	DiscordMessage,
	DiscordMessageContainer,
	DiscordMessageText,
	type DiscordMessageProps,
} from "🧱/messaging/Discord";

type ConversationOwner = Omit<DiscordMessageProps, "username" | "roleColor">;

export const Me = (props: ConversationOwner) => (
	<DiscordMessage {...props} username="Xetera" roleColor="color-pink-300" />
);

export const Tzuyu = (props: ConversationOwner) => (
	<DiscordMessage {...props} username="Tzuyu" roleColor="color-blue-400" />
);

export const C = ({ children }: PropsWithChildren) => <code className=".">{children}</code>;

export const Conversation = ({
	yooYikes,
	sanaKek,
	tzuyuAvatar,
	dubuAvatar,
	xeteraAvatar,
// biome-ignore lint/suspicious/noExplicitAny: type this
}: any) => (
	<DiscordMessageContainer>
		<Me
			message="So why do you think the if statement works if the string isn't empty?"
			date="Today at 9:42 PM"
			{...{ avatar: xeteraAvatar.src }}
		/>
		<Tzuyu
			message="Because a non-empty string is truthy, right?"
			date="Today at 9:42 PM"
			{...{ avatar: tzuyuAvatar.src }}
		/>
		<Me
			message="Yeah, do you know what that means?"
			date="Today at 9:43 PM"
			{...{ avatar: xeteraAvatar.src }}
		/>
		<Tzuyu
			messages={[
				"Yeah",
				"I think so",
				<DiscordMessageText key="message">
					like if you were comparing "test" == true it would be truthy
				</DiscordMessageText>,
			]}
			date="Today at 9:44 PM"
			reactions={[
				{
					image: yooYikes,
					reactCount: 2,
					reacted: true,
					name: ":yooyikes:",
				},
			]}
			{...{ avatar: tzuyuAvatar }}
		/>

		<Me
			message="Have you actually tried that?"
			date="Today at 9:45 PM"
			{...{ avatar: xeteraAvatar.src }}
		/>
		<Tzuyu
			messages={["no"]}
			date="Today at 9:45 PM"
			{...{ avatar: tzuyuAvatar.src }}
		/>
		<Tzuyu
			messages={["wait wtf"]}
			date="Today at 9:47 PM"
			reactions={[
				{
					image: sanaKek,
					reactCount: 2,
					reacted: false,
					name: ":sana_kek:",
				},
			]}
			{...{ avatar: tzuyuAvatar.src }}
		/>
		<DiscordMessage
			roleColor="color-text-800"
			avatar={dubuAvatar.src}
			username="Dubu"
			message="lmao"
			date="Today at 9:48 PM"
		/>
	</DiscordMessageContainer>
);
