import React from 'react';
import AccommodationComponent from '../components/accommodation/create/Accommodation';

const AccommodationsView = props => {
	const { userRole } = props;
	return (
		<>
			{userRole === 'travel_team_member' ||
				(userRole === 'travel_admin' && <AccommodationComponent />)}
		</>
	);
};
export default AccommodationsView;
