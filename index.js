const inquirer = require('inquirer');
const svgdom = require('svgdom');
const fs = require('fs');
const { SVG } = require('@svgdotjs/svg.js');

function createSVG() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'logoText',
          message: 'Enter up to three characters:',
        },
        {
          type: 'input',
          name: 'textColor',
          message: 'Enter name of color or color code:',
          default: '#000000',
        },
        {
          type: 'list',
          name: 'shape',
          message: 'Choose a shape:',
          choices: ['circle', 'triangle', 'square'],
        },
        {
          type: 'input',
          name: 'shapeColor',
          message: 'Enter name of color or color code:',
          default: '#ffffff',
        },
      ])
      .then((responses) => {
        const svgWindow = svgdom.createSVGWindow();
        const document = svgWindow.document;
        let svgString;
            svgString= '<svg width="300" height="200">';
            svgString+='<g>';
            svgString+=`${responses.shape}`;
          //const SVG = require('@svgdotjs/svg.js');
         // svg = SVG(document.documentElement);
          //svg.viewbox(0, 0, 300, 200);
  
          if (responses.shape === 'circle') {
            //svg.circle(100).fill(responses.shapeColor);
            svgString+=`<circle cx="125" cy="125" r="50" fill="${responses.shapeColor}"/>`;
          } else if (responses.shape === 'triangle') {
            //svg.polygon('0,50 25,0 100,100').fill(responses.shapeColor);
            svgString+=`<polygon points="0,100 50,0 100,100" fill="${responses.shapeColor}"/>`;
          } else if (responses.shape === 'square') {
            //svg.rect(100, 100).fill(responses.shapeColor);
            svgString+=`<rect x="70" y="40" width="100" height="100" fill="${responses.shapeColor}"/>`;
          }
  
          //svg.text(responses.logoText).fill(responses.textColor);
  
          //const SVGfinished = svg.svg();

          svgString+=`<text x="100" y="130" font-size="30" fill="${responses.textColor}">${responses.logoText}</text>`;

          svgString+=`</g>`;
          svgString+=`</svg>`;



          fs.writeFile('logo.svg', svgString, (error) => {
            if (error) {
              throw error;
            }
            console.log('File saved!');
          });

      })
      .catch((error) => {
        console.log(error);
      });
  }
  

function init() {
  createSVG();
}

init();
