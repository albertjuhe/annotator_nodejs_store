/*
Annotator nodejs store (https://https://github.com/albertjuhe/annotator_nodejs_store
Copyright (C) 2014 Albert Juhé Brugué
License: https://github.com/albertjuhe/annotator_nodejs_store/License.rst

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
*/
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Annotator.Plugin.visorAnotacions = (function(_super) {
    __extends(visorAnotacions, _super);

    visorAnotacions.prototype.events = {
      'annotationsLoaded': 'onAnnotationsLoaded',
      'annotationCreated': 'onAnnotationCreated',
      'annotationDeleted': 'onAnnotationDeleted',
      'annotationUpdated': 'onAnnotationUpdated',
      ".annotator-viewer-delete click": "onDeleteClick",
      ".annotator-viewer-delete mouseover": "onDeleteMouseover",
      ".annotator-viewer-delete mouseout": "onDeleteMouseout",
    };


    visorAnotacions.prototype.field = null;

    visorAnotacions.prototype.input = null;

    visorAnotacions.prototype.options = {
      visorAnotacions: {}
    };


    function visorAnotacions(element, options) {
      this.onAnnotationCreated = __bind(this.onAnnotationCreated, this);
      this.onAnnotationUpdated = __bind(this.onAnnotationUpdated, this);
      this.onDeleteClick = __bind(this.onDeleteClick, this);
      this.onDeleteMouseover = __bind(this.onDeleteMouseover, this);
      this.onDeleteMouseout = __bind(this.onDeleteMouseout, this);
      this.onFilter = __bind(this.onFilter, this);
      visorAnotacions.__super__.constructor.apply(this, arguments);

      $( "body" ).append( this.createAnnotationPanel() );

      $(".container-anotacions").toggle();
      $("#annotations-panel").click(function(event) {
        $(".container-anotacions").toggle("slide");       
      });
     

    };

    visorAnotacions.prototype.pluginInit = function() {
      var cat, color, i, isChecked, _ref;
      if (!Annotator.supported()) {
        return;
      }
      $('#type_share').click(this.onFilter);
      $('#type_own').click(this.onFilter);
     
    };

     visorAnotacions.prototype.onFilter = function(event) {
      var anotacions_actives = $(".container-anotacions").find('.annotator-marginviewer-element');
      $(anotacions_actives).hide();  

      var class_view = "";
     
      var checkbox_selected = $('li.filter-panel').find('input:checked'); 
      if (checkbox_selected.length > 0) {
          $('li.filter-panel').find('input:checked').each(function () {
            class_view += $(this).attr('rel') + '.';
          });     
          $('.container-anotacions > li.' + class_view.substring(0,class_view.length-1)).show();
      } else {
        $(anotacions_actives).show();   
      }
      

    };

    visorAnotacions.prototype.onDeleteClick = function(event) {
      return this.onButtonClick(event, 'delete');
    };

    visorAnotacions.prototype.onButtonClick = function(event, type) {
      var item;
      item = $(event.target).parents('.annotator-marginviewer-element');
      return this.annotator.deleteAnnotation(item.data('annotation'));
    };

     visorAnotacions.prototype.onDeleteMouseover = function(event) {
       $(event.target).attr('src', '/annotator/img/papelera_over.png');
    };

     visorAnotacions.prototype.onDeleteMouseout = function(event) {
      $(event.target).attr('src', '/annotator/img/icono_eliminar.png');      
    };

    visorAnotacions.prototype.onAnnotationCreated = function(annotation) {  
      this.createReferenceAnnotation(annotation);
      $('#count-anotations').text( $('.container-anotacions').children('li').length-1 );
    };

    visorAnotacions.prototype.onAnnotationUpdated = function(annotation) {

      $( "#annotation-"+annotation.id ).html( this.mascaraAnnotation(annotation) );       
    };

    visorAnotacions.prototype.onAnnotationsLoaded = function(annotations) {
      var annotation;
      $('#count-anotations').text( annotations.length );
      if (annotations.length > 0) {
        for(i=0, len = annotations.length; i < len; i++) {
          annotation = annotations[i];
          this.createReferenceAnnotation(annotation);   
        }
        
      }
      
    };

    
    visorAnotacions.prototype.onAnnotationDeleted = function(annotation) {
      
      $( "li" ).remove( "#annotation-"+annotation.id );      
      $('#count-anotations').text( $('.container-anotacions').children('li').length - 1);
      
    };

    visorAnotacions.prototype.mascaraAnnotation = function(annotation) {     
      if (!annotation.data_creacio) annotation.data_creacio = $.now();

      var anotacio_compartida = "";      
      var class_label = "label";
      var borrar = "<img src=\"/annotator/img/icono_eliminar.png\" class=\"annotator-viewer-delete\" title=\""+ i18n_dict.Delete +"\" style=\" float:right;margin-top:3px;\"/>";
      
      if (annotation.state==1 || annotation.permissions.read.length===0 ) {
        anotacio_compartida = "<img src=\"/annotator/img/Compartido.png\" title=\""+ i18n_dict.share +"\" style=\"margin-left:5px\"/>"
      }

      if (annotation.propietary==0) {
        class_label = "label-compartit";
        borrar="";
        }
      var textAnnotation = this.removeTags('iframe',annotation.text);
      var originalText = this.trimToLength(annotation.quote,200);
      var anotacio_capa =  '<div class="annotator-marginviewer-text"><div class="'+annotation.category+' anotator_color_box"></div><div class="anotador_text">'+ textAnnotation + '</div></div><div class="annotator-marginviewer-text">'+ $.format.date(annotation.data_creacio, "dd/MM/yyyy HH:mm:ss") + '</div><div class="annotator-marginviewer-quote">'+ originalText + '</div><div class="annotator-marginviewer-footer"><span class="'+class_label+'">' + annotation.user + '</span>'+anotacio_compartida+borrar+'</div>';
      return anotacio_capa;
    };

    visorAnotacions.prototype.createAnnotationPanel = function(annotation) {     
      /*
      var anotacio_capa =  '<div  class="annotations-list-uoc" style="background-color:#ddd;"><div id="annotations-panel"><span class="rotate" style="cursor:pointer;padding:5px;background-color:#ddd;position: absolute; top:10em;left: -50px; width: 155px; height: 110px;">'+ i18n_dict.view_annotations +'<span class="label-counter-alert" style="padding:0.2em 0.3em;float:right" id="count-anotations-alert" title="online students in your classroom">0</span>&nbsp;<span class="label-counter" style="padding:0.2em 0.3em;float:right" id="count-anotations" title="Anotacions totals">0</span></span></div><div id="anotacions-uoc-panel" style="height:80%"><ul class="container-anotacions"><li><a href="'+code+'.pdf" target="_blank"><img src="/annotator/img/PDF.png" style="margin-bottom:10px" title="'+i18n_dict.Download_pdf+'"/></a>'+checboxes+'</li></ul></div></div>';
      return anotacio_capa;
*/
      var checboxes = '<label class="checkbox-inline"><input type="checkbox" id="type_own" rel="me"/>'+ i18n_dict.own +'</label><label class="checkbox-inline">  <input type="checkbox" id="type_share" rel="shared"/>'+i18n_dict.share+'</label>';
      var errataTab = '';
      //var anotacio_capa =  '<div  class="annotations-list-uoc" style="background-color:#ddd;"><div id="annotations-panel">'+errataTab+'<span class="rotate" style="cursor:pointer;padding:5px;background-color:#ddd;position: absolute; top:10em;left: -50px; width: 155px; height: 110px;">'+ i18n_dict.view_annotations +'<span class="label-counter-alert" style="padding:0.2em 0.3em;float:right" id="count-anotations-alert" title="online students in your classroom">0</span>&nbsp;<span class="label-counter" style="padding:0.2em 0.3em;float:right" id="count-anotations" title="Anotacions totals">0</span></span></div><div id="anotacions-uoc-panel" style="height:80%"><ul class="container-anotacions"><li class="filter-panel"><a href="modul_'+modul+'.pdf" target="_blank"><img src="/daisy/Materials/img/PDF.png" style="margin-bottom:10px" title="'+i18n_dict.Download_pdf+'"/></a>'+checboxes+'</li></ul></div></div>';
      var anotacio_capa =  '<div  class="annotations-list-uoc" style="background-color:#ddd;"><div id="annotations-panel"><span class="rotate" style="cursor:pointer;padding:5px;background-color:#ddd;position: absolute; top:10em;left: -50px; width: 155px; height: 110px;">'+ i18n_dict.view_annotations +'<span class="label-counter-alert" style="padding:0.2em 0.3em;float:right" id="count-anotations-alert" title="online students in your classroom">0</span>&nbsp;<span class="label-counter" style="padding:0.2em 0.3em;float:right" id="count-anotations" title="Anotacions totals">0</span></span></div><div id="anotacions-uoc-panel" style="height:80%"><ul class="container-anotacions"><li class="filter-panel"><a href="'+code+'.pdf" target="_blank"><img src="/annotator/img/PDF.png" style="margin-bottom:10px" title="'+i18n_dict.Download_pdf+'"/></a>'+checboxes+'</li></ul></div></div>';
      
      return anotacio_capa;
    };

   
    visorAnotacions.prototype.createReferenceAnnotation = function(annotation) {     
     var anotation_reference = null;
      var data_owner = "me";
     var data_type = "";

      if (annotation.id != null) {
        anotation_reference = "annotation-"+annotation.id;
      } else {
        anotation_reference = "annotator-temp";
      }

      if (annotation.estat==1 || annotation.permissions.read.length===0 ) data_type = "shared";
      if (annotation.propietary==0) data_owner = "";

      var anotacio_capa =  '<li class="annotator-marginviewer-element '+data_type+' '+data_owner+'" data-type="'+annotation.category+'" id="'+anotation_reference +'">'+this.mascaraAnnotation(annotation)+'</li>';
      var malert = i18n_dict.anotacio_lost

      anotacioObject = $(anotacio_capa).appendTo('.container-anotacions').click(function(event) {
          var  viewportHeight = jQuery(window).height();
          var referencia_anotacio = annotation.id;

          $element= jQuery("#"+annotation.id);   
          if (!$element.length) {
            $element= jQuery("#"+annotation.order);   
            referencia_anotacio = annotation.order; //Situem l'anotació amb l'ordre ja que s'ha produit un error i no surt el hightlight
          }

          if ($element.length) {
            elOffset = $element.offset();
            $(this).children(".annotator-marginviewer-quote").toggle();
            $('html, body').animate({
              scrollTop: $("#"+referencia_anotacio).offset().top - (viewportHeight/2)
            }, 2000);
          } 
      })
       .mouseover(function() {   
        $element= jQuery("span[id="+annotation.id+"]");       
        var fontSize = $element.css('font-size').split('px')[0];
        var fontInt = parseInt(fontSize) + 1;
        if ($element.length) {            
          $element.css({"border-color": "#000000", 
             "border-width":"1px", 
             "border-style":"solid",
             "font-size":""+fontInt + "px"});
        }
      })
      .mouseout(function() {    
          $element= jQuery("span[id="+annotation.id+"]");    
          var fontSize = $element.css('font-size').split('px')[0];
          var fontInt = parseInt(fontSize) - 1;
          if ($element.length) {            
            $element.css({"border-width":"0px","font-size":""+fontInt + "px"});
          }
      });
      
      $('#'+anotation_reference).data('annotation', annotation);
      $(anotacioObject).fadeIn('fast');
    };

      //Strip content tags
    visorAnotacions.prototype.removeTags = function(striptags, html) { 
      striptags = (((striptags || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); 
      var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
      
      return html.replace(commentsAndPhpTags, '').replace(tags, function($0, $1) {
        return html.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
      });
    };  

    visorAnotacions.prototype.trimToLength = function(text,m) {
      return (text.length > m) ? jQuery.trim(text).substring(0, m).split(" ").slice(0, -1).join(" ") + "...": text;
    };

    return visorAnotacions;

  })(Annotator.Plugin);

}).call(this);
