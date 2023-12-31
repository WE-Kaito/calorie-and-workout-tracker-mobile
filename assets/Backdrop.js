import React, {useContext} from 'react';
import { SvgXml } from 'react-native-svg';
import {ThemeContext} from "../src/themes";
import {View} from "react-native";


const backdropSVG = `<svg width="375" height="459" viewBox="0 0 375 459" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_i_2_87)">
<path d="M598.007 545.792C448.143 608.33 284.902 631.917 123.477 614.359C-37.9484 596.801 -192.31 538.668 -325.241 445.371L-13.4681 0.690923C44.4834 41.364 111.778 66.7072 182.151 74.3617C252.524 82.0161 323.69 71.7331 389.023 44.4696L598.007 545.792Z"/>
</g>
<defs>
<filter id="filter0_i_2_87" x="-327.241" y="0.690926" width="925.248" height="623.309" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="-2" dy="4"/>
<feGaussianBlur stdDeviation="7.5"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow_2_87"/>
</filter>
</defs>
</svg>`;

const Backdrop = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <View style={styles.backdrop} pointerEvents="box-none">
                <SvgXml style={styles.shadow} xml={backdropSVG} width="400" height="600" fill={theme.secondary} />

        </View>
    );
};

const styles = {
    backdrop: {
        position: 'absolute',
        bottom: -50, // Adjust this value to move the backdrop vertically
        left: 0, // Adjust this value to move the backdrop horizontally
    },
    shadow: {
        boxShadow: 'inset 0px 0px 10px 2px rgba(0, 0, 0, 0.5)',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: -2, // Adjust this value to control the shadow's vertical position
        },
        shadowOpacity: 0.6,
        shadowRadius: 4,
        elevation: 500,
    },
};

export default Backdrop;