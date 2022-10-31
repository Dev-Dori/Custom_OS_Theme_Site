import React from 'react'
import * as IconMap from 'images/Icon';

function Icon({ iconKey, iconUrl}) {
    const classes = (...classes) => classes.filter(v => v).join(' ');
    return (
        <div className={classes('Icon icon',iconKey)} style={{ backgroundImage: `url(${iconUrl || IconMap[iconKey]})` }}>
        </div>
    )
}


export default Icon;