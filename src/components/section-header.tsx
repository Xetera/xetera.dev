import cls from "clsx";
import type { PropsWithChildren } from "react";

interface Props extends PropsWithChildren<{}> {
	className?: string;
}

export default function SectionHeader(props: Props) {
	return (
		<div
			className={cls(
				props.className,
				"flex justify-between items-center flex-wrap gap-2",
			)}
		>
			<h1 className="text-lg color-text-500 font-semibold flex gap-2 items-center">
				{props.children}
			</h1>
			<slot name="aside" />
		</div>
	);
}
