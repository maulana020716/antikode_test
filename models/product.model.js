import db from "../index.js";

export default class ProductModel {
	static async getProducts() {
		return new Promise((resolve, reject) => {
			db.query("SELECT * FROM product", function (err, result, fields) {
				if (err) throw err;
				else {
					resolve(result);
				}
			});
		});
	}

	static async getProductById(id) {
		return new Promise((resolve, reject) => {
			db.query(
				"SELECT * FROM product WHERE id = ?",
				id,
				function (err, result, fields) {
					if (err) throw err;
					else {
						resolve(result);
					}
				}
			);
		});
	}

	static async createProduct(product) {
		return new Promise((resolve, reject) => {
			db.query(
				"INSERT INTO product SET ?",
				product,
				function (err, result, fields) {
					if (err) throw err;
					else {
						resolve(result);
					}
				}
			);
		});
	}

	static async updateProduct(id, product) {
		return new Promise((resolve, reject) => {
			db.query(
				"UPDATE product SET name=?,picture=?,price=? WHERE id = ?",
				[product.name, product.picture, product.price, id],
				function (err, result, fields) {
					if (err) throw err;
					else {
						resolve(result);
					}
				}
			);
		});
	}

	static async deleteProduct(id) {
		return new Promise((resolve, reject) => {
			db.query(
				"DELETE FROM product WHERE ID = ?",
				id,
				function (err, result, fields) {
					if (err) throw err;
					else {
						resolve(result);
					}
				}
			);
		});
	}
}
