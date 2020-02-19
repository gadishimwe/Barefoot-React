/* eslint-disable no-undef */
import React from 'react';
import { Helmet } from 'react-helmet';

const Page = props => {
	const { title, children, ...rest } = props;

	return (
		<div {...rest}>
			<Helmet>
				<title>{title}</title>
			</Helmet>
			{children}
		</div>
	);
};

export default Page;
