// @ts-nocheck | not ready yet
import React, { type PropsWithChildren } from "react";
import type PcapType from "../content/blog/how-to-replace-your-stupid-isp-router/assets/_turktelekom.json";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getExpandedRowModel,
	useReactTable,
	type Row,
} from "@tanstack/react-table";
import clsx from "clsx";

type IndividualPacket = (typeof PcapType)[number];

const columnHelper = createColumnHelper<IndividualPacket>();

const columns = [
	columnHelper.accessor(
		(pcap) => pcap._source.layers.frame["frame.time_relative"],
		{
			id: "Time",
		},
	),
	columnHelper.accessor(
		(pcap) => pcap._source.layers.eth["eth.src_tree"]["eth.addr_resolved"],
		{
			id: "Source",
		},
	),
	columnHelper.accessor(
		(pcap) => pcap._source.layers.eth["eth.dst_tree"]["eth.addr_resolved"],
		{
			id: "Destination",
		},
	),
	columnHelper.accessor((pcap) => getProtocol(pcap), {
		id: "Protocol",
	}),
	columnHelper.accessor((pcap) => getInfo(pcap, true), {
		id: "Info",
	}),
];

export function Timeline(props: { pcap: typeof PcapType }) {
	const [data] = React.useState(() => props.pcap);

	const table = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
		getExpandedRowModel: getExpandedRowModel(),
		getRowCanExpand: () => true,
	});

	return (
		<div className="font-mono">
			<table className="">
				<thead>
					{table.getHeaderGroups().map((headerGroup) => {
						return (
							<tr
								key={headerGroup.id}
								className="text-xs md:text-sm bg-body-700"
							>
								{headerGroup.headers.map((header) => (
									<th key={header.id} className="text-start text-nowrap">
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</th>
								))}
							</tr>
						);
					})}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<CustomRow {...row} key={row.id} />
					))}
				</tbody>
			</table>
		</div>
	);
}

function CustomRow(row: Row<IndividualPacket>) {
	const style = { "dark:bg-[#225e85] bg-[#8fd3ff]": row.getIsExpanded() };
	return (
		<>
			<tr
				className={clsx(
					"text-xs md:text-sm hover:bg-cyan-300 dark:hover:bg-cyan-700 cursor-pointer",
					style,
				)}
				onMouseDown={row.getToggleExpandedHandler()}
			>
				{row.getVisibleCells().map((cell) => (
					<td key={cell.id} className="text-nowrap">
						{flexRender(cell.column.columnDef.cell, cell.getContext())}
					</td>
				))}
			</tr>
			<tr className={clsx(!row.getIsExpanded() && "hidden")}>
				<td colSpan={row.getVisibleCells().length} className="p-0">
					<PacketExplorer data={row.original} index={row.index} />
				</td>
			</tr>
		</>
	);
}

function PacketExplorer(props: { data: IndividualPacket; index: number }) {
	const layers = props.data._source.layers;
	const [expanded, setExpanded] = React.useState({
		frame: false,
		eth: false,
	});

	return (
		<div className="text-xs md:text-sm ms-4 font-mono mb-2">
			<FrameLayer packet={layers.frame} expanded={expanded.frame} />
			<EthLayer packet={layers.eth} expanded={expanded.eth} />
			<VLANLayer packet={layers.vlan} expanded={expanded.eth} />
			{layers.pppoes && <PPPoESessionLayer packet={layers.pppoes} />}
			{layers.pppoed && <PPPoELayer packet={layers.pppoed} />}
			{layers.ppp && <PPPLayer packet={layers.ppp} />}
			{layers.lcp && <LCPLayer packet={layers.lcp} />}
		</div>
	);
}

type PacketType<T extends keyof IndividualPacket["_source"]["layers"]> =
	NonNullable<IndividualPacket["_source"]["layers"][T]>;
type Layer<T extends keyof IndividualPacket["_source"]["layers"]> = {
	expanded?: boolean;
	packet: PacketType<T>;
};

