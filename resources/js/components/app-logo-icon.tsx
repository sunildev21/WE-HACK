import { ImgHTMLAttributes } from 'react';
const logo = '/image/logo.png';
export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
       <img
       {...props}
       src={logo}
       alt="App logo"
       width={props.width || 45}
       height={props.height || 42}
       />
    );
}
