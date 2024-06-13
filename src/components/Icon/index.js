import React from 'react';
import * as IconMap from 'images';
import { classes } from 'common/utils';

function Icon({ iconKey, iconUrl}) {
    return(<img 
            className={classes('Icon icon',iconKey)} 
            src={iconUrl || IconMap[iconKey]}
            draggable="false"
           /> 
        )
}


export default React.memo(Icon);