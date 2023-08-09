import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { get_flow, create_node, create_project, execute_node, get_node, instantiate_node, list_projects, list_series, validate_token, list_nodes } from '$lib/api';
import type { AgridosSerie, AgridosNode, AgridosProject } from '$lib/typecript-axios';

export const load = (async ({ cookies, params }) => {
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

    let flow_req = (await get_flow(params.slug, token)).data;
    let nodes = (await list_nodes(flow_req.id, 10, "", "", token)).data.nodes;

    let asset_node = nodes.find((node: AgridosNode) => node.nodeType === "asset");
    let tesseract_node = nodes.find((node: AgridosNode) => node.nodeType === "std");
    return {
        user: user,
        flow: flow_req,
        asset_node,
        tesseract_node
    }
}) satisfies PageServerLoad;

