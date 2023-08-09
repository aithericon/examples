import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { create_flow, create_node, create_project, execute_node, get_node, instantiate_node, list_projects, list_series, validate_token } from '$lib/api';
import type { AgridosSerie, AgridosNode, AgridosProject } from '$lib/typecript-axios';
import axios from 'axios';


let current_project: AgridosProject | undefined = undefined;
let nodeclass_id = "3c47a44e-9ba3-4f72-8c89-91585ffff327";

export const load = (async ({ cookies }) => {
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
    let projects = await list_projects(user, 5, ">created/0", `author LIKE \"${user_clean}%\" && name == \"OCR\"`, token);
    let project = undefined;
    if (projects.data.projects.length == 0) {
        let res2 = await create_project("OCR", token);
        console.log(`New OCR project initialized for user ${user_clean} with id ${res2.data.id}`);
        project = res2.data;
    } else {
        project = projects.data.projects.pop();
    }

    
    let flow_req = await list_series(`projects/${project.id}`, token);

    
    current_project = project;

    return {
        user: user,
        project: project,
        flows: flow_req.data.series
    }
}) satisfies PageServerLoad;

export const actions = {
    ocr: async ({ cookies, request }) => {
        let token = cookies.get('auth_token');

        const formData = Object.fromEntries(await request.formData());
        if (
            !(formData.fileToUpload as File).name ||
            (formData.fileToUpload as File).name === 'undefined'
        ) {
            return fail(400, {
                error: true,
                message: 'You must provide a file to upload'
            });
        }
        const { fileToUpload } = formData as { fileToUpload: File };

        let new_flow = (await create_flow({name: fileToUpload.name, projectId: current_project?.id}, token)).data;
        
        let asset_node = (await instantiate_node("asset", token)).data;
        asset_node.serieId = new_flow.id;
        asset_node.name = formData.fileToUpload.name;
        let created_asset_node = (await create_node(asset_node, token)).data;
        let newFormData = new FormData();
        newFormData.append('file1', fileToUpload, fileToUpload.name);

        axios.post(`https://dev.aithericon.com/upload/nodes?${created_asset_node.id}`, newFormData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": "Bearer " + token,
            }
          })
          .then(function (response) {
            console.log(response.data);
          });
        
        let tesseract_node = (await instantiate_node(nodeclass_id, token)).data;
        console.log(tesseract_node);
        tesseract_node.connections?.push({
            sourceId: created_asset_node.id,
            sourceSocket: "Files",
            targetId: tesseract_node.id,
            targetSocket: "Files"
        })
        tesseract_node.serieId = new_flow.id;
        let exec_req = await execute_node(tesseract_node, token);
        console.log(exec_req.data.Node);
        let asset_node_finished = await get_node(created_asset_node.id, token);
        return { success: true, node: exec_req.data.Node, asset_node: asset_node_finished.data };
    },
} satisfies Actions;

