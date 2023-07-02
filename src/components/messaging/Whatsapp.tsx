import { PropsWithChildren, forwardRef } from "react";
import WhatsappImage from "../../assets/_media/whatsapp_background.png";

export const WhatsappContainer = forwardRef<
  HTMLDivElement,
  PropsWithChildren<unknown>
>((props, ref) => {
  return (
    <div className="mb-24 bg-black col-span-full" ref={ref}>
      <div
        className="w-full h-full relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.9)), url(${WhatsappImage.src})`,
        }}
      >
        <div className="grid space-y-6 m-auto px-6 py-6 article-grid">
          {props.children}
        </div>
      </div>
    </div>
  );
});

type WhatsappMessageProps = {
  other: boolean;
  number: string;
  username?: string;
  color: string;
  messages: string[];
  time: string;
  wrapFirst?: boolean;
};

export function WhatsappMessage({
  other = false,
  number,
  username,
  color,
  messages = [],
  time,
}: WhatsappMessageProps) {
  const [head, ...tail] = messages;
  const textStyle = "color-whatsapp-chat-text";
  const bubbleColor = other
    ? "bg-whatsapp-chat-background-incoming"
    : "bg-whatsapp-chat-background-outgoing";
  const bubbleColorText = other
    ? "text-whatsapp-chat-background-incoming"
    : "text-whatsapp-chat-background-outgoing";

  const timeComp = (
    <span className="inline-block self-end ml-3 text-xs whitespace-nowrap text-whatsapp-chat-meta mx-6">
      {time}
    </span>
  );

  return (
    <div
      className={`${
        other ? "justify-self-start" : "justify-self-end"
      } flex flex-col gap-1 opacity-100 text-sm w-max text-whatsapp-chat-text`}
    >
      <div
        className={`${bubbleColor} px-2 py-[5px] flex flex-col relative rounded-b-lg w-max ${
          other ? "rounded-r-lg" : "rounded-l-lg"
        }`}
      >
        <svg
          className={`${bubbleColorText} absolute top-0 w-2.5 h-2.5 ${
            other ? "right-full" : "left-full"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          fill="currentColor"
        >
          {other ? (
            <polygon points="0,0 10,0 10,10" />
          ) : (
            <polygon points="10,0 0,10 0,0" />
          )}
        </svg>
        {username && (
          <div className="flex gap-5 mb-1 justify-between text-whatsapp-chat-meta">
            <span
              className="text-gray-200 leading-5 font-medium"
              style={{ color }}
            >
              ~{username}
            </span>
            <span
              className={`font-medium text-xs tracking-tight mr-2 leading-5 font-mono text-whatsapp-chat-number`}
            >
              {number}
            </span>
          </div>
        )}
        <div className="flex justify-between w-max">
          <span className={`${textStyle} m-0 leading-5 text-sm lg:text-base`}>
            {head}
          </span>
          {timeComp}
        </div>
      </div>
      {tail.map((message, i) => (
        <div
          className={`${bubbleColor} flex w-max h-max px-2 py-[5px] relative rounded-md ${
            other ? "align-start" : "align-end"
          } `}
          key={i}
        >
          <span className={`${textStyle} m-0 leading-5 text-sm lg:text-base`}>
            {message}
          </span>
          {timeComp}
        </div>
      ))}
    </div>
  );
}
