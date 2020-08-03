const colors = [
  "rgb(246,95,210)",
  "rgb(150,188,105)",
  "rgb(126,27,198)",
  "rgb(0,139,139)",
  "rgb(72,61,139)",
  "rgb(135,206,235)",
  "rgb(124,252,0)",
  "rgb(153,50,204)",
  "rgb(139,0,139)",
  "rgb(255,140,0)",
  "rgb(205,92,92)",
  "rgb(255,20,147)",
  "rgb(72,209,204)",
  "rgb(218,165,32)",
  "rgb(238,130,238)",
  "rgb(153,50,204)",
  "rgb(255,0,0)",
  "rgb(255,165,0)",
  "rgb(0,255,127)",
  "rgb(199,21,133)",
];

//helper function
function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end;
}

const onSelectColors = () => {
  const firstRandomIndex = Math.floor(Math.random() * 20);
  const secondRandomIndex = Math.floor(Math.random() * 20);

  document.getElementById(
    "content"
  ).style.background = `linear-gradient(90deg, ${colors[firstRandomIndex]} 0%, ${colors[secondRandomIndex]} 100%)`;

  // need to find a mid color to contrast against.
  // first get the red/green/blue values from the 2 chosen colors.
  const firstColorString = colors[firstRandomIndex];
  const firstColorsOnly = firstColorString
    .substring(
      firstColorString.indexOf("(") + 1,
      firstColorString.lastIndexOf(")")
    )
    .split(/,\s*/);
  const firstRed = firstColorsOnly[0];
  const firstGreen = firstColorsOnly[1];
  const firstBlue = firstColorsOnly[2];

  const secondColorString = colors[secondRandomIndex];
  const secondColorsOnly = secondColorString
    .substring(
      secondColorString.indexOf("(") + 1,
      secondColorString.lastIndexOf(")")
    )
    .split(/,\s*/);
  const secondRed = secondColorsOnly[0];
  const secondGreen = secondColorsOnly[1];
  const secondBlue = secondColorsOnly[2];
  // get the middle ground of each
  const midRed = lerp(firstRed, secondRed, 0.5);
  const midGreen = lerp(firstGreen, secondGreen, 0.5);
  const midBlue = lerp(firstBlue, secondBlue, 0.5);

  const midColorBrightness =
    (midRed * 299 + midGreen * 587 + midBlue * 114) / 1000;

  // the linked formula doesn't specify how to find a contrasting color/brightness, just how to find the brightness of a color.
  // so I'm going to assume using either black or white is good enough, where the biggest difference in brightness will be used.

  // black = 0, white = 255 therfore if brightness is >= 128 use black, else use white.
  if (midColorBrightness >= 128) {
    document.getElementById("content").style.color = "rgb(0,0,0)";
  } else {
    document.getElementById("content").style.color = "rgb(255,255,255)";
  }
};
