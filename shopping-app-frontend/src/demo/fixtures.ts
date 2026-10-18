// Fictional sample data for the backend-free demo. Nothing here refers to a
// real shop, person or service.
import { Category } from "@/types";

export const demoCategories: Category[] = [
	{ id: 1, name: "Dairy" },
	{ id: 2, name: "Bakery" },
	{ id: 3, name: "Fruits & Vegetables" },
	{ id: 4, name: "Pantry" },
];

export type ArtKind =
	| "milk"
	| "cheese"
	| "yogurt"
	| "bread"
	| "croissant"
	| "apple"
	| "carrot"
	| "pasta"
	| "jar";

export interface DemoCatalogItem {
	name: string;
	category: string;
	detail: string;
	art: ArtKind;
	color: string;
}

export const demoCatalog: DemoCatalogItem[] = [
	{ name: "Whole Milk", category: "Dairy", detail: "1 L carton", art: "milk", color: "#4f7cac" },
	{ name: "Aged Cheddar", category: "Dairy", detail: "200 g block", art: "cheese", color: "#d9a43b" },
	{ name: "Greek Yogurt", category: "Dairy", detail: "500 g tub", art: "yogurt", color: "#7aa6c2" },
	{ name: "Sourdough Loaf", category: "Bakery", detail: "800 g", art: "bread", color: "#b9773c" },
	{ name: "Butter Croissant", category: "Bakery", detail: "Pack of 4", art: "croissant", color: "#c98a3e" },
	{ name: "Red Apples", category: "Fruits & Vegetables", detail: "1 kg bag", art: "apple", color: "#c0453a" },
	{ name: "Carrots", category: "Fruits & Vegetables", detail: "500 g bunch", art: "carrot", color: "#e07b2a" },
	{ name: "Penne Pasta", category: "Pantry", detail: "500 g box", art: "pasta", color: "#a88a3d" },
	{ name: "Strawberry Jam", category: "Pantry", detail: "340 g jar", art: "jar", color: "#b4325a" },
];
