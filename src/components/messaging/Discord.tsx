import {
  useRef,
  type PropsWithChildren,
  useState,
  useEffect,
  forwardRef,
  Fragment,
  ReactElement,
  ReactNode,
} from "react";
import cls from "classnames";
import type { ImageMetadata } from "astro";

export function DiscordMessageContainer({
  children,
}: PropsWithChildren<unknown>) {
  return (
    <div className="border-t-1 border-b-1 py-5 border-body-600 md:bg-discord-background col-span-full w-full article-grid rounded lg:rounded-none">
      {children}
    </div>
  );
}

type DiscordReactionProps = {
  image: string | ImageMetadata;
  reactCount: number;
  reacted?: boolean;
  name: string;
};

export function DiscordReaction({
  image,
  reactCount,
  reacted: _reacted,
  name,
}: DiscordReactionProps) {
  const [reacts, setReacts] = useState(reactCount);
  const [reacted, setReacted] = useState(_reacted);
  let mounted = useRef<boolean>();
  useEffect(() => {
    mounted.current = true;
  }, []);
  useEffect(() => {
    if (!mounted.current) {
      return;
    }
    setReacts((prev) => (reacted ? prev + 1 : prev - 1));
  }, [reacted]);

  function react() {
    setReacted((prev) => !prev);
  }

  // const tooltip = (
  //   <div className="flex items-center px-2 py-2 m-0 rounded-md overflow-hidden">
  //     {typeof image === "string" ? (
  //       <img src={image} width="40" height="40" className="mr-2" />
  //     ) : (
  //       image
  //     )}
  //     <p className="text-discord-text mb-0 leading-none">
  //       {reacted
  //         ? reacts === 1
  //           ? `You reacted with ${name}`
  //           : `You and ${reacts - 1} others reacted with ${name}`
  //         : `${reacts} ${
  //             reacts === 1 ? "person" : "people"
  //           } reacted with ${name}`}
  //     </p>
  //   </div>
  // );

  return (
    <div
    // arrowShadowColor="gray-900"
    // background="discordBackground"
    // openDelay={500}
    // label={tooltip}
    // placement="top"
    // arrowPadding={0}
    // closeOnClick={false}
    >
      <div
        className={`flex border-subtle items-center rounded-md cursor-pointer px-2 py-0.5 border border-1 ${
          reacted
            ? "bg-discord-reaction-reacted-background border-discord-reaction-reacted-border"
            : "bg-discord-reaction-background border-transparent"
        }`}
        onClick={react}
      >
        {typeof image !== "string" ? (
          <img src={image.src} width="16" height="16" className="mb-0" />
        ) : (
          <div className="w-4 h-4">{image}</div>
        )}
        <p className={`my-[3px] text-xs ml-2 font-bold color-discord-text`}>
          {reacts}
        </p>
      </div>
    </div>
  );
}

export const DiscordMessageText = forwardRef<
  HTMLDivElement,
  PropsWithChildren<{ className?: string }>
>(({ children, className, ...props }, ref) => {
  return (
    <p
      className={cls(
        className,
        "text-lg font-normal color-discord-text leading-6 mb-2 mt-0"
      )}
      ref={ref}
      {...props}
    >
      {children}
    </p>
  );
});

type DiscordMessageAvatarProps = {
  avatar: string | ImageMetadata;
  username: string;
};

const DiscordMessageAvatar = ({
  avatar,
  username,
}: DiscordMessageAvatarProps) => {
  const [loaded, setLoaded] = useState(false);

  if (typeof avatar === "string" || "src" in avatar) {
    return (
      <div className={`${loaded ? "" : "rounded-full h-[40px] w-[40px]"}`}>
        <img
          alt={`Avatar for ${username}`}
          height="40"
          width="40"
          className="object-cover"
          src={typeof avatar === "string" ? avatar : avatar.src}
          onLoad={() => setLoaded(true)}
        />
      </div>
    );
  }

  return avatar;
};

type DiscordEmbedProps = {
  top: string;
  color: string;
  title: ReactNode;
  content: ReactNode;
};

export const DiscordEmbed = forwardRef<
  HTMLDivElement,
  PropsWithChildren<DiscordEmbedProps>
>((props, ref) => {
  const { color, children, top, title, content, ...rest } = props;
  return (
    <div
      className={`bg-discord-embed-background flex border-l-4 rounded-sm font-sans ${color}`}
      {...rest}
      ref={ref}
    >
      <div className="flex flex-col p-4 w-full">
        <div className="flex flex-col gap-2 mb-4 font-sans text-xl">
          <h3 className="text-sm font-thin color-text-500 font-sans m-0">
            {top}
          </h3>
          <h2 className="font-medium text-base m-0 font-sans color-text-900">
            {title}
          </h2>
          <p className="font-medium text-base m-0 font-black color-blue-400">
            {content}
          </p>
        </div>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
});

export const DiscordMention = (props: PropsWithChildren<unknown>) => {
  return (
    <span className="cursor-pointer rounded px-1 mr-1 inline-flex color-text-800 bg-blue-400/50 font-medium">
      {props.children}
    </span>
  );
};

type DiscordMessageProps = {
  message?: string;
  messages?: Array<string | ReactElement>;
  username: string;
  roleColor: string;
  date: string;
  avatar: string | ImageMetadata;
  pinged?: boolean;
  className?: string;
  reactions?: DiscordReactionProps[];
};

export const DiscordMessage = forwardRef<HTMLDivElement, DiscordMessageProps>(
  (
    {
      message,
      messages,
      username,
      roleColor,
      date,
      avatar,
      pinged,
      className = "",
      reactions = [],
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex text-gray-400 leading-6 mb-0" ref={ref} {...props}>
        <figure className="hidden md:block mt-2 mb-0 mr-3 w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
          <DiscordMessageAvatar avatar={avatar} username={username} />
        </figure>
        <div className="w-full text-base">
          <div className="flex items-baseline leading-1">
            <h1
              className={cls(
                roleColor ?? "text-discord-text-color",
                `text-lg font-medium font-sans my-0`
              )}
            >
              {username}
              <time className="ml-2 font-normal text-sm text-gray-400">
                {date}
              </time>
            </h1>
          </div>
          {(messages ?? [message]).map((msg, i, arr) =>
            typeof msg === "string" ? (
              <DiscordMessageText
                className={i !== arr.length - 1 ? "mb-1" : ""}
                key={msg}
              >
                {msg}
              </DiscordMessageText>
            ) : (
              <Fragment key={i}>{msg}</Fragment>
            )
          )}
          {reactions?.length > 0 && (
            <div className="mt-2 flex items-center gap-2">
              {reactions.map((props) => (
                <DiscordReaction {...props} key={props.name} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
);