function FrameLayer({ packet, expanded }: Layer<"frame">) {
	return (
		<Details>
			<summary>
				Frame {packet["frame.number"]}, {packet["frame.len"]} bytes on wire on
				interface {packet["frame.interface_id_tree"]["frame.interface_name"]}
			</summary>
			<div className="flex flex-col gap-1 ps-6 bg-body-900">
				<span>
					Interface id: {packet["frame.interface_id"]} (
					{packet["frame.interface_id_tree"]["frame.interface_name"]})
				</span>
				<span>Encapsulation type: Ethernet (1)</span>
				<span>Arrival Time: {packet["frame.time"]}</span>
				<span>UTC Arrival Time: {packet["frame.time_utc"]}</span>
				<span>Frame number: {packet["frame.number"]}</span>
				<span>
					Frame Length: {packet["frame.len"]} bytes (
					{Number(packet["frame.len"]) * 8} bits)
				</span>
				<span>
					Capture Length: {packet["frame.cap_len"]} bytes (
					{Number(packet["frame.cap_len"]) * 8} bits)
				</span>
			</div>
		</Details>
	);
}

function deriveEthType(type: string) {
	switch (type) {
		case "0x8100":
			return "802.1Q Virtual LAN";
		default:
			return "Unknown";
	}
}

const Details = ({ children }: PropsWithChildren) => (
	<details className="px-0 pt-1 pb-0 m-0 dark:bg-body-300 bg-body-700">
		{children}
	</details>
);

const Items = ({ children }: PropsWithChildren) => (
	<div className="flex flex-col gap-1 ps-6 bg-body-900">{children}</div>
);

function EthLayer({ packet, expanded }: Layer<"eth">) {
	return (
		<Details>
			<summary>
				Ethernet II, Src: {packet["eth.src_tree"]["eth.src_resolved"]} (
				{packet["eth.src"]}) Dst: {packet["eth.dst_tree"]["eth.dst_resolved"]} (
				{packet["eth.dst"]})
			</summary>
			<Items>
				<span>
					Destination: {packet["eth.dst_tree"]["eth.addr_resolved"]} (
					{packet["eth.dst"]})
				</span>
				<span>
					Source: {packet["eth.src_tree"]["eth.addr_resolved"]} (
					{packet["eth.src"]})
				</span>
				<span>
					Type: {deriveEthType(packet["eth.type"])} ({packet["eth.type"]})
				</span>
			</Items>
		</Details>
	);
}

function vlanPriority(priority: number) {
	if (priority === 0) {
		return "Best Effort (default) 0";
	}

	return `(${priority})`;
}

function vlanDei(value: number) {
	if (value === 0) {
		return "Ineligible";
	}
	return "Eligible";
}

function padToFour(binary: number) {
	return binary.toString(2).padStart(4, "0");
}

function VLANLayer({ packet, expanded }: Layer<"vlan">) {
	const prio = Number(packet["vlan.priority"]);
	const dei = Number(packet["vlan.dei"]);
	const id = Number(packet["vlan.id"]);
	return (
		<Details>
			<summary>
				802.1Q Virtual LAN, PRI: {packet["vlan.priority"]}, DEI:{" "}
				{packet["vlan.dei"]}, ID: {packet["vlan.id"]}
			</summary>
			<Items>
				<span>
					{prio.toString(2).padStart(3, "0")}. .... .... .... = Priority:{" "}
					{vlanPriority(prio)}
				</span>
				<span>
					...{dei} .... .... .... = DEI: {vlanDei(dei)}
				</span>
				<span>
					.... {padToFour((id >> 8) & 0b1111)} {padToFour((id >> 4) & 0b1111)}{" "}
					{padToFour(id & 0b1111)} = ID: {id}
				</span>
			</Items>
		</Details>
	);
}

const FormatVersion = (props: { version: number }) => (
	<span>
		{props.version.toString(2).padStart(4, "0")} .... = Version: {props.version}
	</span>
);

const FormatType = (props: { type: number }) => (
	<span>
		.... {props.type.toString(2).padStart(4, "0")} = Type: {props.type}
	</span>
);

