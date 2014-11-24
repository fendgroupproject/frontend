require.config({
    baseUrl: 'js',
    shim: {
        'bootstrap': {'deps': ['jquery']}
    },
    paths: {
        //The left side is the module ID
        //the right side is the path relative to baseURL below
        //do not use the file extension
        ko: [
            '//cdnjs.cloudflare.com/ajax/libs/knockout/3.2.0/knockout-min',
            //if the cdn fails:
            'vendor/knockout'
        ],
        jquery: [
            '//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min',
            //if the cdn fails:
            'vendor/jquery'
        ],
        bootstrap: 'vendor/bootstrap/bootstrap'
    }
});
