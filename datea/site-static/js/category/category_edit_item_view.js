

// edit free category list item (edit view -> form)
window.Datea.FreeCategoryEditView  = Backbone.View.extend({
	
	tagName: 'td',
	
	attributes: {
		'class': 'edit-item',
		'colspan': 3,
	},
	
	events: {
		'click .save-category': 'save_category',
		'click .delete-category': 'delete_category',
	},
	
	initialize: function() {
		this.model.bind("sync", this.sync, this);
        //this.model.bind("change", this.render, this);
	},
	
	render: function (eventName) {

		this.$el.html( ich.free_category_edit_tpl(this.model.toJSON()));

		// ADD IMAGE EDIT VIEWS TO THE FORM 
		var self = this;
		var img = new Datea.Image();
		if (this.model.get('image')) img.set(this.model.get('image'));
		var marker = new Datea.Image();
		if (this.model.get('marker_image')) marker.set(this.model.get('marker_image'));

		var img_view = new Datea.ImageInputView({
			model: img, 
			callback: function(data){
				if (data.ok) {
					self.model.set({image: data.resource }, {silent: true});
				}
			} 
		});
		this.$el.find('.image-input-view').html(img_view.render().el);
		
		var marker_el = this.$el.find('.marker-input-view');
		var marker_view = new Datea.ImageInputView({
			model: marker, 
			callback: function(data){
				if (data.ok) {
					self.model.set({marker_image: data.resource }, {silent: true});
				}
			} 
		});
		this.$el.find('.marker-input-view').html(marker_view.render().el);
		marker_view.render();
		
		// adjust edit controls
		if (this.model.isNew()) {
			this.$el.find('.delete-category').hide();
		}
		
		return this;
	},
	
	save_category: function(ev) {
		ev.preventDefault();
		if (Datea.controls_validate(this.$el)){
			Datea.show_big_loading(this.$el);
			this.model.set({
				"name": $('input[name="name"]', this.$el).val(),
				"description": $('textarea[name="description"]',this.$el).val(),
				"color": $('input[name="color"]', this.$el).val()
			});
			this.model.save();
			return false;
		}
	},
	
	sync: function() {
		Datea.hide_big_loading(this.$el);
	},
	
	delete_category: function(ev) {
		ev.preventDefault();
		
		if (this.model.isNew()) {
			this.cancel_category();
		}else{
			var self = this;
			this.model.destroy({
				success: function(model, response) { 
					self.$el.unbind();
					self.model.destroy();
					self.$el.empty();
				},
				error: function(model, response) {
					self.$el.find('.delete-error').removeClass('hide');
				}
			});
		}
	} 
	
});