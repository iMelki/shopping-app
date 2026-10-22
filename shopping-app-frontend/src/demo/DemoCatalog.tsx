import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "@/store";
import { addProduct } from "@/store/productsSlice";
import { demoCatalog } from "./fixtures";
import ProductArt from "./ProductArt";
import styles from "./demo.module.css";

const DemoCatalog: React.FC = () => {
	const dispatch = useAppDispatch();
	const selected = useAppSelector((state) => state.products.selectedProducts);

	return (
		<section aria-label="Sample products">
			<p className={styles.catalogIntro}>
				Pick sample products, or add your own below.
			</p>
			<div className={styles.grid}>
				{demoCatalog.map((item) => {
					const count = selected.filter(
						(p) => p.name === item.name && p.category === item.category
					).length;
					return (
						<div className={styles.card} key={item.name}>
							<div className={styles.art}>
								<ProductArt art={item.art} color={item.color} label={item.name} />
							</div>
							<div className={styles.cardName}>{item.name}</div>
							<div className={styles.cardMeta}>
								{item.category} · {item.detail}
							</div>
							<div className={styles.cardRow}>
								<span className={styles.inCart}>
									{count > 0 ? `In cart: ${count}` : ""}
								</span>
								<button
									type="button"
									aria-label={`Add ${item.name}`}
									onClick={() =>
										dispatch(
											addProduct({
												product: {
													id: uuidv4(),
													name: item.name,
													category: item.category,
												},
											})
										)
									}
								>
									Add
								</button>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
};

export default DemoCatalog;
