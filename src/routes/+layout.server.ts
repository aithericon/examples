import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { apiCfg } from '$lib/vars';
import { execute_node, get_node_class, instantiate_node, list_projects, list_series, login, validate_token } from '$lib/api';
import { pickle } from 'picklefriend'
import type { AgridosSerie } from '$lib/typecript-axios';

import { page } from '$app/stores';

// import Cookies from 'js-cookie';

let current_flow: AgridosSerie | undefined = undefined;

export const load = (async ({ cookies }) => {
    // const user = await db.getUserFromSession(cookies.get('sessionid'));
    let user = "undefined"
    let token = cookies.get('auth_token');
    console.log();
    if (page.path === '/login') {
        return { user: user }
    }
    if (token == undefined) {
        return { user: user }
    }

    let res = await validate_token(token).catch((err) => {
        console.log(err.response.message);
        // throw redirect(303, '/login');
        return { data: { user: "Not logged in" } }
    });
    user = res.data.user;
    return {
        user: user,
    }
}) satisfies PageServerLoad;