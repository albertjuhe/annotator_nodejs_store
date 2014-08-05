jQuery(function($) {
    
    $.i18n.load(i18n_dict);
    // Customise the default plugin options with the third argument.
    var annotator = $('body').annotator({readOnly: true}).annotator().data('annotator');
    $('body').annotator().annotator('addPlugin', 'RichEditor');
    $('body').annotator().annotator('addPlugin', 'ShareAnnotation',{http:host});
});