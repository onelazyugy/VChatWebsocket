// Since we do not have too many filters,
// one "filters.js" file will have to suffice

filters.filter('trusted', ['$sce',
    function($sce) {
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }
]);