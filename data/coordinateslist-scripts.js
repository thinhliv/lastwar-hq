const now = Date.now();
const oneDayInMilliseconds = 1000 * 60 * 60 * 24;

document.documentElement.style.setProperty("--inner-height", `${innerHeight}px`);

const worker = new Worker("./worker.js");

document.addEventListener("DOMContentLoaded", main);

function main() {
	const main = document.querySelector("main");

	const servers = data.map(({ server, alliances, lastUpdate }) => ({
		server: server.toString(),
		alliances: alliances.map(a => ({
			name: a,
			lowerCase: a.toLocaleLowerCase(),
		})),
		lastUpdate: calculateLastUpdateText(lastUpdate),
	}));
	worker.postMessage({ servers });

	const input = document.querySelector("input");
	input.style.setProperty("--input-bounding-client-rect-width", `${input.getBoundingClientRect().width}px`);

	let value = new URL(location.href).searchParams.get("q");
	if (value !== null) {
		input.value = value;
		input.selectionStart = value.length;
		input.selectionEnd = value.length;
		worker.postMessage({ input: value });
		main.classList.add("dirty");
	} else {
		history.replaceState({}, document.title, ".");
		input.addEventListener("input", () => {
			main.classList.add("dirty");
		}, { once: true });
	}

	const results = document.getElementById("results");

	input.addEventListener("input", () => {
		value = input.value.trim();
		if (value === "") {
			results.replaceChildren();
			history.replaceState({}, document.title, ".");
		} else {
			worker.postMessage({ input: value });
		}
	});

	worker.onmessage = ({ data }) => {
		if (value !== "") {
			requestAnimationFrame(() => {
				if (value !== "") {
					const { matchingServers, value } = data;
					input.classList.toggle("no-results", matchingServers.length === 0);
					results.replaceChildren(
						matchingServers.length > 0
							? renderResults(matchingServers)
							: renderNoResults()
					);
					const params = new URLSearchParams({ q: value });
					history.replaceState({}, document.title, `?${params.toString()}`);
				}
			});
		}
	};
}

function renderResults(matchingServers) {
	const fragment = document.createDocumentFragment();
	fragment.replaceChildren(...renderHeadings());

	for (const { server, alliances, lastUpdate } of matchingServers) {
		const serverDiv = document.createElement("div");
		serverDiv.className = "server";
		if (server.match) {
			const mark = document.createElement("mark");
			mark.textContent = server.name;
			serverDiv.appendChild(mark);
		} else {
			serverDiv.textContent = server.name;
		}
		fragment.appendChild(serverDiv);

		const alliancesDiv = document.createElement("div");
		alliancesDiv.className = "alliances";
		for (let i = 0; i < alliances.length; i++) {
			const { match, name } = alliances[i];
			const allianceSpan = document.createElement("span");
			allianceSpan.className = "alliance";
			if (match) {
				const mark = document.createElement("mark");
				mark.textContent = name;
				allianceSpan.appendChild(mark);
			} else {
				allianceSpan.textContent = name;
			}
			if (i !== alliances.length - 1) {
				const comma = document.createElement("span");
				comma.className = "comma";
				comma.textContent = ", ";
				allianceSpan.appendChild(comma);
			}
			alliancesDiv.appendChild(allianceSpan);
		}
		fragment.appendChild(alliancesDiv);

		const lastUpdateDiv = document.createElement("div");
		lastUpdateDiv.className = "last-update";
		lastUpdateDiv.textContent = lastUpdate;
		fragment.appendChild(lastUpdateDiv);
	}

	return fragment;
}

function renderNoResults() {
	const div = document.createElement("div");
	div.className = "no-results";
	div.textContent = "No server or alliance found"
	return div;
}

function renderHeadings() {
	const div1 = document.createElement("div");
	div1.className = "heading";
	div1.textContent = "Server";
	const div2 = document.createElement("div");
	div2.className = "heading";
	div2.textContent = "Alliances";
	const div3 = document.createElement("div");
	div3.className = "heading";
	div3.textContent = "Last Update";
	return [div1, div2, div3];
}

function calculateLastUpdateText(lastUpdate) {
	const date = new Date(lastUpdate);
	const time = date.getTime();
	if (isNaN(time)) {
		return lastUpdate;
	}
	const diff = now - time;
	const days = Math.floor(diff / oneDayInMilliseconds);
	switch (days) {
		case 0: return "today";
		case 1: return "yesterday";
		default: {
			const weeks = Math.floor(days / 7);
			if (weeks <= 2) {
				return `${days.toString()} days ago`;
			} else {
				if (weeks <= 7) {
					return `${weeks.toString()} weeks ago`;
				} else {
					const months = Math.floor(weeks / 4);
					if (months <= 11) {
						return `${months.toString()} months ago`;
					} else {
						const years = Math.floor(months / 12);
						return `${years.toString()} years ago`;
					}
				}
			}
		}
	}
}
