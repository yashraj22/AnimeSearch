"use client";
import Image from "next/image";
import debounce from "lodash.debounce";
import { useMemo, useState, useEffect } from "react";
import { searchAnime } from "../action/searchAnime";
import { AnimeData, AnimeItem } from "@/types/anime";

export default function Home() {
	const [SearchTerm, setSearchTerm] = useState("");
	const [data, setData] = useState<AnimeData | null>(null);

	const debouncedSearch = useMemo(() => {
		return debounce((value: string) => {
			setSearchTerm(value);
			searchAnime(value).then((res) => setData(res));
		}, 300);
	}, []);

	useEffect(() => {
		return () => {
			debouncedSearch.cancel();
		};
	}, [debouncedSearch]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		debouncedSearch(e.target.value);
	};
	const renderSearchResult = (data: AnimeData) => {
		return (
			<div>
				{data.data.map((item, idx) => (
					<div
						key={idx}
						className="flex mt-4 items-center space-x-4 p-4 bg-white rounded-lg shadow-md">
						<Image
							src={item.attributes.posterImage.original}
							alt={
								item.attributes.titles.en
									? item.attributes.titles.en
									: "Anime Image"
							}
							width={100}
							height={100}
							className="rounded-xl"
						/>
						<div>
							<h4 className="text-lg font-semibold">
								{item.attributes.titles.en ?? item.attributes.titles.en_jp}
							</h4>
							<button
								type="button"
								className="px-2 py-1 mt-2 text-sm text-white bg-blue-500 rounded-md">
								Add
							</button>
						</div>
					</div>
				))}
			</div>
		);
	};

	return (
		<main className="flex min-h-screen flex-col items-center  p-24">
			<header className="py-4 text-white text-center text-2xl font-semibold">
				AnimeSearch
			</header>
			<input
				type="text"
				onChange={handleChange}
				className="w-full max-w-md p-2 rounded-md shadow-sm"
				placeholder="🔍 Search anime"
			/>
			<div className="h-[500px] overflow-y-auto mt-2">
				{data && renderSearchResult(data)}
			</div>
		</main>
	);
}
