import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { apiCfg } from '$lib/vars';
import { login, validate_token } from '$lib/api';
// import Cookies from 'js-cookie';
import { page } from '$app/stores';

export const load = (async ({ cookies }) => {
    console.log(page.path);
    // const user = await db.getUserFromSession(cookies.get('sessionid'));
    let user = "undefined"
    let token = cookies.get('auth_token');
    if (token == undefined) {
        return { user: user }
    }
    let res = await validate_token(token).catch((err) => {
        return { data: { user: "undefined" }}
    });
    return { user: res.data.user }
}) satisfies PageServerLoad;

export const actions = {
    login: async ({ cookies, request, url }) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');
        if (!email) {
            return fail(400, { email, missing: true });
        }
        let login_res = await login(email, password).catch(function (error) {
            console.log(error.response.data.message);
            return false;
        });
        if (!login_res) {
            return fail(400, { email, incorrect: true })
        }
        console.log(login_res.data);
        if (login_res.data.authToken ?? false) {
            cookies.set("auth_token", login_res.data.authToken);
        } else {
            console.log("Login failed");
        }
        // const user = await db.getUser(email);
        //  cookies.set('sessionid', await db.createSession(user));
        throw redirect(303, "/");
        return { success: true };
    },
    register: async (event) => {
        // TODO register the user
    }
} satisfies Actions;
