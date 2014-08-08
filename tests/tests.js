/*global require, casper, CanvasToVideo*/

require('../CanvasToVideo');

casper.test.info('CanvasToVideo');

casper.test.begin('CanvasToVideo object creation', function suite(test) {

    'use strict';

    var ctv = new CanvasToVideo('capture.php', document.createElement('canvas'));

    test.assertEquals(ctv.url, 'capture.php', 'URL property was set correctly.');
    test.assertEquals(ctv.canvas.nodeName, 'CANVAS', 'Canvas property was set correctly.');

    test.assertEquals(ctv.imageType, 'image/png', 'Default image type.');
    test.assertEquals(ctv.imageQuality, 100, 'Default image quality.');

    test.assertEquals(ctv.cache, [], 'Empty cache.');
    test.assertEquals(ctv.cacheEnabled, false, 'Cache disabled.');

    try {

        ctv = new CanvasToVideo('capture.php', document.createElement('span'));

        test.fail('Span was recognized by CanvasToVideo as a valid canvas tag.');

    } catch (e) { test.pass('Canvas property was not set with a span tag.'); }

    test.done();

});

casper.test.begin('CanvasToVideo.setCanvas', function suite(test) {

    'use strict';

    var ctv = new CanvasToVideo('capture.php', document.createElement('canvas'));

    try {

        ctv.setCanvas(document.createElement('span'));

        test.fail('Span was recognized by CanvasToVideo as a valid canvas tag.');

    } catch (e) { test.pass('Canvas property was not set with a span tag.'); }

    try {

        ctv.setCanvas(document.createElement('canvas'));

        test.pass('Canvas was recognized by CanvasToVideo as a valid canvas tag.');

    } catch (e) { test.fail('Canvas property was not set with a span tag.'); }

    test.done();

});

casper.test.begin('CanvasToVideo.setCacheEnabled', function suite(test) {

    'use strict';

    var ctv = new CanvasToVideo('capture.php', document.createElement('canvas'));

    ctv.setCacheEnabled(true);

    test.assertTruthy(ctv.cacheEnabled, 'Caching was enabled.');

    ctv.setCacheEnabled(false);

    test.assertFalsy(ctv.cacheEnabled, 'Caching was disabled.');

    test.done();

});

casper.test.begin('CanvasToVideo.setEndpoint', function suite(test) {

    'use strict';

    var ctv = new CanvasToVideo('capture.php', document.createElement('canvas'));

    ctv.setEndpoint('different_capture_url.php');

    test.assertEquals(ctv.url, 'different_capture_url.php', 'Endpoint was set.');

    test.done();

});

casper.test.begin('CanvasToVideo.setImageType', function suite(test) {

    'use strict';

    var ctv = new CanvasToVideo('capture.php', document.createElement('canvas'));

    ctv.setImageType('image/jpeg');

    test.assertEquals(ctv.imageType, 'image/jpeg', 'Image type was properly set.');

    ctv.setImageType('image/png');

    test.assertEquals(ctv.imageType, 'image/png', 'Image type was properly set.');

    try {

        ctv.setImageType('image/jpg');

        test.fail('image/jpg was recognized by CanvasToVideo.setImageType as a valid image type.');

    } catch (e) { test.pass('Image type property was not set with an invalid type.'); }

    test.done();

});

casper.test.begin('CanvasToVideo.setImageQuality', function suite(test) {

    'use strict';

    var ctv = new CanvasToVideo('capture.php', document.createElement('canvas'));

    ctv.setImageQuality(0);

    test.assertEquals(ctv.imageQuality, 0, 'Image quality was properly set.');

    ctv.setImageQuality(100);

    test.assertEquals(ctv.imageQuality, 100, 'Image quality was properly set.');

    try {

        ctv.setImageQuality(200);

        test.fail('200 was recognized by CanvasToVideo.setImageQuality as a valid image quality.');

    } catch (e) { test.pass('Image quality property was not set with an invalid quality.'); }

    test.done();

});
