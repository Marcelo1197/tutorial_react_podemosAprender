import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import IconoCorazon from '@material-ui/icons/Favorite';
import IconoIdea from '@material-ui/icons/EmojiObjects';
import IconoCharlar from '@material-ui/icons/Forum';

import IconoNavAnterior from '@material-ui/icons/NavigateBefore';
import IconoNavProximo from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.type=='light' ? theme.palette.background.dark : theme.palette.background.light,
	},
}));

export default function NavAbajo(props) {
	const classes = useStyles();
	return (
		<BottomNavigation
			showLabels
			className={classes.root}
		>
			<BottomNavigationAction label="Anterior" icon={<IconoNavAnterior />} 
				onClick={() => props.onClick('anterior')}
			/>
			<BottomNavigationAction label="Reacción" icon={<IconoCorazon />} 
				onClick={() => props.onClick('reaccion')}
			/>
			<BottomNavigationAction label="Conversar" icon={<IconoCharlar />} 
				onClick={() => props.onClick('conversar')}
			/>
			<BottomNavigationAction label="Idea" icon={<IconoIdea />} 
				onClick={() => props.onClick('idea')}
			/>
			<BottomNavigationAction label="Próximo" icon={<IconoNavProximo />} 
				onClick={() => props.onClick('proximo')}
			/>
		</BottomNavigation>
	);
}

//VER: https://reactjs.org/docs/typechecking-with-proptypes.html
NavAbajo.propTypes= {
	onClick: PropTypes.func.isRequired
}
