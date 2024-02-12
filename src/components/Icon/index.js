import React from 'react';
import * as IconMap from 'images';
import { classes } from 'common/utils';

function Icon({ iconKey, iconUrl}) {
    return ( <div className={classes('Icon icon',iconKey)} style={{ backgroundImage: `url(${iconUrl || IconMap[iconKey]})` }}></div> )
}


export default React.memo(Icon);