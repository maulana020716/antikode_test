import db from "../index.js";

export default class OutletModel {
	static async getOutlets() {
		return new Promise((resolve, reject) => {
			db.query("SELECT * FROM outlet", function (err, result, fields) {
				if (err) throw err;
				else {
					resolve(result);
				}
			});
		});
	}

	static async getOutletById(id) {
		return new Promise((resolve, reject) => {
			db.query(
				"SELECT * FROM outlet WHERE id = ?",
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

	static async createOutlet(outlet) {
		return new Promise((resolve, reject) => {
			db.query(
				"INSERT INTO outlet SET ?",
				outlet,
				function (err, result, fields) {
					if (err) throw err;
					else {
						resolve(result);
					}
				}
			);
		});
	}

	static async updateOutlet(id, outlet) {
		return new Promise((resolve, reject) => {
			db.query(
				"UPDATE outlet SET name=?,picture=?,address=?,latitude=?,longitude=? WHERE id = ?",
				[
					outlet.name,
					outlet.picture,
					outlet.address,
					outlet.latitude,
					outlet.longitude,
					id,
				],
				function (err, result, fields) {
					if (err) throw err;
					else {
						resolve(result);
					}
				}
			);
		});
	}

	static async deleteOutlet(id) {
		return new Promise((resolve, reject) => {
			db.query(
				"DELETE FROM outlet WHERE ID = ?",
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
