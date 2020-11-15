
import marked from 'marked';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

function getCss(theme: string, fontSize: string) {
    let foreground = 'black';

    if (theme === 'dark') {
        foreground = 'white';
    }
    return `
    body {
        background-image: url('https://yoshidev-media-images.s3.ap-northeast-1.amazonaws.com/ogp_d289de82e8.png');
        background-position: center;
        background-size: contain;
        text-align: center;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    code {
        color: #D400FF;
        font-family: 'Vera';
        white-space: pre-wrap;
        letter-spacing: -5px;
    }

    code:before, code:after {
        content: '\`';
    }

    .logo-wrapper {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        justify-items: center;
    }

    .logo {
        margin: 0 75px;
    }


    .spacer {
        margin: 150px;
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }
    
    .heading {
        font-family: YakuHanJP, 'Montserrat',  'M PLUS 1p', sans-serif;
        font-size: ${sanitizeHtml(fontSize)};
        font-style: normal;
        color: ${foreground};
        line-height: 1.8;
    }`;
}

export function getHtml(parsedReq: ParsedRequest) {
    const { text, theme, md, fontSize, category } = parsedReq;
    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/yakuhanjp@3.3.1/dist/css/yakuhanjp.min.css"/>
    <link href="https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@100;300;400;500;700;800;900&family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>

    <style>
        ${getCss(theme, fontSize)}
    </style>
    <body>
        <div>
            <div class="spacer">
            <div class="logo-wrapper">
                ${getImage(getImageSrc(category))}
            </div>
            <div class="spacer">
            <div class="heading">${emojify(
                md ? marked(text) : sanitizeHtml(text)
            )}
            </div>
        </div>
    </body>
</html>`;
}

function getImage(src: string, width ='auto', height = '225') {
    return `<img
        class="logo"
        alt="Generated Image"
        src="${sanitizeHtml(src)}"
        width="${sanitizeHtml(width)}"
        height="${sanitizeHtml(height)}"
    />`
}

function getImageSrc(category: string): string {
    switch (category) {
        case "web-develop":
            return 'https://yoshidev-media-images.s3.ap-northeast-1.amazonaws.com/web_develop_f5adda320b.svg'
        case "web-design":
            return 'https://yoshidev-media-images.s3.ap-northeast-1.amazonaws.com/web_design_318373bcf7.svg'
        case "product":
            return 'https://yoshidev-media-images.s3.ap-northeast-1.amazonaws.com/product_3e1a0226df.svg'
        case "daily":
            return 'https://yoshidev-media-images.s3.ap-northeast-1.amazonaws.com/daily_1eef885c36.svg'
        default:
            return 'https://yoshidev-media-images.s3.ap-northeast-1.amazonaws.com/web_develop_f5adda320b.svg'

    }
}
