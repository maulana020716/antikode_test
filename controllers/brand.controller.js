import BrandModel from "../models/brand.model.js";

export default class BrandController {
	static async getBrands(req, res, next) {
		let brands = await BrandModel.getBrands();
		// res.render("Home", { data: outlets });
		res.json(brands);
	}

	static async getBrandById(req, res, next) {
		let brand = await BrandModel.getBrandById(req.params.id);
		// res.render("Home", { data: outlets });
		res.json(brand);
	}

	static async createBrand(req, res, next) {
		let name = req.body.name;
		let logo = req.body.logo;
		let banner = req.body.banner;
		let data = {
			name: name,
			logo: logo,
			banner: banner,
		};
		let outlets = await BrandModel.createBrand(data);
		// res.render("Home", { data: outlets });
		if (outlets) {
			res.json({ message: "Brand inserted" });
		}
	}

	static async updateBrand(req, res, next) {
		let id = req.params.id;
		let name = req.body.name;
		let logo = req.body.logo;
		let banner = req.body.banner;
		let data = {
			name: name,
			logo: logo,
			banner: banner,
		};
		let Brands = await BrandModel.updateBrand(id, data);
		// res.render("Home", { data: Brands });
		if (Brands) {
			res.json({ message: "Brand updated" });
		}
	}

	static async deleteBrand(req, res, next) {
		let id = req.params.id;
		let brand = await BrandModel.deleteBrand(id);
		// res.render("Home", { data: brand });
		if (brand) {
			res.json({ message: "Outlet deleted" });
		}
	}
}
