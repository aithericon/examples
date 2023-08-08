import type { PageServerLoad, Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { execute_node, get_node, instantiate_node, list_projects, list_series, validate_token } from '$lib/api';
import type { AgridosSerie } from '$lib/typecript-axios';
import { page } from '$app/stores';

// import Cookies from 'js-cookie';

let current_flow: AgridosSerie | undefined = undefined;

export const load = (async ({ cookies }) => {
    console.log(page.path);
    // const user = await db.getUserFromSession(cookies.get('sessionid'));
    let user = "undefined"
    let token = cookies.get('auth_token');
    if (token == undefined) {
        return { user: user }
    }
    let res = await validate_token(token).catch((err) => {
        console.log(err.response.message);
        throw redirect(303, '/login');
    });
    user = res.data.user;
    return {
        user: user
    }
}) satisfies PageServerLoad;
