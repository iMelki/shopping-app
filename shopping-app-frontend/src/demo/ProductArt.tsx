// Hand-drawn inline SVG product art for the demo: generated in code, bundled,
// and never loaded from another host.
import React from "react";
import { ArtKind } from "./fixtures";

const ink = "#2b2b2b";

function Shape({ art, color }: { art: ArtKind; color: string }) {
	switch (art) {
		case "milk":
			return (
				<g stroke={ink} strokeWidth="2.5" strokeLinejoin="round">
					<path d="M46 34 L58 22 H72 L84 34 V78 H46 Z" fill="#fff" />
					<path d="M58 22 L64 34 H84" fill="none" />
					<path d="M46 34 H64 V78" fill="none" />
					<rect x="66" y="46" width="14" height="18" rx="3" fill={color} />
				</g>
			);
		case "cheese":
			return (
				<g stroke={ink} strokeWidth="2.5" strokeLinejoin="round">
					<path d="M30 70 L90 70 L90 48 L30 40 Z" fill={color} />
					<path d="M30 40 L66 28 L90 48" fill="#f3d27a" />
					<circle cx="48" cy="58" r="4" fill="#f3d27a" />
					<circle cx="70" cy="62" r="3" fill="#f3d27a" />
					<circle cx="78" cy="54" r="2.5" fill="#f3d27a" />
				</g>
			);
		case "yogurt":
			return (
				<g stroke={ink} strokeWidth="2.5" strokeLinejoin="round">
					<path d="M38 36 H82 L76 76 H44 Z" fill="#fff" />
					<rect x="35" y="28" width="50" height="9" rx="3" fill={color} />
					<path d="M44 52 Q60 44 76 52" fill="none" stroke={color} />
				</g>
			);
		case "bread":
			return (
				<g stroke={ink} strokeWidth="2.5" strokeLinejoin="round">
					<path
						d="M28 66 Q26 36 60 34 Q94 36 92 66 Q92 74 84 74 H36 Q28 74 28 66 Z"
						fill={color}
					/>
					<path d="M46 46 L52 56 M60 44 L66 54 M74 46 L80 56" fill="none" stroke="#f1d6a8" />
				</g>
			);
		case "croissant":
			return (
				<g stroke={ink} strokeWidth="2.5" strokeLinejoin="round">
					<path d="M26 64 Q40 30 60 30 Q80 30 94 64 Q78 56 60 58 Q42 56 26 64 Z" fill={color} />
					<path d="M46 36 Q50 48 48 57 M60 31 V58 M74 36 Q70 48 72 57" fill="none" />
				</g>
			);
		case "apple":
			return (
				<g stroke={ink} strokeWidth="2.5" strokeLinejoin="round">
					<path
						d="M60 38 Q44 28 36 42 Q28 58 40 72 Q50 82 60 74 Q70 82 80 72 Q92 58 84 42 Q76 28 60 38 Z"
						fill={color}
					/>
					<path d="M60 38 Q60 28 66 22" fill="none" />
					<path d="M64 28 Q74 20 80 28 Q72 34 64 28 Z" fill="#5c9a4b" />
				</g>
			);
		case "carrot":
			return (
				<g stroke={ink} strokeWidth="2.5" strokeLinejoin="round">
					<path d="M44 36 L76 36 L60 82 Z" fill={color} />
					<path d="M50 48 H56 M62 58 H68 M54 66 H58" fill="none" />
					<path d="M60 36 Q52 22 46 20 M60 36 Q60 20 60 16 M60 36 Q68 22 74 20" fill="none" stroke="#5c9a4b" strokeWidth="4" />
				</g>
			);
		case "pasta":
			return (
				<g stroke={ink} strokeWidth="2.5" strokeLinejoin="round">
					<rect x="36" y="26" width="48" height="52" rx="4" fill={color} />
					<rect x="44" y="40" width="32" height="22" rx="3" fill="#fff" />
					<path d="M50 56 L56 46 M58 56 L64 46 M66 56 L72 46" fill="none" stroke="#d9a43b" strokeWidth="4" />
				</g>
			);
		case "jar":
			return (
				<g stroke={ink} strokeWidth="2.5" strokeLinejoin="round">
					<rect x="40" y="36" width="40" height="42" rx="8" fill={color} />
					<rect x="42" y="26" width="36" height="10" rx="3" fill="#e9e2d0" />
					<rect x="48" y="48" width="24" height="16" rx="3" fill="#fff" />
				</g>
			);
		default:
			return null;
	}
}

const ProductArt: React.FC<{ art: ArtKind; color: string; label: string }> = ({
	art,
	color,
	label,
}) => (
	<svg viewBox="0 0 120 96" role="img" aria-label={label} width="100%" height="100%">
		<rect width="120" height="96" rx="10" fill={`${color}22`} />
		<Shape art={art} color={color} />
	</svg>
);

export default ProductArt;
