import ProductModel from "../models/product.model.js";

export default class ProductController {
	static async getProducts(req, res, next) {
		let Products = await ProductModel.getProducts();
		// res.render("Home", { data: Products });
		res.json(Products);
	}

	static async getProductById(req, res, next) {
		let Products = await ProductModel.getProductById(req.params.id);
		// res.render("Home", { data: Products });
		res.json(Products);
	}

	static async createProduct(req, res, next) {
		let name = req.body.name;
		let picture = req.body.picture;
		let price = req.body.price;
		let data = {
			name: name,
			picture: picture,
			price: price,
		};
		let Products = await ProductModel.createProduct(data);
		// res.render("Home", { data: Products });
		if (Products) {
			res.json({ message: "Product inserted" });
		}
	}

	static async updateProduct(req, res, next) {
		let id = req.params.id;
		let name = req.body.name;
		let picture = req.body.picture;
		let price = req.body.price;
		let data = {
			name: name,
			picture: picture,
			price: price,
		};
		let Products = await ProductModel.updateProduct(id, data);
		// res.render("Home", { data: Products });
		if (Products) {
			res.json({ message: "Product updated" });
		}
	}

	static async deleteProduct(req, res, next) {
		let id = req.params.id;
		let Products = await ProductModel.deleteProduct(id);
		// res.render("Home", { data: Products });
		if (Products) {
			res.json({ message: "Product deleted" });
		}
	}
}
