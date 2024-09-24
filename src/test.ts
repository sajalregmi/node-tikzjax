import tex2svg from './index';


async function testInvalidLaTeX() {
    // Define invalid LaTeX code (e.g., missing \end{document})
    const code = `
\\usepackage{circuitikz}
\\begin{document}

\\begin{circuitikz}[american, voltage shift=0.5]
\\draw (0,0)
to[isource, l=$I_0$, v=$V_0$] (0,3)
to[short, -*, i=$I_0$] (2,3)
to[R=$R_1$, i>_=$i_1$] (2,0) -- (0,0);
\\draw (2,3) -- (4,3)
to[R=$R_2$, i>_=$i_2$]
(4,0) to[short, -*] (2,0);
\\end{circuitikz}

\\end{document}
    `;
  
    try {
        const options = {
            showConsole: true,
            throwOnError: true,
            texPackages: {
              amsmath: 'intlimits',
              tikz: ''
            },
            tikzLibraries: [
              'arrows.meta', 'calc', 'positioning', 'shapes', 'decorations.pathmorphing',
              'decorations.markings', 'trees', 'matrix', 'chains', 'backgrounds',
              'patterns', 'plotmarks', '3d', 'datavisualization', 'circuits.ee.IEC',
              'circuits.logic', 'mindmap', 'shadows', 'fit', 'angles', 'spy'
            ].join(','),
            // Adding custom TikZ styles
            tikzStyles: `
              startstop/.style={rectangle, rounded corners, minimum width=3cm, minimum height=1cm, text centered, draw=black, fill=red!30},
              process/.style={rectangle, minimum width=3cm, minimum height=1cm, text centered, draw=black, fill=orange!30},
              arrow/.style={->, thick}
            `
          };
          
          const svg = await tex2svg(code,options);
      console.log("Generated svg:", svg);
    } catch (error: any) {
      console.error("Conversion Error:", error.message);
    }
  }

  testInvalidLaTeX();
  
