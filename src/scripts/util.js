// DataDashboard
// Generic functions and web page setup

const util = {
   initialize: function() {
      $.fn.id =      util.ui.id;
      $.fn.enable =  util.ui.enable;
      $.fn.disable = util.ui.disable;
      dna.registerInitializer(util.ui.normalize);
      }
   };

util.ui = {
   id: function id(value) {
      // Usage:
      //    var userElem = $('.user').id('J777');
      //    var userId = userElem.id();
      return value === undefined ? $(this).attr('id') : $(this).attr({ id: value });
      },
   enable: function (value) {
      // Usage:
      //    $('button').enable();
      return $(this).prop({ disabled: value !== undefined && !value });
      },
   disable: function (value) {
      // Usage:
      //    $('button').disable();
      return $(this).prop({ disabled: value === undefined || !!value });
      },
   normalize: function(holder) {
      holder = holder instanceof jQuery ? holder : $(window.document);
      function makeIcon(i, elem) { $(elem).addClass('fa-' + $(elem).data().icon); }
      function makeBrand(i, elem) { $(elem).addClass('fa-' + $(elem).data().brand); }
      holder.find('i[data-icon]').addClass('font-icon fas').each(makeIcon);
      holder.find('i[data-brand]').addClass('font-icon fab').each(makeBrand);
      holder.find('button:not([type])').attr({ type: 'button' });
      holder.find('input:not([type])').attr({ type: 'text' });
      holder.find('input[type=email]').attr({ autocorrect: 'off', spellcheck: false });
      holder.find('a img, a i.font-icon').closest('a').addClass('image-link');
      if (!dna.browser.iOS())
         holder.find('a.external-site, .external-site a').attr({ target: '_blank' });
      }
   };

util.initialize();
