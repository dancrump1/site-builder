<?php

use craft\helpers\App;

return [
    'useDevServer' => App::env('USE_VITE_DEV_SERVER'),
    'manifestPath' => '@webroot/dist/manifest.json',
    'devServerPublic' => App::env('PRIMARY_SITE_URL') . ':3000',
    'serverPublic' => '/dist/',
    'errorEntry' => 'src/js/app.ts',
    'cacheKeySuffix' => '',
    'devServerInternal' => '',
    'checkDevServer' => false,
    'includeReactRefreshShim' => true,
    'includeModulePreloadShim' => true,
    'criticalPath' => '@webroot/dist/criticalcss',
    'criticalSuffix' =>'_critical.min.css',
];
