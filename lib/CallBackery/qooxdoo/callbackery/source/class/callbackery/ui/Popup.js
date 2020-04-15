/* ************************************************************************
   Copyright: 2013 OETIKER+PARTNER AG
   License:   GPLv3 or later
   Authors:   Tobi Oetiker <tobi@oetiker.ch>
   Utf8Check: äöü
************************************************************************ */

/**
 * Abstract Visualization widget.
 */
qx.Class.define("callbackery.ui.Popup", {
    extend : qx.ui.window.Window,
    /**
     * create a page for the View Tab with the given title
     *
     * @param vizWidget {Widget} visualization widget to embedd
     */
    construct : function(cfg,getParentFormData) {
        /* using syntax trick to not get a warning for translating
           a variable */
        this.base(arguments, this.xtr(cfg.popupTitle));
        this.set({
            layout: new qx.ui.layout.Grow(),
            height: 600,
            width: 800,
            modal: true,
            allowMinimize: false,
            showMinimize: false,
            showStatusbar: false,
            centerOnContainerResize: true,
            centerOnAppear: true
        });

        if (cfg.set){
            this.set(cfg.set);
        }
        
        // make sure it gets added tro the translation
        this.tr('Cancel');
        var extraAction = {
            label : 'Cancel',
            action : 'cancel'
        };
        if (cfg.cancelLabel) {
            extraAction.label = cfg.cancelLabel;
        }
        cfg.instantiationMode = 'onStartup';
        var screen = new callbackery.ui.Screen(cfg,getParentFormData,extraAction);
        this.add(screen);
        screen.addListener('actionResponse',function(e){
            var data = e.getData();
            this.fireDataEvent('actionResponse',data);
            switch (data.action){
                case 'dataSaved':
                case 'cancel':
                    this.close();
            }
        },this);
        this.addListener('keydown',function(e){
            if (e.getKeyIdentifier() == 'Escape'){
                e.preventDefault();
                e.stopPropagation();
                screen.fireDataEvent('actionResponse',{action: 'cancel'});
            }
        },this);
    },
    events: {
        actionResponse: 'qx.event.type.Data'
    }
});
