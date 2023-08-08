import * as aithericon_api from '$lib/typecript-axios';
import { apiCfg, basePath } from '$lib/vars';
import type { AxiosResponse } from 'axios';

export async function login(name: string, password: string) {
    let login_api = new aithericon_api.LoginApi(apiCfg);
    let res = await login_api.apiLogin(name, password);
    return res;
}


export async function validate_token(token: string) {

    let login_api = new aithericon_api.LoginApi(apiCfg);
    let res = await login_api.apiValidateToken(token);
    return res;
}

export async function list_projects(user: string, page_size: number, page_token: string, filter: string, token: string) {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    let project_api = new aithericon_api.ProjectApi(
        new aithericon_api.Configuration(
            {
                basePath: basePath,
                accessToken: token,
                apiKey: token,
                baseOptions: config
            }
        ));
    let res = await project_api.apiListProjects(user, page_size, page_token, filter);
    return res;
}

export async function list_series(parent: string, token: string) {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    let project_api = new aithericon_api.FlowApi(
        new aithericon_api.Configuration(
            {
                basePath: basePath,
                accessToken: token,
                apiKey: token,
                baseOptions: config
            }
        ));
    let res = await project_api.apiListSeries(parent, 5, "<created/0");
    return res;
}

export async function create_flow(flow: aithericon_api.AgridosSerie, token: string): Promise<AxiosResponse<aithericon_api.AgridosSerie, any>>  {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    let flow_api = new aithericon_api.FlowApi(
        new aithericon_api.Configuration(
            {
                basePath: basePath,
                accessToken: token,
                apiKey: token,
                baseOptions: config
            }
        ));
    let res = await flow_api.apiCreateSerie({parent: `projects/${flow.projectId}`, serie: flow});
    return res;
}

export async function create_project(name: string, token: string): Promise<AxiosResponse<aithericon_api.AgridosProject, any>>  {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    let flow_api = new aithericon_api.ProjectApi(
        new aithericon_api.Configuration(
            {
                basePath: basePath,
                accessToken: token,
                apiKey: token,
                baseOptions: config
            }
        ));
    let res = await flow_api.apiCreateProject({parent: "", project: {name: name, status: "NEW"}});
    return res;
}

export async function get_node(id: string, token: string) {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    let nodeclass_api = new aithericon_api.NodeApi(
        new aithericon_api.Configuration(
            {
                basePath: basePath,
                accessToken: token,
                apiKey: token,
                baseOptions: config
            }
        ));
    let res = await nodeclass_api.apiGetNode(id);
    return res;
}

export async function create_node(node: aithericon_api.AgridosNode, token: string): Promise<AxiosResponse<aithericon_api.AgridosNode, any>>  {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    let node_api = new aithericon_api.NodeApi(
        new aithericon_api.Configuration(
            {
                basePath: basePath,
                accessToken: token,
                apiKey: token,
                baseOptions: config
            }
        ));
    let res = await node_api.apiCreateNode({parent: node.serieId, node: node});
    return res;
}


export async function execute_node(node, token: string) {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    let nodeclass_api = new aithericon_api.NodeApi(
        new aithericon_api.Configuration(
            {
                basePath: basePath,
                accessToken: token,
                apiKey: token,
                baseOptions: config
            }
        ));
    let res = await nodeclass_api.apiExecuteNode({ node: node });
    return res;
}

export async function instantiate_node(nodeclass_id: string, token: string): Promise<AxiosResponse<aithericon_api.AgridosNode, any>> {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    let node_api = new aithericon_api.NodeApi(
        new aithericon_api.Configuration(
            {
                basePath: basePath,
                accessToken: token,
                apiKey: token,
                baseOptions: config
            }
        ));
    let res = await node_api.apiInstantiateNodeFromClass(nodeclass_id);
    return res;

}