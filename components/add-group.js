var PMS = PMS || {};
define([], function () {
  return (PMS.LoadGroupCreationModel = () => {
    PMS.GroupCreationModel = Backbone.Model.extend({
      defaults: {
        creator: null,        
        name: null, 
      },
    });
    PMS.GroupCreationView = Backbone.View.extend({
      el: $(".app"),
      template: _.template($("#add-group-card-template").html()),
      model: new PMS.GroupCreationModel(),
      events: {
        "click .fa-solid.fa-circle-xmark": "close",
        "click #add-group-btn": "createGroup",
        "input input": "handleChange",
      },
      handleChange: function (e) {
        this.model.set(e.target.id, e.target.value);
        console.log(e);
      },
      createGroup: function (e) {
        console.log("creating group");
        console.log(this.model);
        var temp_group =  new PMS.models.group({
          name: this.model.get("name"),         
          creator : PMS.fn.getResourceUri(),
        });
        PMS.groupsCollection.add(
          temp_group
        ); 
        temp_group.save();
        PMS.groupsCollection.fetch();        
        $("#overlay").hide();
        $("#add-group-card").empty();
        $("#add-group-card").hide();
        $("#add-group-card").unbind();
      },
      close: function () {
        $("#overlay").hide();
        $("#add-group-card").empty();
        $("#add-group-card").hide();
        $("#add-group-card").unbind();
      },
      initialize: function () {
        this.model.on(
          "change",
          (e) => {
            console.log(e);
            console.log(this.model);
          },
          this
        );
        console.log(this.model);
        this.render();
      },
      render: function () {
        $("#overlay").show();
        if ($("#add-group-card")) {
          $("#add-group-card").remove();
        }
        this.$el.append(this.template(this.model.toJSON()));
        return this;
      },
    });
  });
});
