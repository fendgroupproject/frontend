require( ["ko", "jquery", "viewModels/indexViewModel" ], function( ko, jquery, IndexViewModel ) {
        ko.applyBindings( new IndexViewModel() );
    });