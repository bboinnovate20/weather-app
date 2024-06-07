import { API_KEY, weatherAPI } from "@/constants/_apiKey";
import * as Location from "expo-location";

export class UserLocation {
	constructor() {
		this.initiateLocation();
	}
	async initiateLocation() {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== "granted") {
			return false;
		}
		return true;
	}

	async getCurrentLocation() {
		const checkLocationPermitted = await this.initiateLocation();
		if (checkLocationPermitted) {
			let location = await Location.getCurrentPositionAsync({});
    
			return [
				true,
				{
					longitude: location["coords"]["longitude"],
					latitude: location["coords"]["latitude"],
				},
			];
		}
		return [false, null];
	}
}