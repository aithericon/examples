import type { PageServerLoad, Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { execute_node, get_node, instantiate_node, list_projects, list_series, validate_token } from '$lib/api';
import type { AgridosSerie } from '$lib/typecript-axios';

// import Cookies from 'js-cookie';

let current_flow: AgridosSerie | undefined = undefined;

export const load = (async ({ cookies }) => {
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
    let user_clean = user.split("@")[0];
    let projects = await list_projects(user, 5, ">created/0", `author LIKE \"${user_clean}%\" && name == \"svelte\"`, token);
    // console.log(projects.data);

    let project = projects.data.projects.pop()
    // console.log(project);
    let flows = await list_series(`projects/${project.id}`, token);
    let flow = flows.data.series.pop()
    current_flow = flow;
    // console.log(flow);
    return {
        user: user,
        project: project,
        flow: flow
    }
}) satisfies PageServerLoad;

export const actions = {
    imagine: async ({ cookies, request, url }) => {
        const data = await request.formData();
        const prompt = data.get('prompt');
        let token = cookies.get('auth_token');

        console.log(prompt);
        let res = await instantiate_node("a8974ad7-f51d-4d3d-a443-51bdc9cd802a", token);
        console.log(res.data);
        let node = res.data;
        node.serieId = current_flow.id;
        console.log(node.inputs);
        node.inputs.test1.data = "This is a test message from svelte ui";
        node.inputs.test2.data = prompt;
        node.name = "TestNodeFileSvelte";
        let exec_req = await execute_node(node, token);
        console.log(exec_req.data.Node);
        return { success: true, node: exec_req.data.Node };
    },
} satisfies Actions;
