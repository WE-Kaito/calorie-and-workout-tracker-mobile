import React, {useContext} from 'react';
import { SvgXml } from 'react-native-svg';
import {ThemeContext} from "../src/themes";


const headingBackSVG = `<svg width="375" height="83" viewBox="0 0 375 83" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M817 -100.654C817 39.0741 617.033 82.9999 125.5 82.9999C-366.033 82.9999 734.112 -812.635 803.5 -734C803.5 -873.728 -366.033 -322.534 125.5 -322.534C617.033 -322.534 817 -240.382 817 -100.654Z"/>
</svg>
`;

const HeadingBack = () => {
    const { theme } = useContext(ThemeContext);
    return <SvgXml xml={headingBackSVG} width="375" height="375" fill={theme.secondary} />;
};

export default HeadingBack;