var Evented = require('../evented.js').Evented;

describe('Evented', function() {
  describe('Event', function() {
    var eventObj = Evented.Event;
    it('has on function', function() {
      expect(eventObj.on).toEqual(jasmine.any(Function));
    });
    it('has trigger function', function() {
      expect(eventObj.trigger).toEqual(jasmine.any(Function));
    });
    it('executes callback with correct arguments when event is triggered', function() {
      var callback = jasmine.createSpy('callback');
      eventObj.on('foo', callback);
      eventObj.trigger('foo', 1, 2);
      expect(callback).toHaveBeenCalledWith(1, 2);
    });
    it('executes callback in context of another object if given', function() {
      var obj = {};
      eventObj.on('bar', function() {
        expect(this).toBe(obj);
      }, obj);
      eventObj.trigger('bar');
    });
    it('executes callback in context of containing object', function() {
      eventObj.on('baz', function() {
        expect(this).toBe(eventObj);
      });
      eventObj.trigger('baz');
    });
  });
  describe('extend', function() {
    it('copies the properties of Event onto another object', function() {
      var newObj = {};
      Evented.extend(newObj);
      expect(newObj.on).toEqual(Evented.Event.on);
      expect(newObj.trigger).toEqual(Evented.Event.trigger);
    });
    it('returns the extended object', function() {
      var a = {};
      expect(Evented.extend(a)).toBe(a);
    });
  });
});