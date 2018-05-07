/**
 * BarController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  bad: function (req, res) {
    Foo
    .find({})
    .exec((error, data) => {
      // res.send({ message: 'This does NOT log a meaningful stack trace', data: data });
      throw new Error('foo');
      // ^^ this crashes the server!
      // (this is why asynchronous callbacks and promise chaining etc are all best avoided now
      //  that we have a valid alternative)
    });
  },
  
  noLongerBad: async function (req, res) {
    var foos = await Foo.find({});
    throw new Error('foo');
    // ^^ no crash, good  (even though it's happening after something asynchronous!)
  },

  good: function (req, res) {
    throw new Error('foo');
    // ^^ no crash, good
  },

};

