declare module "*.svg" {
    import React, { FC } from "react";
    import Svg, { SvgProps } from "react-native-svg";
    const content: FC<SvgProps>;
    export default content;
}