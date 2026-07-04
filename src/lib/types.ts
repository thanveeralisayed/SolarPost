export interface SolarPost {
  id: number;
  dailyProduction: number;
  place: string;
  postDate: string;
  panelWattage: number;
  panelCount: number;
  createdAt: string;
}

export interface SolarPostFormData {
  dailyProduction: number;
  place: string;
  postDate: string;
  panelWattage: number;
  panelCount: number;
}

export interface SolarPostWithCalculations extends SolarPost {
  totalCapacityKwp: number;
  specificYield: number;
}
