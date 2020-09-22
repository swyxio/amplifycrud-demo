<script>
	import { API } from 'aws-amplify';
  let data;
  async function getData() {
    const result = await API.get('api6bb4f0db','/helloworld')
		data = result;
	}
  let formState = { phone: "", name: "" };
	let allSubmissions = []
  async function createContact(e) {
    e.target.reset();
		await API.post('contact', '/contact', {body: formState})
		console.log('hi')
		getSubmissions()
	}
	async function getSubmissions() {
		allSubmissions = await API.get('contact', '/contact');
	}
</script>
<style>
	pre {
		background-color: #fcf2f2;
	}
</style>

<h1>Amplify REST API + DynamoDB Demo</h1>

<h2>Part 1 - Hello World</h2>
<div><button class="btn" on:click={getData}>click</button></div>
Response:
<pre><code class="language-json">{JSON.stringify({ data }, null, 2)}</code></pre>

<h2>Part 2 - CRUD form submission</h2>

<form on:submit|preventDefault={createContact}>
  <div class="form-group">
		<label class="form-label" for="input-example-1">Name</label>
		<input
			class="form-input"
			class:is-error={formState.name.length < 1}
			type="text"
			placeholder="Name"
			id="input-example-1"
			bind:value={formState.name} />
		<label class="form-label" for="input-example-2">Phone</label>
		<input
			class="form-input"
			class:is-error={formState.phone.length < 1}
			type="tel"
			placeholder="Phone"
			id="input-example-2"
			bind:value={formState.phone} />
    <button class="btn" type="submit">Submit</button>
  </div>
</form>
Response:
<pre>
	<code class="language-json">
		<!-- {#await submitPromise}
			Fetching...
		{:then shownSubmissions}
			{JSON.stringify({ shownSubmissions }, null, 2)}
		{/await} -->
		{JSON.stringify({ allSubmissions }, null, 2)}
	</code>
</pre>
