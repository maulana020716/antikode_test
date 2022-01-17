import OutletModel from "../models/outlet.model.js";

export default class OutletController {
	static async getOutlets(req, res, next) {
		let outlets = await OutletModel.getOutlets();
		// res.render("Home", { data: outlets });
		res.json(outlets);
	}

	static async getOutletById(req, res, next) {
		let outlets = await OutletModel.getOutletById(req.params.id);
		// res.render("Home", { data: outlets });
		res.json(outlets);
	}

	static async createOutlet(req, res, next) {
		let name = req.body.name;
		let picture = req.body.picture;
		let address = req.body.address;
		let latitude = req.body.latitude;
		let longitude = req.body.longitude;
		let data = {
			name: name,
			picture: picture,
			address: address,
			latitude: latitude,
			longitude: longitude,
		};
		let outlets = await OutletModel.createOutlet(data);
		// res.render("Home", { data: outlets });
		if (outlets) {
			res.json({ message: "Outlet inserted" });
		}
	}

	static async updateOutlet(req, res, next) {
		let id = req.params.id;
		let name = req.body.name;
		let picture = req.body.picture;
		let address = req.body.address;
		let latitude = req.body.latitude;
		let longitude = req.body.longitude;
		let data = {
			name: name,
			picture: picture,
			address: address,
			latitude: latitude,
			longitude: longitude,
		};
		let outlets = await OutletModel.updateOutlet(id, data);
		// res.render("Home", { data: outlets });
		if (outlets) {
			res.json({ message: "Outlet updated" });
		}
	}

	static async deleteOutlet(req, res, next) {
		let id = req.params.id;
		let outlets = await OutletModel.deleteOutlet(id);
		// res.render("Home", { data: outlets });
		if (outlets) {
			res.json({ message: "Outlet deleted" });
		}
	}
}
