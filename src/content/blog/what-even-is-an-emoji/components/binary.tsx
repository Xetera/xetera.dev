import cls from "clsx";
import { type ReactNode, useState } from "react";
import "./style.module.css";

export function Byte(props: {
	char: number;
	showChar?: boolean;
	cellBackground?: string;
}) {
	const hex = Array.from(props.char.toString(2).padStart(8, "0"), Number);

	if (!hex) {
		throw Error("invalid char");
	}
	return (
		<div className="byte flex flex-col gap-2 relative flex-grow-0 snap-center">
			<div className="flex flex gap-2">
				{hex.map((point, i) => (
					<Binary point={point} key={i} />
				))}
			</div>
			{props.showChar && <div>{props.char}</div>}
		</div>
	);
}

export function ByteGroup({
	text,
	spacing,
	showChar,
	highlighted,
}: {
	text: string;
	spacing?: boolean;
	showChar?: boolean;
	highlighted?: boolean;
	className?: string;
}) {
	let bytes: ReactNode[] = [];
	let i = 0;
	for (const codePoint of text) {
		const char = codePoint.codePointAt(0);
		if (!char) {
			throw new Error("impossible state");
		}
		bytes.push(
			<Byte
				char={char}
				showChar={showChar}
				key={i}
				cellBackground={
					highlighted && i % 2 === 0 ? "bg-body-700" : "bg-body-800"
				}
			/>,
		);
		i++;
	}
	return (
		<div
			className={cls(
				"col-span-full flex flex-wrap gap-2 font-mono snap-x snap-mandatory overflow-x-auto max-w-fit mx-auto w-full xl:w-fit",
				spacing ? "gap-8" : "gap-2",
			)}
		>
			{bytes}
		</div>
	);
}

export function Binary({
	point,
	className,
}: {
	point: number;
	className?: string;
}) {
	return (
		<div
			className={cls(
				"w-9 lg:w-10 text-lg lg:text-xl h-full flex justify-center items-center aspect-ratio-1 rounded outline outline-1 outline-body-800 font-mono",
				className,
			)}
		>
			{point}
		</div>
	);
}

export function BinaryNotepad({ value = "" }) {
	const [text, setText] = useState(value);
	return (
		<div className="flex gap-8 aspect-ratio-[7/4]">
			<textarea
				value={text}
				onChange={(e) => setText(e.target.value)}
				className="bg-body-800 outline outline-1 outline-body-800"
			/>
			<div className="flex-1">
				<ByteGroup text={text} spacing />
			</div>
		</div>
	);
}
