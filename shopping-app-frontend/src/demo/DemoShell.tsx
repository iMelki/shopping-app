import React from "react";
import Head from "next/head";
import { installDemoAdapter } from "./adapter";
import styles from "./demo.module.css";

// Runs when the demo bundle loads, before any page fetches data.
installDemoAdapter();

const DemoShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
	<div className={styles.shell}>
		<Head>
			<title>Shopping App Demo</title>
			<meta name="robots" content="noindex" />
		</Head>
		<div className={styles.banner} role="status">
			Demo with sample data. Changes stay in your browser.
		</div>
		<div className={styles.content}>{children}</div>
	</div>
);

export default DemoShell;