function PPPoESessionLayer({ packet, expanded }: Layer<"pppoes">) {
	const version = Number(packet["pppoe.version"]);
	const type = Number(packet["pppoe.type"]);
	return (
		<Details>
			<summary>PPP-over-Ethernet Session</summary>
			<Items>
				<FormatVersion version={version} />
				<FormatType type={type} />
				{/* :shrug: */}
				<span>Code: Session Data (0x00)</span>
				<span>Session ID: {packet["pppoe.session_id"]}</span>
			</Items>
		</Details>
	);
}

function PPPoELayer({ packet, expanded }: Layer<"pppoed">) {
	const version = Number(packet["pppoe.version"]);
	const type = Number(packet["pppoe.type"]);
	const tags = packet["pppoed.tags"];
	return (
		<Details>
			<summary>PPP-over-Ethernet Discovery</summary>
			<Items>
				<span>
					{version.toString(2).padStart(4, "0")} .... = Version: {version}
				</span>
				<span>
					.... {type.toString(2).padStart(4, "0")} = Type: {version}
				</span>
				<span>
					Code: {getInfoPPPoEd(packet, false)} ({packet["pppoe.code"]})
				</span>
				<span>Session ID: {packet["pppoe.session_id"]}</span>
				<span>Payload Length: {packet["pppoe.payload_length"]}</span>
				<Details>
					<summary>PPPoE Tags</summary>
					<Items>
						{tags?.["pppoed.tags.ac_name"] && (
							<span>AC-Name: {tags?.["pppoed.tags.ac_name"]}</span>
						)}
						{tags?.["pppoed.tags.service_name"] && (
							<span>Service-Name: {tags?.["pppoed.tags.service_name"]}</span>
						)}
						{tags?.["pppoed.tags.host_uniq"] && (
							<span>Host-Uniq: {tags?.["pppoed.tags.host_uniq"]}</span>
						)}
						{tags?.["pppoed.tags.ac_cookie"] && (
							<span>AC-Cookie: {tags?.["pppoed.tags.ac_cookie"]}</span>
						)}
					</Items>
				</Details>
			</Items>
		</Details>
	);
}

function getPPPProtocol(protocol: string) {
	switch (protocol) {
		case "0xc021":
			return "Link Control Protocol";
		case "0xc023":
			return "Password Authentication Protocol";
		default:
			return "Unknown Protocol";
	}
}

function PPPLayer({ packet, expanded }: Layer<"ppp">) {
	return (
		<Details>
			<summary>Point-to-Point Protocol</summary>
			<Items>
				<span>
					Type: {getPPPProtocol(packet["ppp.protocol"])} (
					{packet["ppp.protocol"]})
				</span>
			</Items>
		</Details>
	);
}

function LCPLayer({ packet, expanded }: Layer<"lcp">) {
	const option = Object.keys(packet).find((key) =>
		key.startsWith("Options:"),
	) as keyof typeof packet | undefined;
	const options = (option ? packet[option] : undefined) as
		| Record<string, any>
		| undefined;

	return (
		<Details>
			<summary>PPP Link Control Protocol</summary>
			<Items>
				<span>
					Code: {getInfoLcp(packet)} ({packet["ppp.code"]})
				</span>
				<span>
					Identifier: {Number(packet["ppp.identifier"])} (
					{packet["ppp.identifier"]})
				</span>
				<span>Length: {packet["ppp.length"]}</span>
				{option && options && (
					<Details>
						<summary>{option}</summary>
						<Items>
							<LcpOption name="lcp.opt.field_compress_tree" options={options} />
							<LcpOption name="lcp.opt.mtu_bytes_tree" options={options} />
							<LcpOption
								name="lcp.opt.magic_number_bytes_tree"
								options={options}
							/>
							<LcpOption
								name="lcp.opt.auth_protocol_bytes_tree"
								options={options}
							/>
						</Items>
					</Details>
				)}
			</Items>
		</Details>
	);
}

