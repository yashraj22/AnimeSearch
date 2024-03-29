"use server"
import {AnimeData} from "@/types/anime"

export const searchAnime = async (query: string): Promise<AnimeData> => {
    const response = await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${query}`);
    const data = response.json();
    return data;
}