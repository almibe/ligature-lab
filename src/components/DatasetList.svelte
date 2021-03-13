<script>
    import { store } from "../store/store";

    let datasets;

    const unsubscribe = store.subscribe(value => {
        datasets = value.datasets;
    });
</script>

<table class="table table-striped table-hover">
    <thead>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Endpoint</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        { #each datasets as dataset }
        <tr>
            <td class="pt-4">{dataset.name}</td>
            <td class="pt-4">{dataset.type}</td>
            <td class="pt-4">{dataset.url}</td>
            <td>
                <button type="button" class="btn btn-outline-dark">Edit</button>
                <button type="button" class="btn btn-outline-danger">Remove</button>
            </td>
        </tr>
        { /each }
    </tbody>
</table>