function LcpOption({
	name,
	options,
}: { name: string; options: Record<string, any> }) {
	const option: Record<string, string> = options[name];
	if (!option) {
		return null;
	}
	function map() {
		switch (option["lcp.opt.type"]) {
			case "1":
				return "Maximum Receive Units";
			case "3":
				return "Authentication Protocol";
			case "5":
				return "Magic Number";
			case "7":
				return "Protocol Field Compression";
		}
	}

	const type = (
		<span>
			Type: {map()} ({option["lcp.opt.type"]})
		</span>
	);
	const length = <span>Length: {option["lcp.opt.length"]}</span>;
	const out = [];

	if (name === "lcp.opt.field_compress_tree") {
		out.push(
			<Details>
				<summary>Protocol Field Compression</summary>
				<Items>
					{type}
					{length}
				</Items>
			</Details>,
		);
	}
	if (name === "lcp.opt.mtu_bytes_tree") {
		out.push(
			<Details>
				<summary>Maximum Receive Unit: {option["lcp.opt.mru"]}</summary>
				<Items>
					{type}
					{length}
					<span>Maximum Receive Unit: {option["lcp.opt.mru"]}</span>
				</Items>
			</Details>,
		);
	}
	if (name === "lcp.opt.magic_number_bytes_tree") {
		out.push(
			<Details>
				<summary>Magic Number: {option["lcp.opt.magic_number"]}</summary>
				<Items>
					{type}
					{length}
					<span>Magic Number: {option["lcp.opt.magic_number"]}</span>
				</Items>
			</Details>,
		);
	}
	if (name === "lcp.opt.auth_protocol_bytes_tree") {
		out.push(
			<Details>
				<summary>
					Authentication Protocol:{" "}
					{getPPPProtocol(option["lcp.opt.auth_protocol"] as string)}{" "}
					{option["lcp.opt.auth_protocol"]}
				</summary>
				<Items>
					{type}
					{length}
					<span>
						Authentication Protocol:{" "}
						{getPPPProtocol(option["lcp.opt.auth_protocol"] as string)}{" "}
						{option["lcp.opt.auth_protocol"]}
					</span>
				</Items>
			</Details>,
		);
	}

	return out;
}

export function getProtocol(packet: IndividualPacket) {
	const last = Object.keys(packet._source.layers).at(-1);
	switch (last) {
		case "lcp":
			return "PPP LCP";
		case "pap":
			return "PPP PAP";
		case "pppoed":
			return "PPPoED";
		default:
			throw new Error(`Invalid protocol ${last}`);
	}
}

function getInfoPPPoEd(pppoed: PacketType<"pppoed">, appendDetails: boolean) {
	const acName = `AC-Name='${pppoed["pppoed.tags"]?.["pppoed.tags.ac_name"]}'`;
	switch (pppoed["pppoe.code"]) {
		case "0x09":
			return "Active Discovery Initiation (PADI)";
		case "0x19":
			return "Active Discovery Request (PADR)";
		case "0x65":
			return `Active Discovery Session-confirmation (PADS) ${appendDetails ? acName : ""}`;
		case "0x07":
			return `Active Discovery Offer (PADO) ${appendDetails ? acName : ""}`;
		case "0xa7":
			return "Active Discovery Terminate (PADT)";
	}
}

function getInfoLcp(packet: PacketType<"lcp">) {
	switch (packet["ppp.code"]) {
		case "1":
			return "Configuration Request";
		case "2":
			return "Configuration Ack";
		case "4":
			return "Configuration Reject";
		case "5":
			return "Termination Request";
		case "6":
			return "Termination Ack";
		case "9":
			return "Echo Request";
		case "10":
			return "Echo Reply";
	}
}

function getInfo(packet: IndividualPacket, appendDetails: boolean) {
	const pppoed = packet._source.layers.pppoed;

	if (pppoed) {
		return getInfoPPPoEd(pppoed, appendDetails);
	}

	const lcp = packet._source.layers.lcp;
	if (lcp) {
		return getInfoLcp(lcp);
	}

	const pap = packet._source.layers.pap;

	if (pap) {
		const authDetails = `(Peer-ID='${pap["pap.data"]["pap.peer_id"]}', Password='${pap["pap.data"]["pap.password"]}')`;
		switch (pap["pap.code"]) {
			case "1":
				return `Authenticate-Request ${appendDetails ? authDetails : ""}`;
			case "3":
				return `Authenticate-Nak (Message='${pap["pap.data"]["pap.message"]}')`;
		}
	}

	return "";
}
