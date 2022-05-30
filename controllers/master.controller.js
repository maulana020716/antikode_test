import MasterModel from "../models/master.model.js";
import csv from "csv-parser";
import fs from "fs";
import db from "../index.js";
export default class MasterController {
	static async getPt(req, res, next) {
		let data = [];
		const test = new Promise((resolve, reject) => {
			fs.createReadStream("C://xampp//htdocs//antikode//CLCB.csv")
				.on("error", (error) => {
					reject(error);
				})
				.pipe(csv({ separator: ";" }))
				.on("data", async (row) => {
					const query = await db.query(
						`SELECT * FROM checkout_salesforce WHERE salesforce_id = '${row["Order ID"]}'`
					);
					if (typeof query.recordset[0] === "undefined") {
						console.log(
							`Tidak ada checkout_salesforce Untuk Order ID ${row["Order ID"]} `
						);
						return;
					}

					// console.log(query.recordset[0]);
					if (query.recordset[0].external_id.indexOf(";") > -1) {
						const words = query.recordset[0].external_id.split(";");
						let jmlArrVal = 0;

						let jmlArr = [];
						for (let word of words) {
							// console.log(element);
							const queryLin = await db.query(
								`SELECT * FROM t_tagihan_lingkungan WHERE t_tagihan_id = ${word}`
							);
							const queryAir = await db.query(
								`SELECT * FROM t_tagihan_air WHERE t_tagihan_id = ${word}`
							);
							if (
								typeof queryLin.recordset[0] === "undefined" ||
								typeof queryAir.recordset[0] === "undefined"
							) {
								console.log(
									`Tidak ada tagihan Untuk Order ID ${row["Order ID"]} `
								);
								return;
							}

							const Air = await db.query(
								`SELECT * FROM t_pembayaran_detail
										JOIN t_pembayaran
											ON t_pembayaran.id = t_pembayaran_detail.t_pembayaran_id
										JOIN service
											ON service.id = t_pembayaran_detail.service_id
										WHERE t_pembayaran_detail.tagihan_service_id = ${queryAir.recordsets[0][0]["id"]}
										AND isnull(t_pembayaran.is_void,0) = 0`
							);
							const Lin = await db.query(
								`SELECT * FROM t_pembayaran_detail
										JOIN t_pembayaran
											ON t_pembayaran.id = t_pembayaran_detail.t_pembayaran_id
										JOIN service
											ON service.id = t_pembayaran_detail.service_id
										WHERE t_pembayaran_detail.tagihan_service_id = ${queryLin.recordsets[0][0]["id"]}
										AND isnull(t_pembayaran.is_void,0) = 0`
							);
							// console.log(
							// 	`tagihan_service_id Lin ${queryLin.recordsets[0][0]["id"]} record tagihan ${Lin.recordset[0]}`
							// );
							// console.log(
							// 	`tagihan_service_id Air ${queryAir.recordsets[0][0]["id"]} record tagihan ${Air.recordset[0]}`
							// );
							const bayarAir =
								typeof Air.recordset[0] === "undefined"
									? 0
									: Air.recordset[0]["bayar"];
							const bayarLin =
								typeof Lin.recordset[0] === "undefined"
									? 0
									: Lin.recordset[0]["bayar"];
							// console.log(bayarLin);
							// console.log(bayarAir);
							jmlArr.push(bayarAir);
							jmlArr.push(bayarLin);
							jmlArr.push(bayarAir + bayarLin);
							jmlArrVal += bayarAir + bayarLin;
						}
						if (jmlArrVal == row["Amount"]) {
							console.log(
								`Untuk Order ID ${row["Order ID"]} Pembayaran Sesuai`
							);
						} else {
							console.log(
								`Untuk Order ID ${
									row["Order ID"]
								} dengan array ${jmlArr} dan Amount ${parseInt(
									row["Amount"]
								)}  Pembayaran Perlu Dicek`
							);
						}
					} else {
						const queryLin = await db.query(
							`SELECT * FROM t_tagihan_lingkungan WHERE t_tagihan_id = ${query.recordset[0].external_id}`
						);
						const queryAir = await db.query(
							`SELECT * FROM t_tagihan_air WHERE t_tagihan_id = ${query.recordset[0].external_id}`
						);
						if (
							typeof queryLin.recordset[0] === "undefined" ||
							typeof queryAir.recordset[0] === "undefined"
						) {
							console.log(
								`Tidak ada tagihan Untuk Order ID ${row["Order ID"]} `
							);
							return;
						}

						const Air = await db.query(
							`SELECT * FROM t_pembayaran_detail
						JOIN t_pembayaran
							ON t_pembayaran.id = t_pembayaran_detail.t_pembayaran_id
						JOIN service
							ON service.id = t_pembayaran_detail.service_id
						WHERE t_pembayaran_detail.tagihan_service_id = ${queryAir.recordsets[0][0]["id"]}
						AND isnull(t_pembayaran.is_void,0) = 0`
						);

						const Lin = await db.query(
							`SELECT * FROM t_pembayaran_detail
							JOIN t_pembayaran
								ON t_pembayaran.id = t_pembayaran_detail.t_pembayaran_id
							JOIN service
								ON service.id = t_pembayaran_detail.service_id
							WHERE t_pembayaran_detail.tagihan_service_id = ${queryLin.recordsets[0][0]["id"]}
							AND isnull(t_pembayaran.is_void,0) = 0`
						);
						// console.log(
						// 	`tagihan_service_id Lin ${queryLin.recordsets[0][0]["id"]} record tagihan ${Lin.recordset[0]}`
						// );
						// console.log(
						// 	`tagihan_service_id Air ${queryAir.recordsets[0][0]["id"]} record tagihan ${Air.recordset[0]}`
						// );

						const bayarAir =
							typeof Air.recordset[0] === "undefined"
								? 0
								: Air.recordset[0]["bayar"];
						const bayarLin =
							typeof Lin.recordset[0] === "undefined"
								? 0
								: Lin.recordset[0]["bayar"];
						// console.log(bayarLin);
						// console.log(bayarAir);
						const jmlArr = [];
						jmlArr.push(bayarAir);
						jmlArr.push(bayarLin);
						jmlArr.push(bayarAir + bayarLin);
						if (jmlArr.includes(parseInt(row["Amount"]))) {
							console.log(
								`Untuk Order ID ${row["Order ID"]} dan unit id ${queryAir.recordsets[0][0]["unit_id"]} Pembayaran Sesuai`
							);
						} else {
							console.log(
								`Untuk Order ID ${
									row["Order ID"]
								} dengan array ${jmlArr} dan Amount ${parseInt(
									row["Amount"]
								)} dan unit id ${
									queryAir.recordsets[0][0]["id"]
								} Pembayaran Perlu Dicek`
							);
						}
					}

					data.push(await query.recordset[0]);
				})
				.on("end", () => {
					resolve(data);
				});
		});

		const result = await test;
		res.json(result);
	}

