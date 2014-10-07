var _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Annotator.Plugin.ShareAnnotation = (function(_super) {
__extends(ShareAnnotation, _super);



ShareAnnotation.prototype.options = {
   content: {}
};

function ShareAnnotation(element,options) {     
   this.options.content = options;
   this.onClickShare = __bind(this.onClickShare, this);
   this.urlParam = __bind(this.urlParam, this);
   this.LoadAnnotation = __bind(this.LoadAnnotation, this);
  _ref = ShareAnnotation.__super__.constructor.apply(this, arguments);
  
  return _ref;
};


ShareAnnotation.prototype.pluginInit = function() {
    if (!Annotator.supported()) {
        return;
    }    
    
    var http = this.options.content.http;
    var annotation = this.getSmallURL();
    var jsonAnnotation = "";

    if (!annotation) this.annotator.subscribe("annotationViewerShown",this.onClickShare);
    else {      
        $.ajax({
         url:http + "/annotation/json/annotation/" + annotation,
         cache:false,
         dataType:'json',
         type:'GET',
         success: this.LoadAnnotation
        });        
  }
      
};

ShareAnnotation.prototype.LoadAnnotation = function(data) {
    var annotations = [JSON.parse(data)];
    this.annotator.loadAnnotations(annotations.slice());
    console.log("Carrego anotacions");
    if (annotations.length > 0) {
      var i=0;
      
      annotation = annotations[i];      
      var category = annotation.category;  
      $(annotation.highlights).addClass("annotator-hl-" + category);  
      $(annotation.highlights).attr('id', annotation.id ); 
      //Jumping
      var element= jQuery("#"+annotation.id); 
      if (element.length) {
        var  viewportHeight = jQuery(window).height();
        var elOffset = element.offset();            
        $('html, body').animate({
          scrollTop: $("#"+annotation.id).offset().top - (viewportHeight/2)
        }, 2000);
        console.log("Acabat");
      }
    }
};

ShareAnnotation.prototype.getSmallURL = function() {
    
      var url = window.location.href;
      var results = url.search('/share/');

      if (!results) { 
          return null; 
      } else {
        var breadcrum = url.split('/');
        var number = breadcrum.length;
        if (breadcrum.length >= 2 && breadcrum[number-2]=='share') {
          return breadcrum[number-1]; //The last element is the smallurl
        }

      }

      return null;
}

ShareAnnotation.prototype.onClickShare = function(viewer, annotations) {
  var link_layer = $('ul.annotator-widget > li > div[class="annotator-user"]'); //startsWith  
  var modul_material = this.options.content.modul;
  var codi_materials = this.options.content.code ;
  var http = this.options.content.http ;
  var hashids = new Hashids("shared_annotations",8);   
  var data = hashids.encrypt(parseInt(viewer.annotations[0].id));
   
  if ($('div#sharelink')) $('div#sharelink').remove();
   
  $('<span  id="copy_link" style="float:right"><img src="/annotator/img/Linkicon.png" alt="Copy annotation"/></span>').appendTo(link_layer).click(function(event) {          

    var URL= http + "/annotation/share/" + data;
    //var uri = '<input type="text" id="input_url" size="50" onclick="javascript:this.select();" style="margin-top:5px;margin-bottom:5px" class="text" readonly="true" value="'+encodeURI(URL)+'">';
    if ($('div#sharelink').length) {
      $('input#urlshare').val(encodeURI(URL));
    } else {
      var uri = '<label for="urlshare" style="color:#000000">URL to share</label><input type="text" onclick="javascript:this.select();"  class="form-control" readonly="true" value="'+encodeURI(URL)+'">';
      var modal_window = '<div style="padding:4px;margin:2px" id="sharelink">'+ uri + '</div>';           
      var link_popup = $('li.annotator-annotation.annotator-item');
      
      var number_of_divs = $('li.annotator-annotation.annotator-item div').length;

      if ((number_of_divs-2)>0) {
        var div_position = number_of_divs-2;
        if (link_popup) {
          $('li.annotator-annotation.annotator-item div:eq('+div_position+')').after(modal_window);        
        } else return 0;
      } else {
        console.log('Error in the estidor div structure.');
      }
    }
    
  })
    
};

ShareAnnotation.prototype.generateURL = function(name, url) {
   
    return URL;
}


return ShareAnnotation;

})(Annotator.Plugin);
