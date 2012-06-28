hardcode_map_id = 1;

// Router
Datea.AppRouter = Backbone.Router.extend({
 
    routes:{
        "":"home",
        "_=_": "fb_login_redirect",
        "action/start": "action_start",
        "action/create/:action_type": "action_create",
        
        "mapping/:map_id": 'open_mapping_tab',
        "mapping/:map_id/:tab_id": 'open_mapping_tab',
        "mapping/:map_id/:tab_id/item:report_id": 'open_mapping_item',
       	"mapping/:map_id/:tab_id/:method_id": 'open_mapping_tab',
    },
 
    home:function () {
    	this.open_mapping_tab(hardcode_map_id);
    	return;
    	//this.my_profile_home_view = new Datea.MyProfileHomeView({model:Datea.my_user});
        //$('#main-content-view').html(this.my_profile_home_view.render().el);
    },
    
    fb_login_redirect:function () {
    	this.open_mapping_tab(hardcode_map_id);
    	//this.navigate('');
    },
    
    action_start: function () {
    	$('#main-content-view').html(new Datea.ActionStartView().render().el);
    },
    
    action_create: function (action_type) {
    	
    	if (action_type == 'mapping') {
			$('#main-content-view').html( ich.fix_base_content_single_tpl());
    		this.mapping = new Datea.MappingFormView({model: new Datea.Mapping()});
    		$('#content').html(this.mapping.render().el);
    		this.mapping.attach_map();
    	}
    	
    },
    
    open_mapping_tab: function(map_id, tab_id, method_id) {
		console.log("open_map_tab");
    	var params = {
    		tab_id: tab_id,
			method_id: method_id,
    	}

    	// checkif mapping already exists (not drawing everything again!)
    	if (this.mapping_view && this.mapping_view.model.get('id') == map_id) {
    		// test if layout rendered
    		if ($('#mapping-'+map_id).size() == 0) {
    			this.mapping_view.render();
    		}
    		this.mapping_view.render_tab(params);
    		
    	}else{
    		var self = this;
    		this.create_mapping(map_id, function () {
    			self.mapping_view.render_tab(params);
    		})
    	}
    },
    
    open_mapping_item: function(map_id, tab_id, item_id) {

    	var params = {
    		tab_id: tab_id,
			item_id: item_id,
    	}
    	// check if mapping already exists (not drawing everything again!)
    	if (this.mapping_view && this.mapping_view.model.get('id') == map_id) {
    		// test if layout rendered
    		if ($('#mapping-'+map_id).size() == 0) {
    			this.mapping_view.render();
    		}
    		this.mapping_view.render_item(params);
    	}else{
    		var self = this;
    		this.create_mapping(map_id, function () {
    			self.mapping_view.render_item(params);
    		})
    	}
    },
    
    create_mapping: function(map_id, callback) {
    	var self = this;
    	var mapping_model = new Datea.Mapping({id: map_id});
    	
    	mapping_model.fetch({success: function(model, response){
			self.mapping_view = new Datea.MappingMainView({
				el: $('#main-content-view'),
				model: model,
			});
			self.mapping_view.render();
			if (typeof(callback) != 'undefined') {
				callback();
			}
    	}});
    }
    
    
    
 	/*
    wineDetails:function (id) {
        this.wine = this.wineList.get(id);
        this.wineView = new WineView({model:this.wine});
        $('#content').html(this.wineView.render().el);
    }*/
});
