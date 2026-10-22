import React from "react";
import type { PlacedDemoOrder } from "./types";
import styles from "./demo.module.css";

export const DemoCheckoutNote: React.FC = () => (
	<p className={styles.note}>
		This demo never asks for payment details. Use any made-up name and
		address; nothing is sent anywhere.
	</p>
);

export const DemoOrderPlaced: React.FC<{
	order: PlacedDemoOrder;
	onDone: () => void;
}> = ({ order, onDone }) => (
	<div className={styles.placed} role="status">
		<h1>Demo order placed, nothing was charged</h1>
		<p>
			Order {order.id} with {order.products.length}{" "}
			{order.products.length === 1 ? "item" : "items"} was recorded in this
			browser tab only.
		</p>
		<ul>
			{order.products.map((p) => (
				<li key={p.id}>
					{p.name} <span className={styles.cardMeta}>({p.category})</span>
				</li>
			))}
		</ul>
		<p>
			<button type="button" onClick={onDone}>
				Start a new demo order
			</button>
		</p>
	</div>
);
