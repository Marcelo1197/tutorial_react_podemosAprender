//INFO: un link del Router pero con la visual de MaterialUI

//VER: https://material-ui.com/guides/composition/#link

import React from 'react';
import { Link as RouterLink} from 'react-router-dom';
import LinkMUI from '@material-ui/core/Link';

export default function Link(props) {
	return <LinkMUI component={RouterLink} {...props} />
}


