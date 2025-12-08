const BASE_URL = 'http://localhost:3000/api/admin/categories';

async function testCategoriesAPI() {
    console.log('Starting Categories API Test...');

    // 1. Create a Category
    console.log('\n1. Testing CREATE (POST)...');
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
            console.log('✅ Created:', createdCategory.name, `(ID: ${createdCategory._id})`);
        } else {
            console.error('❌ Create Failed:', data);
            return;
        }
    } catch (err) {
        console.error('❌ Create Error:', err.message);
        return;
    }

    // 2. List Categories (Read)
    console.log('\n2. Testing READ (GET)...');
    try {
        const res = await fetch(`${BASE_URL}?q=${encodeURIComponent(createdCategory.name)}`);
        const data = await res.json();

        if (res.ok && data.ok && data.data.length > 0) {
            const found = data.data.find(c => c._id === createdCategory._id);
            if (found) {
                console.log('✅ Read: Found created category in list');
            } else {
                console.error('❌ Read: Created category not found in list');
            }
        } else {
            console.error('❌ Read Failed:', data);
        }
    } catch (err) {
        console.error('❌ Read Error:', err.message);
    }

    // 3. Update Category
    console.log('\n3. Testing UPDATE (PATCH)...');
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
            console.log('✅ Updated:', data.data.description);
        } else {
            console.error('❌ Update Failed:', data);
        }
    } catch (err) {
        console.error('❌ Update Error:', err.message);
    }

    // 4. Delete Category
    console.log('\n4. Testing DELETE...');
    try {
        const res = await fetch(`${BASE_URL}?id=${createdCategory._id}`, {
            method: 'DELETE',
        });
        const data = await res.json();

        if (res.ok && data.ok) {
            console.log('✅ Deleted:', data.message);
        } else {
            console.error('❌ Delete Failed:', data);
        }
    } catch (err) {
        console.error('❌ Delete Error:', err.message);
    }

    console.log('\nTest Complete.');
}

testCategoriesAPI();
