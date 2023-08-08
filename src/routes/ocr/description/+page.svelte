<script lang="ts">
	import { CodeBlock } from '@skeletonlabs/skeleton';
	let docker = `FROM python:3.8.17-slim-bullseye
RUN DEBIAN_FRONTEND=noninteractive apt-get update
# Install Tesseract and dependencies
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y tesseract-ocr libtesseract-dev python3-pil
RUN pip install pytesseract`;
	let code = `from PIL import Image
import pytesseract
# Download files from parent node (in this case the user uploaded image) into the current container
for parent in parent_nodes:
    for test_file in parent.files:
        test_file.retrieve()
        # OCR from the image to a string and save it to the node output attribute
        outputs["out"] = pytesseract.image_to_string(Image.open(test_file.get_path()))`;

	let upload_code = `
...
// Get the form request data
const formData = Object.fromEntries(await request.formData());

const { fileToUpload } = formData as { fileToUpload: File };
// Get an empty asset node
let asset_node = (await instantiate_node("asset", token)).data;
asset_node.serieId = current_flow.id;
asset_node.name = formData.fileToUpload.name;
// Create the asset node
let created_node = (await create_node(asset_node, token)).data;

// Upload the file to the asset node
let newFormData = new FormData();
newFormData.append('file1', fileToUpload, 'test.png');

axios.post(\`https://dev.aithericon.com/upload/nodes?\${created_node.id}\`, newFormData, {
    headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": "Bearer " + token,
    }
    });
...
    `;
	let exec_code = `let tesseract_node = (await instantiate_node(nodeclass_id, token)).data;
tesseract_node.connections?.push({
    sourceId: created_asset_node.id,
    sourceSocket: "Files",
    targetId: tesseract_node.id,
    targetSocket: "Files"
})
tesseract_node.serieId = current_flow.id;
let exec_req = await execute_node(tesseract_node, token);
console.log(exec_req.data.Node);
let asset_node_finished = await get_node(created_asset_node.id, token);
return { success: true, node: exec_req.data.Node, asset_node: asset_node_finished.data };`;
</script>

<div class="container h-full mx-auto flex flex-col space-y-4">
	<div class="py-12 space-y-4">
		<a href="/ocr"
			><button class="btn font-mono variant-filled-secondary w-32"
				><i class="fas fa-arrow-left text-xl">Back</i></button
			>
		</a>
		<h1 class="text-primary-600-300-token text-4xl font-bold">
			OCR Application
			<p class="text-xl">Optical Character Recognition</p>
		</h1>

		<p class="text-xl">
			This example uses the <a href="https://github.com/tesseract-ocr/tesseract">Tesseract</a> OCR
			engine to extract text from an image. To do so, we use the
			<a href="https://pypi.org/project/pytesseract/">pytesseract</a> python library to make the usage
			easier.
		</p>
	</div>
	<div class="space-y-12">
		<div class="space-y-4">
			<h2 class="font-bold text-secondary-600-300-token">Flow Setup</h2>
			<p>
				First, we create an asset node in which the user uploaded file will be added. We can achieve
				this easily, by proxying the file upload form to the <strong>Aithericon platform</strong>.
				In this example we use the <a href="https://axios-http.com/">Axios HTTP client</a> alongside
				<a href="https://kit.svelte.dev/">SvelteKit</a> to achieve this but any other client will do
				aswell. In practice this will look like the following:
			</p>
			<CodeBlock language="typescript" code={upload_code} />
			<p>
				After this is done, we will need to create our <b>Tesseract</b> node and connect it to the
				asset node. This can be done by adding a respective <code>connection</code> to the
				<code>connections</code>
				array of our <b>Tesseract</b> node. All that is left to do then is to call
				<code>execute_node</code>
				on the <b>Tesseract</b> node. This will trigger the execution of the node and the resulting text
				can be extracted and displayed to the user.
			</p>

			<CodeBlock language="typescript" code={exec_code} />
			<p>
				In a real world example, you would need to check for errors, limit the file size to upload
				(or adapt the memory requirements of the tesseract node).
			</p>
		</div>
		<div class="space-y-4">
			<h2 class="font-bold text-secondary-600-300-token">Container Setup</h2>
			<p>
				In this case, the setup of our container environment is straight forward. We begin with a
				fitting <code>python 3.8</code> base image and install all <code>tesseract</code> dependencies
			</p>

			<CodeBlock language="dockerfile" code={docker} />
		</div>
		<div class="space-y-4">
			<h2 class="font-bold text-secondary-600-300-token">Node Setup</h2>
			<CodeBlock language="python" {code} />
		</div>
	</div>
	<div class="h-12" />
</div>
