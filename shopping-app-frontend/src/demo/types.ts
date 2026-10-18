import type React from "react";
import type { Product } from "@/store/productsSlice";

export interface PlacedDemoOrder {
	id: string;
	products: Product[];
}

export interface DemoEntry {
	DemoShell: React.FC<{ children: React.ReactNode }>;
	DemoCatalog: React.FC;
	DemoCheckoutNote: React.FC;
	DemoOrderPlaced: React.FC<{ order: PlacedDemoOrder; onDone: () => void }>;
}
