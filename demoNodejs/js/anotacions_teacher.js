 jQuery(function($) {
                    //Internacionalitzacio
                    $.i18n.load(i18n_dict);
                    // Customise the default plugin options with the third argument.
                    var annotator = $('body').annotator().annotator().data('annotator');
                    annotator.addPlugin('Permissions', {
                        user: propietary,
                        permissions: {
                            'read': [propietary],
                            'update': [propietary],
                            'delete': [propietary],
                            'admin': [propietary]
                        },
                        showViewPermissionsCheckbox: true,
                        showEditPermissionsCheckbox: false
                    });
                       $('body').annotator().annotator('addPlugin', 'Categories',{
                           errata:'annotator-hl-errata',
                           destacat:'annotator-hl-destacat',
                           subratllat:'annotator-hl-subratllat' }
                     );
                        $('body').annotator().annotator('addPlugin','RichEditor',{});
                   $('body').annotator().annotator('addPlugin', 'Markdown');
                    $('body').annotator('addPlugin', 'Store', {
                        prefix: 'http://localhost:3000/annotation',
                        urls: {
                            // These are the default URLs.
                            create: '/new/'+subject+'/'+pid+'/'+modul+'/'+code,
                            read: '/get/'+subject+'/'+pid+'/'+modul+'/'+code,
                            update: '/update/'+code+'/:id',
                            destroy: '/destroy/'+code+'/:id'
                        }
                    });
                   $('body').annotator().annotator('addPlugin', 'AnnotatorViewer');
				   jQuery("body").annotator().annotator('addPlugin', 'Touch', {
					force: location.search.indexOf('force') > -1,
					useHighlighter: location.search.indexOf('highlighter') > -1
					});
                   $('#anotacions-uoc-panel').slimscroll({height: '100%'});
                });