	// // Using Callback
	// static async getPtById(req, res, next) {
	// 	await MasterModel.getPtByProjectId(
	// 		req.params.id,
	// 		function (err, result) {
	// 			if (err) throw err;
	// 			res.json(result.recordset);
	// 		}
	// 	);
	// }

	// Using Promises or Asyc/Await
	static async getPtById(req, res, next) {
		let Pt = await MasterModel.getPtByProjectId(req.params.id);
		res.json(Pt.recordset);
	}

	static async getCoa(req, res, next) {
		let Coa = await MasterModel.getCoa();
		// res.render("Home", { data: Products });
		res.json(Coa.recordset);
	}

	static async postPT(req, res, next) {
		let data = [
			{
				code: "asdTEST",
				name: "test",
				source_table: 2,
				source_id: 62,
				active: "1",
			},
		];

		let mappedArray = data.map((item) => Object.values(item));
		let Pt = await MasterModel.postPT(
			JSON.stringify(mappedArray)
				.slice(1, -1)
				.replace(/\[/g, "(")
				.replace(/]/g, ")")
				.replace(/"/g, "'")
		);

		res.json(Pt);
	}

	// static async postPt(req, res, next) {
	// 	let name = req.body.name;
	// 	let picture = req.body.picture;
	// 	let price = req.body.price;
	// 	let data = {
	// 		name: name,
	// 		picture: picture,
	// 		price: price,
	// 	};
	// 	let Products = await ProductModel.createProduct(data);
	// 	// res.render("Home", { data: Products });
	// 	if (Products) {
	// 		res.json({ message: "Product inserted" });
	// 	}
	// }

	// static async updateProduct(req, res, next) {
	// 	let id = req.params.id;
	// 	let name = req.body.name;
	// 	let picture = req.body.picture;
	// 	let price = req.body.price;
	// 	let data = {
	// 		name: name,
	// 		picture: picture,
	// 		price: price,
	// 	};
	// 	let Products = await ProductModel.updateProduct(id, data);
	// 	// res.render("Home", { data: Products });
	// 	if (Products) {
	// 		res.json({ message: "Product updated" });
	// 	}
	// }

	// static async deleteProduct(req, res, next) {
	// 	let id = req.params.id;
	// 	let Products = await ProductModel.deleteProduct(id);
	// 	// res.render("Home", { data: Products });
	// 	if (Products) {
	// 		res.json({ message: "Product deleted" });
	// 	}
	// }
}
