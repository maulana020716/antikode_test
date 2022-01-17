import db from "../index.js";

export default class BrandModel {
	static async getBrands() {
		return new Promise((resolve, reject) => {
			db.query("SELECT * FROM brand", function (err, result, fields) {
				if (err) throw err;
				else {
					resolve(result);
				}
			});
		});
	}

	static async getBrandById(id) {
		return new Promise((resolve, reject) => {
			db.query(
				"SELECT * FROM brand WHERE id = ?",
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

	static async createBrand(brand) {
		return new Promise((resolve, reject) => {
			db.query(
				"INSERT INTO brand SET ?",
				brand,
				function (err, result, fields) {
					if (err) throw err;
					else {
						resolve(result);
					}
				}
			);
		});
	}

	static async updateBrand(id, brand) {
		return new Promise((resolve, reject) => {
			db.query(
				"UPDATE brand SET name=?,logo=?,banner=? WHERE id = ?",
				[brand.name, brand.logo, brand.banner, id],
				function (err, result, fields) {
					if (err) throw err;
					else {
						resolve(result);
					}
				}
			);
		});
	}

	static async deleteBrand(id) {
		return new Promise((resolve, reject) => {
			db.query(
				"DELETE FROM brand WHERE ID = ?",
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
