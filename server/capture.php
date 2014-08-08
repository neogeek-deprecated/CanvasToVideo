<?php

if (!is_dir('captured/')) {

    mkdir('captured/', 0777);

}

$preexisting_files = preg_split('/\n+/', shell_exec('find . -type f -name "screenshot_*.png"'), null, PREG_SPLIT_NO_EMPTY);

preg_match('/[0-9]+/', end($preexisting_files), $matches);

if ($matches) {

    $primary_key_offset = (int)$matches[0];

} else {

    $primary_key_offset = 0;

}

$filename_template = 'captured/screenshot_%06d.png';

$images = json_decode(file_get_contents('php://input'));

if (count($images)) {

    foreach ($images as $key => $image) {

        file_put_contents(sprintf($filename_template, $primary_key_offset + $key + 1), base64_decode($image));

    }

    if (!headers_sent()) {

        header('HTTP/1.1 204 No Content');

    }

}
