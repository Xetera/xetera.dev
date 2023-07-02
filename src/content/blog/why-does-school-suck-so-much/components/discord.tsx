import {
  DiscordMessageContainer,
  DiscordMessage,
  DiscordMessageText,
  DiscordEmbed,
} from "🧱/messaging/Discord";

export const Conversation = ({ xeteraAvatar, tzuyuAvatar, thisArrow }) => {
  const friendProps = {
    username: "Tzuyu",
    roleColor: "text-green-500",
    date: "2:25 PM",
    avatar: tzuyuAvatar,
  };
  return (
    <DiscordMessageContainer>
      <DiscordMessage
        {...friendProps}
        messages={[
          "DUDE",
          <DiscordMessageText>
            have you seen this guy's videos?{" "}
            <a href="https://www.youtube.com/watch?v=X32dce7_D48">
              https://www.youtube.com/watch?v=X32dce7_D48
            </a>
          </DiscordMessageText>,
          <DiscordMessageText>
            <DiscordEmbed
              color="border-red-500"
              top="Youtube"
              title="Eddie Woo"
              content={
                <a
                  className="external-link"
                  href="https://www.youtube.com/watch?v=X32dce7_D48"
                  color="blue.400"
                >
                  Why is 0! = 1?
                </a>
              }
            >
              <iframe
                className="rounded w-full h-[315px]"
                src="https://www.youtube-nocookie.com/embed/X32dce7_D48"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={true}
              />
            </DiscordEmbed>
          </DiscordMessageText>,
          "Man if Ms. Connell taught us math like this I would've had a degree in math already",
        ]}
        reactions={[{ name: ":this:", reactCount: 2, image: thisArrow }]}
      />
      <DiscordMessage
        username="Xetera"
        roleColor="text-purple-500"
        date="2:25 PM"
        avatar={xeteraAvatar}
        messages={["But you don't even have a highschool diploma yet"]}
      />
      <DiscordMessage
        {...friendProps}
        messages={[
          "Shut up",
          "watch the video",
          <DiscordMessageText>
            Why does math feel like torture in school when it's so fun on
            youtube...{" "}
            <a href="https://www.youtube.com/watch?v=Kas0tIxDvrg">
              https://www.youtube.com/watch?v=Kas0tIxDvrg
            </a>
          </DiscordMessageText>,
          <DiscordMessageText>
            <DiscordEmbed
              color="border-red-500"
              top="Youtube"
              title="3Blue1Brown"
              content={
                <a
                  className="external-link"
                  href="https://www.youtube.com/watch?v=Kas0tIxDvrg"
                  color="blue.400"
                >
                  Exponential growth and epidemics{" "}
                </a>
              }
            >
              <iframe
                className="rounded w-full h-[315px]"
                src="https://www.youtube-nocookie.com/embed/Kas0tIxDvrg"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </DiscordEmbed>
          </DiscordMessageText>,
        ]}
      />
    </DiscordMessageContainer>
  );
};
