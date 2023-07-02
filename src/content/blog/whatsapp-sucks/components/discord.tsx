import { DiscordMessageContainer, DiscordMessage } from "🧱/messaging/Discord";

export const Conversation = ({
  whatsappAvatar,
  prolly,
  peepoBoomer,
  downvote,
  angry,
  xeteraAvatar,
  uhuh,
}) => {
  return (
    <DiscordMessageContainer>
      <DiscordMessage
        message="Hey man, why does a chat program need features? Isn't it enough for it to just allow you to chat with people?"
        username="Definitely Not a Facebook Employee"
        roleColor="pink.700"
        date="Today at 5:05 AM"
        avatar={whatsappAvatar}
        reactions={[
          {
            image: prolly,
            reactCount: 12,
            reacted: false,
            name: ":anodprobably:",
          },
        ]}
      />
      <DiscordMessage
        message="If I can chat on it, it's good bro."
        username="Boomer"
        roleColor="orange.700"
        date="Today at 5:10 AM"
        avatar={peepoBoomer}
      />
      <DiscordMessage
        message="But there are so many problems with it, shouldn't you expect an app to be good and improving?"
        username="Xetera"
        roleColor="pink.600"
        date="Today at 5:12 AM"
        reactions={[
          { image: downvote, reactCount: 35, name: ":no:" },
          { image: angry, reactCount: 27, name: ":angery:" },
        ]}
        avatar={xeteraAvatar}
      />
      <DiscordMessage
        message="That's the most ridiculous thing I've ever heard."
        username="Definitely Not a Facebook Employee"
        roleColor="pink.700"
        date="Today at 5:13 AM"
        avatar={whatsappAvatar}
        reactions={[
          { image: uhuh, reactCount: 1, reacted: true, name: ":uhuh:" },
        ]}
      />
    </DiscordMessageContainer>
  );
};
