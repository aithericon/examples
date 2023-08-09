import * as aithericon_api from '$lib/typecript-axios';
import { writable } from 'svelte/store';

export const flows = writable([]);


export const apiCfg = new aithericon_api.Configuration({ basePath: "https://dev-api.aithericon.com" })

export const basePath = "https://dev-api.aithericon.com";

export const baseUiPath = "https://dev.aithericon.com";