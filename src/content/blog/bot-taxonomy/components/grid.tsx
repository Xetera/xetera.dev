import type { PropsWithChildren } from "react";

type CellProps = PropsWithChildren<{
	options: string[];
	title: string;
	subtitle: string;
}>;

export const Cell = ({ options, title, subtitle, children }: CellProps) => (
	<div className="border border-body-800">
		<div className="text-100 h-full md:aspect-square text-base relative leading-6 w-full flex flex-col">
			<div className="bg-secondary flex justify-center bg-body-800 py-3 px-4 text-center w-full">
				<a
					href={`#${title.toLowerCase().slice(2).split(" ").join("-")}`}
					className="external-link no-underline transition-transform ease-in-out duration-100 hover:scale-110 text-center text-sm md:text-md text-400"
				>
					{title}
				</a>
			</div>
			{subtitle && (
				<div className="flex px-4 pt-2 text-base place-items-center">
					<p>{subtitle}</p>
				</div>
			)}
			{children && (
				<div className="color-text-300 text-sm h-full w-full">{children}</div>
			)}
			{options && (
				<ol className="list-circle px-4 py-2 m-0 list-inside space-y-1 h-auto">
					{options?.map((option, i) => {
						return (
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							<li className="color-text-300 text-sm" key={i}>
								{option}
							</li>
						);
					})}
				</ol>
			)}
		</div>
	</div>
);

export const Grid3x3 = ({ children }: PropsWithChildren) => (
	<div className="not-prose grid auto-rows-fr gap-2 md:gap-4 m-auto md:w-full sm:grid-cols-2 md:grid-cols-3">
		{children}
	</div>
);
