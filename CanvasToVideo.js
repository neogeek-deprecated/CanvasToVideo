/*!
 * CanvasToVideo v0.1.0beta
 * https://github.com/neogeek/CanvasToVideo
 *
 * Copyright (c) 2014 Scott Doxey
 */

(function () {

    'use strict';

    /**
     * Sends a PUT request to a URL with the specified data and fires a callback upon completion.
     *
     *     putRequest('capture.php', [], function() { alert('Done!'); });
     *
     * @param {String} url The URL for the PUT request.
     * @param {Object} data The data to send.
     * @param {Function?} callback The callback function to call once the request has completed.
     * @return {void}
     * @api private
     */

    function putRequest(url, data, callback) {

        var http = new window.XMLHttpRequest();

        http.open('put', url);

        if (Object.prototype.toString.call(data) === '[object Array]') {

            data = JSON.stringify(data);

        }

        if (String(typeof callback) === 'function') {

            http.addEventListener('readystatechange', function () {

                if (this.readyState === 4 && this.status === 204) {

                    callback.call(this);

                }

            });

        }

        http.send(data);

    }

    /**
     * Creates a new CanvasToVideo object.
     *
     *     var ctv = new CanvasToVideo('capture.php', document.querySelector('canvas'));
     *
     * @param {String} url The URL for all PUT requests.
     * @param {Object} canvas The canvas to capture frames from.
     * @return {Object} New CanvasToVideo object.
     * @api public
     */

    var CanvasToVideo = function (url, canvas) {

        this.url = url;
        this.canvas = canvas;

        this.imageType = 'image/png';
        this.imageQuality = 100;

        this.cache = [];
        this.cacheEnabled = false;

        try {

            this.canvas.getContext('2d');

        } catch (e) {

            this.canvas = null;

            throw new Error('Element passed to CanvasToVideo was not a valid canvas element.');

        }

    };

    /**
     * Method called after canvas drawing has occured to capture frame and either send to server or store in local temporary cache.
     *
     *     function draw () {
     *         // draw objects to canvas
     *         ctv.capture();
     *         requestAnimationFrame(draw);
     *     }
     *     requestAnimationFrame(draw);
     *
     * @return {void}
     * @api public
     */

    CanvasToVideo.prototype.capture  = function () {

        var data;

        if (this.canvas) {

            data = this.canvas.toDataURL(this.imageType, this.imageQuality).replace(/^[\W\w]*,/, '');

            if (this.cacheEnabled) {

                this.cache.push(data);

            } else {

                putRequest(this.url, [data]);

            }

        }

    };

    /**
     * Called once animation is complete to send all cached images to the server through the specified URL.
     *
     *     ctv.flush();
     *
     * @return {void}
     * @api public
     */

    CanvasToVideo.prototype.flush  = function () {

        if (this.cacheEnabled) {

            putRequest(this.url, this.cache, function () {

                this.cache = [];

            });

        }

    };

    /**
     * Sets a new canvas tag once the CanvasToVideo object has already been created.
     *
     *     ctv.setCanvas(document.querySelector('.stage'));
     *
     * @param {Object} canvas The canvas to capture frames from.
     * @return {void}
     * @api public
     */

    CanvasToVideo.prototype.setCanvas = function (canvas) {

        this.canvas = canvas;

        try {

            this.canvas.getContext('2d');

        } catch (e) {

            this.canvas = null;

            throw new Error('Element passed to CanvasToVideo.setCanvas was not a valid canvas element.');

        }

    };

    /**
     * Sets if caching is enabled or not.
     *
     *     ctv.setCacheEnabled(true); // Caching enabled.
     *     ctv.setCacheEnabled(false); // Caching disabled.
     *
     * @param {Boolean} enabled Boolean flag for enabling cache.
     * @return {void}
     * @api public
     */

    CanvasToVideo.prototype.setCacheEnabled = function (enabled) {

        if (enabled) {

            this.cacheEnabled = true;

        } else {

            this.cacheEnabled = false;

        }

    };

    /**
     * Sets a new URL for sending all PUT requests.
     *
     *     ctv.setEndpoint('different_capture_url.php');
     *
     * @param {String} url The new URL for all PUT requests.
     * @return {void}
     * @api public
     */

    CanvasToVideo.prototype.setEndpoint  = function (url) {

        this.url = url;

    };

    /**
     * Sets the image type saved from the canvas. Can be either image/png or image/jpeg.
     *
     *     ctv.setImageType('image/png');
     *     ctv.setImageType('image/jpeg');
     *
     * @param {String} type The type of image to be captured from the canvas.
     * @return {void}
     * @api public
     */

    CanvasToVideo.prototype.setImageType  = function (type) {

        if (type.match(/image\/(png|jpeg)/)) {

            this.imageType = type;

        } else {

            throw new Error(type + ' is not a valid image type. The valid types are: image/png and image/jpeg.');

        }

    };

    /**
     * Sets the image quality saved from the canvas. Must be an integer between 0 and 100.
     *
     *     ctv.setImageQuality(60);
     *
     * @param {Integer} type Number between 0 and 100 specifying the quality.
     * @return {void}
     * @api public
     */

    CanvasToVideo.prototype.setImageQuality  = function (quality) {

        if (String(typeof quality) === 'number') {

            this.imageQuality = quality;

        } else {

            throw new Error(quality + ' is not a valid number. Must be a number between 0 (lowest quality) and 100 (highest quality).');

        }

    };

    /*!
     * AMD Support
     */

    if (String(typeof window.define) === 'function' && window.define.hasOwnProperty('amd')) {

        window.define([], function () { return CanvasToVideo; });

    } else {

        window.CanvasToVideo = CanvasToVideo;

    }

}());
