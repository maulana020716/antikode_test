import db from "../index.js";

export default class MasterModel {
	static async getPt() {
		return await db.query("SELECT * FROM pt");
	}

	// static async getPtByProjectId(id, callback) {
	// 	// Using Callback
	// 	db.query(
	// 		`SELECT m_pt.pt_id,m_pt.code,m_pt.name,isnull(pt_apikey.apikey,'') as apikey,m_pt.address,m_pt.phone,m_pt.npwp,'' as zipcode,m_pt.rekening FROM project JOIN dbmaster.dbo.m_projectpt ON m_projectpt.project_id = project.source_id JOIN dbmaster.dbo.m_pt ON m_pt.pt_id = m_projectpt.pt_id LEFT JOIN pt_apikey ON pt_apikey.project_id = project.id WHERE project.id = ${id}`,
	// 		function (err, res, fields) {
	// 			if (err) throw err;
	// 			callback(null, res);
	// 		}
	// 	);
	// }

	static async getPtByProjectId(id) {
		// Using Promise
		// return new Promise((resolve, reject) => {
		// 	db.query(
		// 		`SELECT m_pt.pt_id,m_pt.code,m_pt.name,isnull(pt_apikey.apikey,'') as apikey,m_pt.address,m_pt.phone,m_pt.npwp,'' as zipcode,m_pt.rekening FROM project JOIN dbmaster.dbo.m_projectpt ON m_projectpt.project_id = project.source_id JOIN dbmaster.dbo.m_pt ON m_pt.pt_id = m_projectpt.pt_id LEFT JOIN pt_apikey ON pt_apikey.project_id = project.id WHERE project.id = ${id}`,
		// 		function (err, result, fields) {
		// 			if (err) throw err;
		// 			else {
		// 				resolve(result);
		// 			}
		// 		}
		// 	);
		// });

		// Using Async/Await
		return await db.query(
			`SELECT m_pt.pt_id,m_pt.code,m_pt.name,isnull(pt_apikey.apikey,'') as apikey,m_pt.address,m_pt.phone,m_pt.npwp,'' as zipcode,m_pt.rekening FROM project JOIN dbmaster.dbo.m_projectpt ON m_projectpt.project_id = project.source_id JOIN dbmaster.dbo.m_pt ON m_pt.pt_id = m_projectpt.pt_id LEFT JOIN pt_apikey ON pt_apikey.project_id = project.id WHERE project.id = ${id}`
		);
	}

	static async postPT(data) {
		let test = db.query(
			`INSERT INTO pt (  code, name,  source_table, source_id, active ) VALUES ${data}`
		);
		return await test;
	}

	// static async postPt(pt) {
	// 	return new Promise((resolve, reject) => {
	// 		// optional BulkLoad options
	// 		const options = { keepNulls: true };

	// 		// instantiate - provide the table where you'll be inserting to, options and a callback
	// 		const bulkLoad = db.newBulkLoad(
	// 			"pt",
	// 			options,
	// 			function (error, rowCount) {
	// 				if (err) throw err;
	// 				else {
	// 					resolve(rowCount);
	// 				}
	// 			}
	// 		);

	// 		// setup your columns - always indicate whether the column is nullable
	// 		bulkLoad.addColumn("code", TYPES.NVarChar, { nullable: false });
	// 		bulkLoad.addColumn("name", TYPES.NVarChar, { nullable: false });
	// 		bulkLoad.addColumn("source_table", TYPES.NVarChar, {
	// 			nullable: false,
	// 		});
	// 		bulkLoad.addColumn("source_id", TYPES.NVarChar, {
	// 			nullable: false,
	// 		});
	// 		bulkLoad.addColumn("delete", TYPES.NVarChar, { nullable: false });
	// 		bulkLoad.addColumn("project_id", TYPES.NVarChar, {
	// 			nullable: false,
	// 		});

	// 		// execute
	// 		db.execBulkLoad(bulkLoad, [
	// 			{ myInt: 7, myString: "hello" },
	// 			{ myInt: 23, myString: "world" },
	// 		]);
	// 	});
	// }

	// static async updateProduct(id, product) {
	// 	return new Promise((resolve, reject) => {
	// 		db.query(
	// 			"UPDATE product SET name=?,picture=?,price=? WHERE id = ?",
	// 			[product.name, product.picture, product.price, id],
	// 			function (err, result, fields) {
	// 				if (err) throw err;
	// 				else {
	// 					resolve(result);
	// 				}
	// 			}
	// 		);
	// 	});
	// }

	// static async deleteProduct(id) {
	// 	return new Promise((resolve, reject) => {
	// 		db.query(
	// 			"DELETE FROM product WHERE ID = ?",
	// 			id,
	// 			function (err, result, fields) {
	// 				if (err) throw err;
	// 				else {
	// 					resolve(result);
	// 				}
	// 			}
	// 		);
	// 	});
	// }
}
