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
       res.send({ message: 'This does NOT log a meaningful stack trace', data: data });
       throw new Error('foo');
     });
   },
 
   good: function (req, res) {
     res.send({ message: 'This logs a stack trace' });
     throw new Error('foo');
   },  

};

