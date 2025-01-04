// public/PersonManager.js
const dbmgr = require("./DBManager");
const db = dbmgr.db;

// Function to read all buyers
const readAllBuyers = () => {
    try {
        const query = `SELECT * FROM buyer`;
        const readQuery = db.prepare(query);
        const rowList = readQuery.all();
        console.log("hello")
        return rowList;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

// Function to read a product by its id
const readProductById = (id, page = 1, limit = 20) => {
    try {
        const offset = (page - 1) * limit;
        const query = `
            SELECT product.*, buyer.name AS buyerName 
            FROM product 
            LEFT JOIN buyer ON product.id_buyer = buyer.id
            WHERE product.id_buyer = ?
            ORDER BY product.id DESC
            LIMIT ? OFFSET ?
        `;
        const readQuery = db.prepare(query);
        const products = readQuery.all(id, limit, offset); 
        return products;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const readProductsFilter = (id = null, page = 1, limit = 20) => {
    try {
        const offset = (page - 1) * limit;
        
        // Base query for products selection
        let query = `
            SELECT product.*, buyer.name AS buyerName 
            FROM product 
            LEFT JOIN buyer ON product.id_buyer = buyer.id
        `;
        
        // Conditionally add the WHERE clause if id is provided
        if (id) {
            query += ` WHERE product.id_buyer = ?`;
        }
        
        // Add ordering, limit, and offset
        query += ` ORDER BY product.id DESC LIMIT ? OFFSET ?`;
        
        const readQuery = db.prepare(query);
        
        // Execute the query based on whether id is provided
        const products = id ? readQuery.all(id, limit, offset) : readQuery.all(limit, offset);

        // Count query to get the total number of matching products
        let countQuery = `SELECT COUNT(*) AS total FROM product`;
        if (id) {
            countQuery += ` WHERE id_buyer = ?`;
        }
        
        const countResult = id ? db.prepare(countQuery).get(id) : db.prepare(countQuery).get();
        const totalItems = countResult.total;
        const totalPages = Math.ceil(totalItems / limit);
        
        // Return both the products and pagination info
        return {
            products,
            totalPages,
            totalItems
        };
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const readProductsByIdProductFilter = (productId = null, page = 1, limit = 20) => {
    try {
        const offset = (page - 1) * limit;

        // Base query for products selection
        let query = `
            SELECT product.*, buyer.name AS buyerName 
            FROM product 
            LEFT JOIN buyer ON product.id_buyer = buyer.id
        `;

        const params = [];

        // Conditionally add the WHERE clause if productId is provided
        if (productId) {
            query += ` WHERE product.id = ?`;
            params.push(productId);
        }

        // Add ordering, limit, and offset
        query += ` ORDER BY product.id DESC LIMIT ? OFFSET ?`;
        params.push(limit, offset);

        const readQuery = db.prepare(query);

        // Execute the query
        const products = readQuery.all(...params);

        // Count query to get the total number of matching products
        let countQuery = `SELECT COUNT(*) AS total FROM product`;
        const countParams = [];

        if (productId) {
            countQuery += ` WHERE id = ?`;
            countParams.push(productId);
        }

        const countResult = db.prepare(countQuery).get(...countParams);
        const totalItems = countResult.total;
        const totalPages = Math.ceil(totalItems / limit);

        // Return both the products and pagination info
        return {
            products,
            totalPages,
            totalItems
        };
    } catch (err) {
        console.error(err);
        throw err;
    }
};



// Function to read a product by its id Buyer
const readProductByIdBuyer = (id) => {
    try {
        const query = `
            SELECT product.*, buyer.name AS buyerName 
            FROM product 
            LEFT JOIN buyer ON product.id_buyer = buyer.id
            WHERE product.id_buyer = ?
            ORDER BY product.id DESC
            LIMIT 10
        `;
        const readQuery = db.prepare(query);
        const product = readQuery.all(id); 
        return product;
    } catch (err) {
        console.error(err);
        throw err;
    }
};




// Function to read the last 2 products inserted
const readAllProducts = () => {
    try {
        const query = `
            SELECT product.*, buyer.name AS buyerName 
            FROM product 
            LEFT JOIN buyer ON product.id_buyer = buyer.id
            ORDER BY product.id DESC -- Assuming 'id' determines insertion order
            LIMIT 2
        `;
        const readQuery = db.prepare(query);
        const rowList = readQuery.all();
        return rowList;
    } catch (err) {
        console.error(err);
        throw err;
    }
};


// Function to insert a new buyer
const insertBuyer = (name) => {
    try {
        const insertQuery = db.prepare(
            `INSERT INTO buyer (name) VALUES (?)`
        );

        const transaction = db.transaction(() => {
            const info = insertQuery.run(name);
            console.log(
                `Inserted ${info.changes} rows with last ID ${info.lastInsertRowid} into buyer`
            );
            return info.lastInsertRowid;
           
        });
        return transaction(); 
    } catch (err) {
        console.error(err);
        throw err;
    }
};

// Function to insert a new product
const insertProduct = (title, id_buyer, pricePurchase, priceSale, description) => {
    try {
        const insertQuery = db.prepare(
            `INSERT INTO product (title, id_buyer, pricePurchace, priceSale, description) 
            VALUES (?, ?, ?, ?, ?)`
        );

        const transaction = db.transaction(() => {
            const info = insertQuery.run(title, id_buyer, pricePurchase, priceSale, description);
            console.log(
                `Inserted ${info.changes} rows with last ID ${info.lastInsertRowid} into product`
            );
            return info.lastInsertRowid;
        });
        return transaction();
    } catch (err) {
        console.error(err);
        throw err;
    }
};

// Function to update an existing buyer
const modifyBuyer = (id, newName) => {
    try {
        const updateQuery = db.prepare(
            `UPDATE buyer SET name = ? WHERE id = ?`
        );

        const transaction = db.transaction(() => {
            const info = updateQuery.run(newName, id);
            console.log(
                `Updated ${info.changes} rows in buyer`
            );
        });
        transaction();
    } catch (err) {
        console.error(err);
        throw err;
    }
};

// Function to update an existing product
const modifyProduct = (id, newTitle, newId_buyer, newPricePurchase, newPriceSale, newDescription) => {
    try {
        const updateQuery = db.prepare(
            `UPDATE product 
            SET title = ?, id_buyer = ?, pricePurchace = ?, priceSale = ?, description = ? 
            WHERE id = ?`
        );

        const transaction = db.transaction(() => {
            const info = updateQuery.run(newTitle, newId_buyer, newPricePurchase, newPriceSale, newDescription, id);
            console.log(
                `Updated ${info.changes} rows in product`
            );
        });
        transaction();
    } catch (err) {
        console.error(err);
        throw err;
    }
};

// Function to update the priceSale of an existing product
const modifyProductPriceSale = (id, newPriceSale) => {
    try {
        const updateQuery = db.prepare(
            `UPDATE product 
            SET priceSale = ? 
            WHERE id = ?`
        );

        const transaction = db.transaction(() => {
            const info = updateQuery.run(newPriceSale, id);
            console.log(
                `Updated ${info.changes} rows for product ID ${id}`
            );
        });
        transaction();
    } catch (err) {
        console.error(err);
        throw err;
    }
};


const calculateTotalBenefit = (dateFrom = null, dateTo = null) => {
    try {
        let query = `
            SELECT SUM(priceSale - pricePurchace) AS totalBenefit
            FROM product
            WHERE priceSale IS NOT NULL
        `;

        const params = [];

        if (dateFrom) {
            query += ` AND date >= ?`;
            params.push(dateFrom);
        }

        if (dateTo) {
            query += ` AND date <= ?`;
            params.push(dateTo);
        }

        const readQuery = db.prepare(query);
        const result = readQuery.get(...params); // Pass the parameters dynamically
        return result.totalBenefit || 0; // Return 0 if no result
    } catch (err) {
        console.error(err);
        throw err;
    }
};


/*
// Function to calculate the total benefit where priceSale is not NULL
const calculateTotalBenefit = () => {
    try {
        const query = `
            SELECT SUM(priceSale - pricePurchace) AS totalBenefit
            FROM product
            WHERE priceSale IS NOT NULL
        `;
        const readQuery = db.prepare(query);
        const result = readQuery.get(); // Using `get()` since we expect a single row
        return result.totalBenefit || 0; // Return 0 if no result
    } catch (err) {
        console.error(err);
        throw err;
    }
};
*/



/*
// Function to calculate the total benefit for a specific buyer where priceSale is not NULL
const calculateTotalBenefitByBuyer = (id_buyer) => {
    try {
        const query = `
            SELECT SUM(priceSale - pricePurchace) AS totalBenefit
            FROM product
            WHERE priceSale IS NOT NULL AND id_buyer = ?
        `;
        const readQuery = db.prepare(query);
        const result = readQuery.get(id_buyer); // Passing the buyer ID as a parameter
        return result.totalBenefit || 0; // Return 0 if no result
    } catch (err) {
        console.error(err);
        throw err;
    }
};

*/

const calculateTotalBenefitByBuyer = (id_buyer, dateFrom = null, dateTo = null) => {
    try {
        let query = `
            SELECT SUM(priceSale - pricePurchace) AS totalBenefit
            FROM product
            WHERE priceSale IS NOT NULL AND id_buyer = ?
        `;

        const params = [id_buyer];

        if (dateFrom) {
            query += ` AND date >= ?`;
            params.push(dateFrom);
        }

        if (dateTo) {
            query += ` AND date <= ?`;
            params.push(dateTo);
        }

        const readQuery = db.prepare(query);
        const result = readQuery.get(...params); // Pass the parameters dynamically
        return result.totalBenefit || 0; // Return 0 if no result
    } catch (err) {
        console.error(err);
        throw err;
    }
};


// Function to count the number of products added by a specific buyer by their ID
const countProductsByBuyerId = (id_buyer) => {
    try {
        const query = `
            SELECT COUNT(product.id) AS productCount
            FROM product
            WHERE product.id_buyer = ?
        `;
        const readQuery = db.prepare(query);
        const result = readQuery.get(id_buyer); // Fetch the count for the specific buyer
        return result.productCount || 0; // Return 0 if no products found
    } catch (err) {
        console.error(err);
        throw err;
    }
};


// Function to delete a product by its ID
const deleteProduct = (id) => {
    try {
        const deleteQuery = db.prepare(
            `DELETE FROM product WHERE id = ?`
        );

        const transaction = db.transaction(() => {
            const info = deleteQuery.run(id);
            console.log(`Deleted ${info.changes} rows for product ID ${id}`);
        });
        transaction();
    } catch (err) {
        console.error(err);
        throw err;
    }
};


// Function to modify an existing product
const modifyProduct2 = (id, newTitle, newPricePurchase, newDescription) => {
    try {
        const updateQuery = db.prepare(
            `UPDATE product 
            SET title = ?, pricePurchace = ?, description = ? 
            WHERE id = ?`
        );

        const transaction = db.transaction(() => {
            const info = updateQuery.run(newTitle, newPricePurchase, newDescription, id);
            console.log(`Updated ${info.changes} rows for product ID ${id}`);
        });
        transaction();
    } catch (err) {
        console.error(err);
        throw err;
    }
};




// Function to log in a user
const loginUser = (numberPhone, password) => {
    try {
        const query = `SELECT * FROM user WHERE number_phone = ? AND password = ?`;
        const loginQuery = db.prepare(query);
        const user = loginQuery.get(numberPhone, password);
        return user || null; // Return the user if found, or null if not
    } catch (err) {
        console.error(err);
        throw err;
    }
};

// Function to update user details
const updateUser = (id, newNumberPhone, newPassword) => {
    try {
        const query = `UPDATE user SET number_phone = ?, password = ? WHERE id = ?`;
        const updateQuery = db.prepare(query);
        const result = updateQuery.run(newNumberPhone, newPassword, id);
        return result.changes > 0; // Return true if at least one row was updated
    } catch (err) {
        console.error(err);
        throw err;
    }
};


module.exports = {
    readAllBuyers,
    readAllProducts,
    readProductById,
    readProductByIdBuyer,
    readProductsByIdProductFilter,
    readProductsFilter,
    insertBuyer,
    insertProduct,
    modifyBuyer,
    modifyProduct,
    modifyProductPriceSale,
    calculateTotalBenefit,
    calculateTotalBenefitByBuyer,
    countProductsByBuyerId,
    deleteProduct,
    modifyProduct2,
    loginUser,
    updateUser
};
