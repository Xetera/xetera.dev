import cls from "clsx";
import type { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
	className?: string;
}

export default function HomepageSection(props: Props) {
	return (
		<div className={cls(props.className, "flex flex-col gap-4")}>
			{props.children}
		</div>
	);
}
