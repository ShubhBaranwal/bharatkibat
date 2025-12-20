const BASE_URL = 'http://localhost:3000/api/admin/categories';

async function testCategoriesAPI() {


    // 1. Create a Category

    const newCategory = {
        name: 'Test Category ' + Date.now(),
        description: 'A category for testing purposes',
        icon: 'TestIcon',
        priority: 10
    };

    let createdCategory;
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCategory),
        });
        const data = await res.json();

        if (res.ok && data.ok) {
            createdCategory = data.data;

        } else {

            return;
        }
    } catch (err) {

        return;
    }

    // 2. List Categories (Read)

    try {
        const res = await fetch(`${BASE_URL}?q=${encodeURIComponent(createdCategory.name)}`);
        const data = await res.json();

        if (res.ok && data.ok && data.data.length > 0) {
            const found = data.data.find(c => c._id === createdCategory._id);
            if (found) {

            } else {

            }
        } else {

        }
    } catch (err) {

    }

    // 3. Update Category

    try {
        const updateData = {
            id: createdCategory._id,
            description: 'Updated description'
        };

        // Note: The API expects ID as a query param or body? 
        // Checking route.ts: 
        // const id = url.searchParams.get("id");
        // const body = await req.json();

        const res = await fetch(`${BASE_URL}?id=${createdCategory._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ description: 'Updated description' }),
        });
        const data = await res.json();

        if (res.ok && data.ok) {

        } else {

        }
    } catch (err) {

    }

    // 4. Delete Category

    try {
        const res = await fetch(`${BASE_URL}?id=${createdCategory._id}`, {
            method: 'DELETE',
        });
        const data = await res.json();

        if (res.ok && data.ok) {

        } else {

        }
    } catch (err) {

    }


}

testCategoriesAPI();
