import type { ImageMetadata } from "astro";
import {
	DiscordMessageContainer,
	DiscordMessage,
	DiscordMessageText,
	DiscordMention,
} from "🧱/messaging/Discord";

export const Intro = ({
	marcoAvatar,
}: {
	marcoAvatar: ImageMetadata;
	xetAvatar: ImageMetadata;
	dracAvatar: ImageMetadata;
}) => {
	const marcoProps = {
		username: "marco_rennmaus | Rennmoose2",
		roleColor: "color-red-300",
		avatar: marcoAvatar,
	};

	return (
		<DiscordMessageContainer>
			<DiscordMessage
				messages={[
					<DiscordMessageText key="first">
						Hey xet apparently{" "}
						<a
							rel="external nofollower noreferrer"
							target="_blank"
							href="https://docs.top.gg"
						>
							https://docs.top.gg
						</a>{" "}
						is banned in India?
					</DiscordMessageText>,
					"might wanna check this one out",
					"one of the users is having problems with it",
				]}
				date="like probably 5 minutes ago"
				{...marcoProps}
			/>
		</DiscordMessageContainer>
	);
};

const marcoProps = ({ marcoAvatar }: { marcoAvatar: string }) => ({
	username: "marco_rennmaus | Rennmoose2",
	roleColor: "color-red-300",
	avatar: marcoAvatar,
});

const xetProps = ({ xetAvatar }: { xetAvatar: string }) => ({
	username: "Xetera",
	roleColor: "text-blue-300",
	avatar: xetAvatar,
});

const dracProps = ({ dracAvatar }: { dracAvatar: string }) => ({
	username: "Drac",
	avatar: dracAvatar,
	roleColor: "text-red-400",
});

export const skyProps = ({ skyAvatar }: { skyAvatar: string }) => ({
	username: "Sky",
	avatar: skyAvatar,
	roleColor: "text-teal-400",
});

export const Intro2 = ({
	proof,
	proof2,
	mavericAvatar,
	xetAvatar,
	marcoAvatar,
	// biome-ignore lint/suspicious/noExplicitAny: type this
}: any) => {
	return (
		<DiscordMessageContainer>
			<DiscordMessage
				messages={[
					<img
						key="first"
						className="mb-2"
						src={proof.src}
						alt="Your requested URL has been blocked as per the directions received from Department of Telecommunications, Government of India."
					/>,
					"any reason why?",
					"you have some expired license for that URL or something?",
				]}
				username="Maverick Wolf"
				roleColor="text-green-300"
				date="06/28/2021"
				avatar={mavericAvatar}
			/>
			<DiscordMessage
				messages={[
					"lemme check with a VPN",
					"huh, weird",
					<img
						key="first"
						className="mb-2"
						src={proof2.src}
						alt="Screenshot showing the above"
					/>,
					"could be getting caught in a wide net cast on some subdomains",
				]}
				date="06/28/2021"
				{...xetProps({ xetAvatar })}
			/>
			<DiscordMessage
				messages={["well uhm", "how to fix kekw"]}
				date="06/28/2021"
				{...marcoProps({ marcoAvatar })}
			/>
			<DiscordMessage
				messages={[
					"apparently some indian isps briefly banned google docs in 2014",
					"could be some sort of clash with that?",
					"docs.google.com, docs.top.gg",
				]}
				date="06/28/2021"
				{...xetProps({ xetAvatar })}
			/>
		</DiscordMessageContainer>
	);
};

export const Telecommunications = ({
	xetAvatar,
	windowsUserAvatar,
	// biome-ignore lint/suspicious/noExplicitAny: type this
}: any) => {
	const windowsUserProps = {
		username: "windows user",
		roleColor: "color-text-800",
		avatar: windowsUserAvatar,
	};

	return (
		<DiscordMessageContainer>
			<DiscordMessage
				messages={[
					"does anyone know how I can get in touch with department of telecommunications in india lol",
				]}
				{...xetProps({ xetAvatar })}
				date="06/28/2021"
			/>
			<DiscordMessage
				messages={["any reason for that?"]}
				date="06/28/2021"
				{...windowsUserProps}
			/>
			<DiscordMessage
				messages={[
					"one of the sites I work on is blocked by them and my indian users can't access the site",
					"it's literally just api documentation. I have no idea why it would be blocked",
				]}
				{...xetProps({ xetAvatar })}
				date="06/28/2021"
			/>
			<DiscordMessage
				messages={[
					"That's the Indian government for you",
					"You can always try writing an email to them",
				]}
				date="06/28/2021"
				{...windowsUserProps}
			/>
		</DiscordMessageContainer>
	);
};

