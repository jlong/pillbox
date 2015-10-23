(function() { 'use strict';

angular
  .module('pillbox', [])
  .directive('pillbox', pillboxDirective)
  .factory('PillProvider', PillProvider);


/** @ngInject */
function pillboxDirective() {
  return {
    restrict: 'E',
    templateUrl: 'app/components/pillbox/pillbox.html',

    scope: {
    },

    controller: PillboxController,
    controllerAs: 'pillbox'
  };
}

/** @ngInject */
function PillboxController(PillProvider) {
  PillProvider.validation = function(){
    return this.value.length >= 5;
  };
  
  PillProvider.add("foo");
  PillProvider.add("bar");
  
  this.pills = PillProvider.pills;
  
  this.onFocus = function() {
    PillProvider.selectNone();
  };
  
  this.onKeyUp = function(event) {
    var value = event.target.innerText;
    console.log(event.keyCode);
    switch(event.keyCode){
      case 8: // backspace
        //if( value == '') this.items.pop();
        break;
      case 13:  // enter
      case 9:   // tab
      case 188: // comma
      case 32:  // space
        if( value.length ) {
          PillProvider.add(value);
        }
        event.target.innerText = "";
        event.preventDefault();
        event.target.focus();
        break;
      case 37: // left
        PillProvider.selectPrevious();
        break;
      case 39: // right
        PillProvider.selectNext();
        break;
    }
  };
  
  return this;
}


var BasePill = {
  isValid: function() {
    return this.validate(this.value);
  },
  isSelected: function() {
    return this.selected === true;
  },
  validate: function() {
    return typeof this.value !== 'undefined';
  }
};


/** @ngInject */
function PillProvider() {
  var factory = this;
  var pills = [];
  var selectedIndex = -1;
  var selectedPill;
  var CustomPill = Object.create(BasePill);
  
  function addPill(value){
    var pill = Object.create(CustomPill);
    pill.value = value;
    pills.push(pill);
    return pill;
  }
  
  function removePill(instance){
    pills.splice(pills.indexOf(instance),1);
  }
  
  CustomPill.remove = function() {
    removePill(this);
  };
  
  factory.pills = pills;
  
  Object.defineProperties(factory, {
    selectedIndex: {
      set: function(value) {
        selectedIndex = value;
        if ( selectedPill ) { selectedPill.selected = false; }
        if ( value < 0 || value >= pills.length ) { return; }
        selectedPill = pills[value];
        selectedPill.selected = true;
      },
      get: function() {
        return selectedIndex;
      }
    },
    validation: {
      set: function(method) {
        CustomPill.validate = method;
      }
    }
  });
  
  factory.add = function(value) {
    return addPill(value);
  };
  
  factory.selectNext = function() {
    factory.selectedIndex = Math.min(selectedIndex + 1, pills.length);
  };
  
  factory.selectPrevious = function() {
    factory.selectedIndex = Math.max(selectedIndex - 1, -1);
  };
  
  factory.selectNone = function() {
    console.log("NUN");
    factory.selectedIndex = pills.length;
  };
  
  return factory;
}

})();
