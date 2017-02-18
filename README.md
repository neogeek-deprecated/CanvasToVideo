#CanvasToVideo

> An experiment in converting Canvas animations to video.

[![](https://david-dm.org/neogeek/CanvasToVideo/dev-status.svg)](https://david-dm.org/neogeek/CanvasToVideo#info=devDependencies)
[![](http://doxdox.org/images/badge-flat.svg)](http://doxdox.org/neogeek-deprecated/CanvasToVideo)

##Documentation

[Read Online](http://doxdox.org/neogeek-deprecated/CanvasToVideo)

##Setup

```javascript
var ctv = new CanvasToVideo('capture.php', document.querySelector('canvas'));

ctv.setCacheEnabled(true); // Storing frames locally instead of sending every frame.
ctv.setImageQuality(60); // Changing the quality to 60%

function draw () {
    // draw objects to canvas
    ctv.capture();
    if (!animation.finished) {
        requestAnimationFrame(draw);
    } else {
        ctv.flush(); // Send all frames at once to the server.
    }
}
requestAnimationFrame(draw);
```

##Converting to Movie

```bash
$ ffmpeg -i captured/screenshot_%06d.png -c:v libx264 -vf "fps=30,format=yuv420p,setpts=(1/2.5)*PTS" output.mp4
```