export const Debugging = ({
	windowsUserAvatar,
	dracAvatar,
	xetAvatar,
	skyAvatar,
	proofSky,
	// biome-ignore lint/suspicious/noExplicitAny: type this
}: any) => {
	const windowsUserProps = {
		username: "windows user",
		roleColor: "color-text-800",
		avatar: windowsUserAvatar,
	};

	return (
		<DiscordMessageContainer>
			<DiscordMessage
				messages={[
					"Can someone help me figure out why the Department of Telecommunications banned my site.",
					<DiscordMessageText key="first">
						<a
							rel="external nofollower noreferrer"
							target="_blank"
							href="https://docs.top.gg"
						>
							https://docs.top.gg
						</a>{" "}
						if any of you are in India and want to check for me
					</DiscordMessageText>,
				]}
				date="06/28/2021"
				{...xetProps({ xetAvatar })}
			/>
			<DiscordMessage
				messages={[
					"sigh",
					<img key="second" alt="profile" src={proofSky.src} />,
				]}
				date="06/28/2021"
				{...skyProps({ skyAvatar })}
			/>
			<DiscordMessage
				messages={["Working for me"]}
				date="06/28/2021"
				{...windowsUserProps}
			/>
			<DiscordMessage
				messages={["I'm in kolkata, india", "using jio as ISP"]}
				date="06/28/2021"
				{...skyProps({ skyAvatar })}
			/>
			<DiscordMessage
				messages={["I'm in noida"]}
				date="06/28/2021"
				{...windowsUserProps}
			/>
			<DiscordMessage
				messages={["Are you using your ISP's DNS though?"]}
				date="06/28/2021"
				{...xetProps({ xetAvatar })}
			/>
			<DiscordMessage
				messages={["Oh right, it works with cloudflare DNS"]}
				date="06/28/2021"
				{...skyProps({ skyAvatar })}
			/>
			<DiscordMessage
				messages={["Works for me", "(im in india)"]}
				date="06/28/2021"
				{...dracProps({ dracAvatar })}
			/>
			<DiscordMessage
				messages={["probably because you aren't using your isp's dns"]}
				date="06/28/2021"
				{...skyProps({ skyAvatar })}
			/>
			<DiscordMessage
				messages={["it's either that or some ISPs don't enforce the ban"]}
				date="06/28/2021"
				{...xetProps({ xetAvatar })}
			/>
			<DiscordMessage
				messages={["It's working even on my phone"]}
				date="06/28/2021"
				{...windowsUserProps}
			/>
		</DiscordMessageContainer>
	);
};

export const Isp = ({
	xetAvatar,
	skyAvatar,
	dracAvatar,
	windowsUserAvatar,
	// biome-ignore lint/suspicious/noExplicitAny: type this
}: any) => {
	const windowsUserProps = {
		username: "windows user",
		roleColor: "color-text-800",
		avatar: windowsUserAvatar,
	};
	return (
		<DiscordMessageContainer>
			<DiscordMessage
				messages={["what isp are you all using"]}
				date="06/28/2021"
				{...xetProps({ xetAvatar })}
			/>
			<DiscordMessage
				messages={["Jio"]}
				date="06/28/2021"
				{...windowsUserProps}
			/>
			<DiscordMessage
				messages={["I'm on airtel"]}
				date="06/28/2021"
				{...dracProps({ dracAvatar })}
			/>
			<DiscordMessage
				messages={["jio here too"]}
				date="06/28/2021"
				{...skyProps({ skyAvatar })}
			/>
		</DiscordMessageContainer>
	);
};

// biome-ignore lint/suspicious/noExplicitAny: type this
export const ItWorks = ({ xetAvatar, skyAvatar }: any) => {
	return (
		<DiscordMessageContainer>
			<DiscordMessage
				messages={[
					<div key="first">
						<DiscordMention>@Sky</DiscordMention>
						<DiscordMessageText className="inline">
							could you check on the first device that was blocked if you're
							still free? I feel like it's just working now for no reason
						</DiscordMessageText>
					</div>,
				]}
				date="06/28/2021"
				{...xetProps({ xetAvatar })}
			/>
			<DiscordMessage
				message="k let me reset my dns back to how it was then"
				date="06/28/2021"
				{...skyProps({ skyAvatar })}
			/>
			<DiscordMessage
				message="ur the best"
				date="06/28/2021"
				{...xetProps({ xetAvatar })}
			/>
			<DiscordMessage
				messages={["um, it works now?", "how"]}
				date="06/28/2021"
				{...skyProps({ skyAvatar })}
			/>
			<DiscordMessage
				messages={["this is so weird", "I hate this so much"]}
				date="06/28/2021"
				{...xetProps({ xetAvatar })}
			/>
		</DiscordMessageContainer>
	);
};
