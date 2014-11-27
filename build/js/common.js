require.config({
    paths: {
        //The left side is the module ID
        //the right side is the path relative to baseURL below
        //do not use the file extension
        ko: [
            '//cdnjs.cloudflare.com/ajax/libs/knockout/3.2.0/knockout-min',
            //if the cdn fails:
            './vendor_modules/knockoutjs/dist/knockout'
        ],
        jquery: [
            '//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min',
            //if the cdn fails:
            './vendor_modules/jquery/dist/jquery.min'
        ]
    },
    baseUrl: 'js'
});
